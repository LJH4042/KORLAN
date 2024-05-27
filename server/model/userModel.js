const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  imageScore: {
    type: Number,
    default: 0,
  },
  combineScore: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", UserSchema);
