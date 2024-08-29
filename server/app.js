const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");

const app = express();

dbConnect();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/file", express.static("file"));

app.use("/", require("./route/userRoute"));
app.use("/", require("./route/postRoute"));
app.use("/", require("./route/gameRoute"));
app.use("/api", require("./route/wrongAnswerRoute"));

app.listen(5000, () => {
  console.log("5000 포트에서 서버 실행 중");
});
