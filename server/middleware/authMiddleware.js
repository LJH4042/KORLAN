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
      console.log(err);
    }
  } else {
    res.status(401);
  }
};

module.exports = { authUser };
