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
const getImage = asynchHandler(async (req, res) => {
  const game = await Game.aggregate([{ $sample: { size: 1 } }]);
  res.status(200).send(game);
});

//Post Image, /image
const postImage = asynchHandler(async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;
  const game = await Game.create({ title, image });
  res.status(201).send({ message: "등록되었습니다." });
});

module.exports = { postCanvas, getImage, postImage };
