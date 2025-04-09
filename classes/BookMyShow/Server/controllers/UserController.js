const userModel = require("../models/userSchema");

const registerUser = async (req, res, next) => {
  try {
    const userExists = await userModel.findOne({ email: req?.body?.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User Already Exists",
      });
    }
    const newUser = new userModel(req?.body);
    console.log("newUser : ", newUser);
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

    if (req?.body?.password !== user?.password) {
      return res.send({
        success: false,
        message: "please enter valid password",
      });
    }

    res.send({
      success: true,
      message: "You've successfully Logged In",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
