const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorHandler");

connectDB();
app.use(express.json());
app.use("/bms/v1/users", userRoute);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
