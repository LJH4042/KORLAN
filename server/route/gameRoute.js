const express = require("express");
const router = express.Router();
const {
  postCanvas,
  getImage,
  postImage,
} = require("../controller/gameController");
const { upload } = require("../config/multer");

router.route("/canvas").post(postCanvas);
router.route("/image").get(getImage).post(upload.single("image"), postImage);

module.exports = router;
