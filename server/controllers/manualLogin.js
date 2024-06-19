const userSchema = require("../models/userSchema");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

exports.manualLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let checkUser = await userSchema.findOne({ email: email });
    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (checkUser.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      email: checkUser.email,
      name: checkUser.name,
    };

    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "168h",
    });
    checkUser = checkUser.toObject();
    checkUser.token = token;
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      token: token,
      checkUser,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// controllers/manualLogin.js

exports.createUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    console.log("Received request with:", email, password, name);

    let user = await userSchema.findOne({ email: email });

    if (user) {
      console.log("User already exists:", email);
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }

    console.log("Creating new user:", email, password, name);
    user = await userSchema.create({
      email,
      password,
      name,
    });

    user.password = null;
    console.log("User created successfully:", user);
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
