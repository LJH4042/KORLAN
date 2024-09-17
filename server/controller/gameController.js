const asyncHandler = require("express-async-handler");
const fs = require("fs").promises;
const path = require("path");
const detectText = require("../config/vision");
const Game = require("../model/gameModel");
const User = require("../model/userModel");
const WrongAnswer = require("../model/WrongAnswer");

//Post canvas, /canvas : 캔버스 텍스트 추출
const postCanvas = asyncHandler(async (req, res) => {
  const { dataURL } = req.body;
  const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const imagePath = path.join(__dirname, '..', 'image.png');  // 서버 루트 디렉토리의 image.png

  try {
    await fs.writeFile(imagePath, buffer);
    const text = await detectText(imagePath);
    res.json({ text });
  } catch (error) {
    console.error("이미지 저장 중 에러 발생:", error);
    res.status(500).json({ error: "이미지 저장 중 에러 발생" });
  }
});

//Get random Image, /image : 이미지 가져오기
let imageID = [];

const getImage = asyncHandler(async (req, res) => {
  const { level } = req.body;
  if (imageID.length >= 10) {
    imageID = [];
    res.send({ message: "게임이 종료되었습니다." });
  } else {
    const game = await Game.aggregate([
      { $match: { _id: { $nin: imageID }, level: level } },
      { $sample: { size: 1 } },
    ]);
    imageID.push(game[0]._id);
    res.status(200).send({ game: game, count: imageID.length });
  }
  console.log(imageID);
});

//Post reset Image ID, /image/reset : 게임 초기화
const resetImageID = asyncHandler(async (req, res) => {
  imageID = [];
  res.status(200).send({ message: "게임 데이터가 초기화되었습니다." });
});

//Post Image, /image : 이미지 데이터 등록
const postImage = asyncHandler(async (req, res) => {
  const { title, level, length, hint } = req.body;
  const existingTitle = await User.findOne({ title });
  if (existingTitle)
    return res.status(401).json({ message: "이미 저장된 데이터입니다." });
  const image = req.file.filename;
  await Game.create({ _id: title, title, image, level, length, hint });
  res.status(201).send({ message: "등록되었습니다." });
});

//Post ImageGame Score Add, /imageScore : 이미지 게임 점수
const addImageScore = asyncHandler(async (req, res) => {
  const { imageScore, level } = req.body;
  const user = await User.findById(req.user._id);
  if (level === "하") {
    if (user.imageScore.low < 10) user.imageScore.low += parseInt(imageScore);
  } else if (level === "중") {
    if (user.imageScore.middle < 10)
      user.imageScore.middle += parseInt(imageScore);
  } else if (level === "상") {
    if (user.imageScore.high < 10) user.imageScore.high += parseInt(imageScore);
  }
  await user.save();
});

//Post CombineGame Score Add, /CombineScore : 조합 게임 점수
const addCombineScore = asyncHandler(async (req, res) => {
  const { combineScore, level } = req.body;
  const user = await User.findById(req.user._id);
  if (level === "하") {
    if (user.combineScore.low < 10)
      user.combineScore.low += parseInt(combineScore);
  } else if (level === "중") {
    if (user.combineScore.middle < 10)
      user.combineScore.middle += parseInt(combineScore);
  } else if (level === "상") {
    if (user.combineScore.high < 10)
      user.combineScore.high += parseInt(combineScore);
  }
  await user.save();
});

const learnData = asyncHandler(async (req, res) => {
  const { learnWord, letterType } = req.body;
  const user = await User.findById(req.user._id);
  if (letterType === "consonant") {
    if (!user.learnPoint.consonant.includes(learnWord)) {
      user.learnPoint.consonant.push(learnWord);
    }
  } else if (letterType === "vowel") {
    if (!user.learnPoint.vowel.includes(learnWord)) {
      user.learnPoint.vowel.push(learnWord);
    }
  } else if (letterType === "doubleConsonant") {
    if (!user.learnPoint.doubleConsonant.includes(learnWord)) {
      user.learnPoint.doubleConsonant.push(learnWord);
    }
  } else if (letterType === "doubleVowel") {
    if (!user.learnPoint.doubleVowel.includes(learnWord)) {
      user.learnPoint.doubleVowel.push(learnWord);
    }
  }
  await user.save();
  res.status(200).json({ message: "데이터가 저장되었습니다." });
});

const getWrongAnswers = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalWrongAnswers = await WrongAnswer.countDocuments({ userId });
    const totalPages = Math.ceil(totalWrongAnswers / limit);
    const validPage = Math.max(1, Math.min(page, totalPages));
    const skip = (validPage - 1) * limit;

    const wrongAnswers = await WrongAnswer.find({ userId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      wrongAnswers,
      currentPage: validPage,
      totalPages,
      totalItems: totalWrongAnswers
    });
  } catch (error) {
    res.status(500).json({ error: '오답을 불러오는데 실패했습니다.' });
  }
});

const submitAnswer = asyncHandler(async (req, res) => {
  const { question, givenAnswer, correctAnswer } = req.body;
  const userId = req.user._id;

  if (givenAnswer !== correctAnswer) {
    try {
      const imagePath = path.join(__dirname, '..', 'image.png');
      const imageData = await fs.readFile(imagePath, { encoding: 'base64' });
      const base64Image = `data:image/png;base64,${imageData}`;

      console.log("Image data length:", base64Image.length); // 디버깅용

      const wrongAnswer = new WrongAnswer({
        userId,
        question,
        givenAnswer,
        correctAnswer,
        image: base64Image
      });

      await wrongAnswer.save();
      res.status(201).json({ message: '오답이 저장되었습니다.' });
    } catch (error) {
      console.error("Error saving wrong answer:", error);
      res.status(500).json({ error: '오답 저장에 실패했습니다.' });
    }
  } else {
    res.status(200).json({ message: '정답입니다.' });
  }
});


module.exports = {
  postCanvas,
  getImage,
  resetImageID,
  postImage,
  addImageScore,
  addCombineScore,
  learnData,
  submitAnswer,
  getWrongAnswers
};

