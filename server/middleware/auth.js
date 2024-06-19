const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userSchema"); // Ensure the correct path to the User model

// Middleware authentication
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Please login first",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and attach the user object to req.user
      const user = await User.findById(decode._id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      req.user = user;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
        error: err,
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "User is not authorized",
      error: err,
    });
  }
};
