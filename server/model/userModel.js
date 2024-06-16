const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  imageScore: {
    low: { type: Number, default: 0 },
    middle: { type: Number, default: 0 },
    high: { type: Number, default: 0 },
  },
  combineScore: {
    low: { type: Number, default: 0 },
    middle: { type: Number, default: 0 },
    high: { type: Number, default: 0 },
  },
  /*combineScoreLow: { type: Number, default: 0 },
  combineScoreMiddle: { type: Number, default: 0 },
  combineScoreHigh: { type: Number, default: 0 },*/
  refreshToken: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
