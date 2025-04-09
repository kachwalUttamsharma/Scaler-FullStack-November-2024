const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("MongoDb Connection is Successfull ");
  } catch (error) {
    console.log("MongoDb connection error ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
