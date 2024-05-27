const asynchHandler = require("express-async-handler");
const fs = require("fs");
const detectText = require("../config/vision");
const Game = require("../model/gameModel");
const User = require("../model/userModel");

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
  if (imageID.length >= 5) {
    imageID = [];
    res.send({ message: "게임이 종료되었습니다." });
  } else {
    const game = await Game.aggregate([
      { $match: { _id: { $nin: imageID } } },
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
});

//Post Image, /image : 이미지 데이터 등록
const postImage = asynchHandler(async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;
  const game = await Game.create({ title, image });
  res.status(201).send({ message: "등록되었습니다." });
});

//Post ImageGame Score Add, /imageScore : 이미지 게임 점수
const addImageScore = asynchHandler(async (req, res) => {
  const { imageScore } = req.body;
  const user = await User.findById(req.user._id);
  user.imageScore += parseInt(imageScore);
  await user.save();
});

//Post CombineGame Score Add, /CombineScore : 조합 게임 점수
const addCombineScore = asynchHandler(async (req, res) => {
  const { combineScore } = req.body;
  const user = await User.findById(req.user._id);
  user.combineScore += parseInt(combineScore);
  await user.save();
});

module.exports = {
  postCanvas,
  getImage,
  resetImageID,
  postImage,
  addImageScore,
  addCombineScore,
};
