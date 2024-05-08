const asynchHandler = require("express-async-handler");
const Score = require("../model/scoreModel");

const getScore = asynchHandler(async (req, res) => {
  const score = await Score.find();
  res.status(200).send(score);
});

const addImageScore = asynchHandler(async (req, res) => {
  const { imageScore } = req.body;
  const score = await Score.findOne();
  if (!score) {
    score = await Score.create({ imageScore });
  } else {
    score.imageScore += parseInt(imageScore); // 점수를 증가시킵니다.
    await score.save();
  }
});

const addCombineScore = asynchHandler(async (req, res) => {
  const { combineScore } = req.body;
  const score = await Score.findOne();
  if (!score) {
    score = await Score.create({ combineScore });
  } else {
    score.combineScore += parseInt(combineScore); // 점수를 증가시킵니다.
    await score.save();
  }
});

module.exports = { getScore, addImageScore, addCombineScore };
