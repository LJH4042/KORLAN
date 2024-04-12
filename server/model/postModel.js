const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  category: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("Post", PostSchema);
