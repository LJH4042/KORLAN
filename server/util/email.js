const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async (email, title, code) => {
  const mailPoster = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PWD },
  });

  const mailOption = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `${title} 인증코드`,
    text: `인증 코드는 ${code}입니다.`,
  };

  try {
    await mailPoster.sendMail(mailOption);
    return "success";
  } catch (error) {
    return error;
  }
};
