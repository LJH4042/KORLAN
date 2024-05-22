const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  addImageScore,
  addCombineScore,
  getUserData,
} = require("../controller/userController");
const { authUser } = require("../middleware/authMiddleware");

router.route("/login").get(authUser, getUserData).post(loginUser);
router.route("/register").post(registerUser);
router.route("/imageScore").post(authUser, addImageScore);
router.route("/combineScore").post(authUser, addCombineScore);

module.exports = router;
