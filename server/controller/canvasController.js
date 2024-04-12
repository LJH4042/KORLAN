const asynchHandler = require("express-async-handler");
const fs = require("fs");
const detectText = require("../config/vision");

const postCanvas = asynchHandler(async (req, res) => {
  const { dataURL } = req.body;
  const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  await new Promise((resolve, reject) => {
    fs.writeFile("image.png", buffer, (err) => {
      if (err) {
        console.error(err);
        reject("이미지 저장 중 에러 발생");
      } else {
        resolve();
      }
    });
  });

  const text = await detectText("image.png");
  res.json({ text });
});

module.exports = { postCanvas };
