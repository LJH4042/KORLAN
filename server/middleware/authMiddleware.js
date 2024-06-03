const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const jwtSecret = process.env.JWT_SECRET;

const authUser = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];
      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        res.status(401).json({ message: "토큰이 만료되었습니다." });
      } else {
        console.log(err);
        res.status(403).json({ message: "유효한 토큰이 아닙니다." });
      }
    }
  } else {
    res.status(401).json({ message: "토큰이 없습니다." });
  }
};

module.exports = { authUser };
