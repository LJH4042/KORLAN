const express = require("express");
const router = express.Router();
const {
  postCanvas,
  getImage,
  resetImageID,
  postImage,
  addImageScore,
  addCombineScore,
  learnData,
  submitAnswer,
  getWrongAnswers
} = require("../controller/gameController");
const { upload } = require("../config/multer");
const { authUser } = require("../middleware/authMiddleware");

router.route("/canvas").post(postCanvas);
router.route("/game").post(upload.single("image"), postImage);
router.route("/gameData").post(getImage);
router.route("/game/reset").post(resetImageID);
router.route("/imageScore").post(authUser, addImageScore);
router.route("/combineScore").post(authUser, addCombineScore);
router.route("/learn").post(authUser, learnData);
router.route("/submit-answer").post(authUser, submitAnswer);
router.route("/wrong-answers").get(authUser, getWrongAnswers);

module.exports = router;
