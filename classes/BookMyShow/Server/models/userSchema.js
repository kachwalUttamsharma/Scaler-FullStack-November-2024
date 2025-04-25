const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // admin - bookmyshow onboarding of theatre and movies
    // partner - they will decide when to run how many to run and cost of tickets
    // user - how will book tickets
    role: {
      type: String,
      enum: ["admin", "partner", "user"],
      required: true,
      default: "user",
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
