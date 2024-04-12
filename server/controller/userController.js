const asynchHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

//Post Login User, /login
const loginUser = asynchHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "일치하는 사용자가 없습니다." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "로그인 성공", token });
});

//Post Register User, /register
const registerUser = asynchHandler(async (req, res) => {
  const { username, password, chackPassword } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "이미 사용 중인 아이디입니다." });
  }

  if (password === chackPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "회원가입 성공" });
  }

  if (password !== chackPassword) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }
});

module.exports = { loginUser, registerUser };
