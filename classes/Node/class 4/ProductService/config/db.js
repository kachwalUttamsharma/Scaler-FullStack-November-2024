const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const response = await mongoose.connect(
      "mongodb+srv://kachwalsharma1:kn3mjWY6bcPLTnb8@cluster0.wdlkgvp.mongodb.net/shopApi?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDb Connection is Successfull ");
  } catch (error) {
    console.log("MongoDb connection error ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
