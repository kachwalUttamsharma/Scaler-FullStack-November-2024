const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute");
const theatreRoute = require("./routes/theatreRoute");
const showRoute = require("./routes/showRoute");
const bookingRoute = require("./routes/bookingRoute");
const errorHandler = require("./middlewares/errorHandler");
const { validateJWTToken } = require("./middlewares/authorizationMiddleware");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const apiLimited = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too Many Request from this IP, please try again after 15 mins",
});

connectDB();
app.use(helmet());

// Custom Content Security Policy (CSP) configuration
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allows resources from the same origin (https://bookmyshowjune2024.onrender.com)
      scriptSrc: ["'self'"], // Allows scripts from your own domain
      styleSrc: ["'self'", "'unsafe-inline'"], // Allows styles from your domain and inline styles (if needed)
      imgSrc: ["'self'", "data:"], // Allows images from your domain and base64-encoded images
      connectSrc: ["'self'"], // Allows AJAX requests to your own domain
      fontSrc: ["'self'"], // Allows fonts from your domain
      objectSrc: ["'none'"], // Disallows <object>, <embed>, and <applet> elements
      upgradeInsecureRequests: [], // Automatically upgrades HTTP requests to HTTPS
    },
  })
);

app.use(express.json());
app.use(mongoSanitize());
app.use("/bms/", apiLimited);
app.use("/bms/v1/users", userRoute);
app.use("/bms/v1/movies", validateJWTToken, movieRoute);
app.use("/bms/v1/theatres", validateJWTToken, theatreRoute);
app.use("/bms/v1/shows", validateJWTToken, showRoute);
app.use("/bms/v1/bookings", validateJWTToken, bookingRoute);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
