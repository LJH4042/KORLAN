const express = require("express");
const router = express.Router();
const { postCanvas } = require("../controller/canvasController");

router.route("/canvas").post(postCanvas);

module.exports = router;
