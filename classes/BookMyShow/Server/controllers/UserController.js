const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
