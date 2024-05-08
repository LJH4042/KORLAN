const asynchHandler = require("express-async-handler");
const fs = require("fs");
const detectText = require("../config/vision");
const Game = require("../model/gameModel");

//Post canvas, /canvas
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

//Get random Image, /image
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

//Post reset Image ID, /image/reset
const resetImageID = asynchHandler(async (req, res) => {
  imageID = [];
});

//Post Image, /image
const postImage = asynchHandler(async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;
  const game = await Game.create({ title, image });
  res.status(201).send({ message: "등록되었습니다." });
});

module.exports = { postCanvas, getImage, resetImageID, postImage };
