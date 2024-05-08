const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  imageScore: {
    type: Number, // 숫자 타입으로 변경
    default: 0, // 초기값 설정 (옵션)
  },
  combineScore: {
    type: Number, // 숫자 타입으로 변경
    default: 0, // 초기값 설정 (옵션)
  },
});

module.exports = mongoose.model("Score", ScoreSchema);
