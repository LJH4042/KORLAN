const express = require("express");
const router = express.Router();
const {
  postCanvas,
  getImage,
  resetImageID,
  postImage,
} = require("../controller/gameController");
const { upload } = require("../config/multer");

router.route("/canvas").post(postCanvas);
router.route("/game").get(getImage).post(upload.single("image"), postImage);
router.route("/game/reset").post(resetImageID);

module.exports = router;
