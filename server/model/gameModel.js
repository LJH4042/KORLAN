const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, require: true, unique: true },
  image: { type: String, require: true },
  level: { type: String, require: true },
  length: { type: String, require: true },
  hint: { type: String, require: true },
});

module.exports = mongoose.model("Game", gameSchema);
