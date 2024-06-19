const express = require("express");
const router = express.Router();
const {
  getUserData,
  loginUser,
  refreshAccessToken,
  logoutUser,
  findId,
  getUsername,
  findPwd,
  changePwd,
  mailCode,
  checkAuthCode,
  registerUser,
  deleteUser,
} = require("../controller/userController");
const { authUser } = require("../middleware/authMiddleware");

router.route("/login").get(authUser, getUserData).post(loginUser);
router.route("/refresh").post(refreshAccessToken);
router.route("/logout").post(logoutUser);
router.route("/find_id").post(findId);
router.route("/check_id").post(getUsername);
router.route("/find_pwd").post(findPwd);
router.route("/change_pwd").post(changePwd);
router.route("/mailsend").post(mailCode);
router.route("/authcode").post(checkAuthCode);
router.route("/register").post(registerUser);
router.route("/delete-account").post(authUser, deleteUser);

module.exports = router;
