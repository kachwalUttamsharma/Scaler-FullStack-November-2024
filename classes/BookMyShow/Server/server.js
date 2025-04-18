const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute");
const theatreRoute = require("./routes/theatreRoute");
const errorHandler = require("./middlewares/errorHandler");
const { validateJWTToken } = require("./middlewares/authorizationMiddleware");

connectDB();
app.use(express.json());
app.use("/bms/v1/users", userRoute);
app.use("/bms/v1/movies", validateJWTToken, movieRoute);
app.use("/bms/v1/theatres", validateJWTToken, theatreRoute);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
