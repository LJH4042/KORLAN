const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Game", gameSchema);
