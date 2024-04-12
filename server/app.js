const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");

const app = express();

dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./route/userRoute"));
app.use("/", require("./route/postRoute"));
app.use("/", require("./route/canvasRoute"));

app.listen(5000, () => {
  console.log("5000 포트에서 서버 실행 중");
});
