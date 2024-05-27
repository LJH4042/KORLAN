const express = require("express");
const router = express.Router();
const {
  postCanvas,
  getImage,
  resetImageID,
  postImage,
  addImageScore,
  addCombineScore,
} = require("../controller/gameController");
const { upload } = require("../config/multer");
const { authUser } = require("../middleware/authMiddleware");

router.route("/canvas").post(postCanvas);
router.route("/game").get(getImage).post(upload.single("image"), postImage);
router.route("/game/reset").post(resetImageID);
router.route("/imageScore").post(authUser, addImageScore);
router.route("/combineScore").post(authUser, addCombineScore);

module.exports = router;
