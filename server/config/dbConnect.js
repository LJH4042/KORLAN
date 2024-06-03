const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("DB Connect");
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;
