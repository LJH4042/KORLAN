const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  code: {
    type: String,
    require: true,
  },
  timeOut: {
    type: Date,
    default: Date.now,
    expires: 180, // 3분 후 자동 삭제
  },
});

module.exports = mongoose.model("Authcode", AuthSchema);
