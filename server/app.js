const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const axios = require("axios");
require("dotenv").config();

const app = express();

dbConnect();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/file", express.static("file"));

app.post("/synthesize", async (req, res) => {
  const text = req.body.text;
  const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;
  const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
  const payload = {
    audioConfig: { audioEncoding: "MP3" },
    input: { text: text },
    voice: { languageCode: "ko-KR", name: "ko-KR-Standard-B" },
  };

  const response = await axios.post(endpoint, payload);
  res.json(response.data);
});

app.use("/", require("./route/userRoute"));
app.use("/", require("./route/postRoute"));
app.use("/", require("./route/gameRoute"));
app.use("/api", require("./route/wrongAnswerRoute"));

app.listen(5000, () => {
  console.log("5000 포트에서 서버 실행 중");
});
