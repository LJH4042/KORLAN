const asynchHandler = require("express-async-handler");
const fs = require("fs");
const detectText = require("../config/vision");
const Game = require("../model/gameModel");
const User = require("../model/userModel");
const WrongAnswer = require("../model/WrongAnswer");

//Post canvas, /canvas : 캔버스 텍스트 추출
const postCanvas = asynchHandler(async (req, res) => {
  const { dataURL } = req.body;
  const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  await new Promise((res, rej) => {
    fs.writeFile("image.png", buffer, (err) => {
      if (err) {
        console.error(err);
        rej("이미지 저장 중 에러 발생");
      } else {
        res();
      }
    });
  });
  const text = await detectText("image.png");
  res.json({ text });
});

//Get random Image, /image : 이미지 가져오기
let imageID = [];

const getImage = asynchHandler(async (req, res) => {
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
const resetImageID = asynchHandler(async (req, res) => {
  imageID = [];
  res.status(200).send({ message: "게임 데이터가 초기화되었습니다." });
});

//Post Image, /image : 이미지 데이터 등록
const postImage = asynchHandler(async (req, res) => {
  const { title, level, length, hint } = req.body;
  const existingTitle = await User.findOne({ title });
  if (existingTitle)
    return res.status(401).json({ message: "이미 저장된 데이터입니다." });
  const image = req.file.filename;
  await Game.create({ _id: title, title, image, level, length, hint });
  res.status(201).send({ message: "등록되었습니다." });
});

//Post ImageGame Score Add, /imageScore : 이미지 게임 점수
const addImageScore = asynchHandler(async (req, res) => {
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
const addCombineScore = asynchHandler(async (req, res) => {
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

const learnData = asynchHandler(async (req, res) => {
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

const getWrongAnswers = async (req, res) => {
  const userId = req.params.userId;

  try {
    const WrongAnswers = await WrongAnswer.find({ userId });
    res.status(200).json(WrongAnswers);
  } catch (error) {
    res.status(500).json({ message: "오답불러오기에 실패했습니다.", error });
  }
};

const submitAnswer = asynchHandler(async (req, res) => {
  const { question, givenAnswer, correctAnswer } = req.body;
  const userId = req.user.id;

  const wrongAnswer = new WrongAnswer({
    userId,
    question,
    givenAnswer,
    correctAnswer,
  });

  try {
    await wrongAnswer.save();
    res.status(201).json({ message: "오답이 저장되었습니다." });
  } catch (error) {
    res.status(500).json({ error: "오답 저장에 실패했습니다." });
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
  getWrongAnswers,
};
