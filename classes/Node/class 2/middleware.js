const express = require("express");
const errorHandler = require("./ErrorHandling");

const app = express();

const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date()} --- request [${req.method} ${req.url}]`);
  next();
};

// route level middleware
const auth = (req, res, next) => {
  const params = req.query;
  if (params?.password === "123") {
    next();
  } else {
    // res.status(401).json({ message: "please enter right password" });
    res.status(401);
    throw new Error("user is not valid");
  }
};

// application level middleware
app.use(loggerMiddleware);
// built-in middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Middleware APP");
});

app.get("/1", auth, (req, res) => {
  res.send("Middleware APP");
});

app.use(errorHandler);
app.listen(3001, (req, res) => {
  console.log("middleware server is running on 3001");
});
