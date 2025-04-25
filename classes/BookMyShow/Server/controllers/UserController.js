const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailHelper = require("../utils/emailHelper");

const registerUser = async (req, res, next) => {
  try {
    const userExists = await userModel.findOne({ email: req?.body?.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User Already Exists",
      });
    }
    // hashing usecase
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req?.body?.password, salt);
    console.log("hashed password: ", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = new userModel(req?.body);
    await newUser.save();
    res.send({
      success: true,
      message: "Registration Successfull, Please Login",
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req?.body?.email });

    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist. Please register",
      });
    }

    const validatePassword = await bcrypt.compare(
      req?.body?.password,
      user?.password
    );

    if (!validatePassword) {
      return res.send({
        success: false,
        message: "please enter valid password",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.send({
      success: true,
      message: "You've successfully Logged In",
      data: token,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "User Details Fetched Successfully",
      data: user,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email == undefined) {
      return res.status(401).json({
        status: "false",
        message: "Please enter the email for forget Password",
      });
    }
    let user = await userModel.findOne({ email: email });
    if (user == null) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    } else if (user?.otp != undefined && user.otp < user?.otpExpiry) {
      return res.json({
        success: false,
        message: "Please use otp sent on mail",
      });
    }
    const otp = Math.floor(Math.random() * 10000 + 90000);
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    await emailHelper("otp.html", user.email, {
      name: user.name,
      otp: otp,
    });
    res.send({
      success: true,
      message: "Otp has been sent",
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password, otp } = req.body;
    if (password == undefined || otp == undefined) {
      return res.status(401).json({
        success: false,
        message: "invalid request",
      });
    }
    const user = await userModel.findOne({ otp: otp });
    if (user == null) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    if (Date.now() > user.otpExpiry) {
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
      return res.status(401).json({
        success: false,
        message: "otp expired",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req?.body?.password, salt);
    // convert this logic into findByIdAndUpdate
    // considering we should not set vaules as undefined
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.send({
      success: true,
      message: "Password reset has been done successfully",
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
};
module.exports = {
  registerUser,
  loginUser,
  currentUser,
  forgetPassword,
  resetPassword,
};
