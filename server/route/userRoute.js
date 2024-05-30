const express = require("express");
const router = express.Router();
const {
  getUserData,
  loginUser,
  findId,
  findPwd,
  getUsername,
  changePwd,
  checkAuthCode,
  registerUser,
} = require("../controller/userController");
const { authUser } = require("../middleware/authMiddleware");

router.route("/login").get(authUser, getUserData).post(loginUser);
router.route("/find_id").post(findId);
router.route("/check_id").post(getUsername);
router.route("/find_pwd").post(findPwd);
router.route("/change_pwd").post(changePwd);
router.route("/authcode").post(checkAuthCode);
router.route("/register").post(registerUser);

module.exports = router;
