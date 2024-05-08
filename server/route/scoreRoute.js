const express = require("express");
const router = express.Router();
const {
  getScore,
  addImageScore,
  addCombineScore,
} = require("../controller/scoreController");

router.route("/score").get(getScore);
router.route("/imageScore").post(addImageScore);
router.route("/combineScore").post(addCombineScore);

module.exports = router;
