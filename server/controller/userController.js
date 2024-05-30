const asynchHandler = require("express-async-handler");
const User = require("../model/userModel");
const Authcode = require("../model/authModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const nodemailer = require("nodemailer");

//Get User Data, /login : 사용자 정보 가져오기
const getUserData = asynchHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).send(user);
});

//Post Login User, /login : 로그인
const loginUser = asynchHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ nameMessage: "일치하는 아이디가 없습니다." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ pwdMessage: "비밀번호가 일치하지 않습니다." });
  }

  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "로그인 성공", token });
});

//메일 발송 트랜스포트
const mailPoster = nodemailer.createTransport({
  service: "naver",
  host: "smtp.naver.com",
  port: 587,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PWD },
});

//Post Username Data, /check_id : username 가져오기
const getUsername = asynchHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.status(200).send(user);
});

//Post Find User_id, /find_id : 아이디 찾기
const findId = asynchHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
  } else {
    const code = Math.floor(100000 + Math.random() * 900000);
    await Authcode.create({ code });

    const mailOption = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "비밀번호 재설정 인증코드",
      text: `인증 코드는 ${code}입니다.`,
    };

    mailPoster.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "인증코드 전송에 실패햇습니다." });
      } else {
        res.status(201).json({ message: "인증코드가 전송되었습니다." });
      }
    });
  }
});

//Post Find User_pwd, /find_pwd : 비밀번호 찾기
const findPwd = asynchHandler(async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ nameMessage: "일치하는 아이디가 없습니다." });
  } else if (user.email !== email) {
    return res.status(401).json({ emailMessage: "이메일이 틀립니다." });
  } else {
    const code = Math.floor(100000 + Math.random() * 900000);
    await Authcode.create({ code });

    const mailOption = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "비밀번호 재설정 인증코드",
      text: `인증 코드는 ${code}입니다.`,
    };

    mailPoster.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "인증코드 전송에 실패햇습니다." });
      } else {
        res.status(201).json({ message: "인증코드가 전송되었습니다." });
      }
    });
  }
});

//Post Auth Code, /authcode : 인증코드 확인
const checkAuthCode = asynchHandler(async (req, res) => {
  const { code } = req.body;
  const authCode = await Authcode.findOne({ code });
  if (!authCode) {
    return res.status(400).json({ message: "인증 코드가 올바르지 않습니다." });
  }
  res.status(200).json({ message: "인증 코드가 확인되었습니다." });
});

//Post Change Password, /change_pwd : 비밀번호 변경
const changePwd = asynchHandler(async (req, res) => {
  const { username, password, checkPassword } = req.body;
  const user = await User.findOne({ username });
  if (password !== checkPassword) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }
  user.password = await bcrypt.hash(password, 10);
  await user.save();
  res.status(200).json({ message: "비밀번호가 변경되었습니다." });
});

//Post Register User, /register : 회원가입
const registerUser = asynchHandler(async (req, res) => {
  const { username, password, checkPassword, email } = req.body;
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ nameMessage: "이미 사용중인 아이디입니다." });
  }
  if (password !== checkPassword) {
    return res
      .status(401)
      .json({ pwdMessage: "비밀번호가 일치하지 않습니다." });
  }
  if (!emailRegEx.test(email)) {
    return res.status(401).json({
      emailMessage: "이메일 형식이 올바르지 않습니다. ex) admin@aaa.com",
    });
  }

  if (password === checkPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    res.status(201).json({ message: "회원가입 성공" });
  }
});

module.exports = {
  getUserData,
  loginUser,
  findId,
  getUsername,
  findPwd,
  changePwd,
  checkAuthCode,
  registerUser,
};