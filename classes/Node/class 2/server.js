const express = require("express");
const port = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello Express");
});

app.get("/about", (req, res) => {
  res.send("About page info");
});

app.get("/data", (req, res) => {
  res.send("data page info");
});

let userInfo = [
  {
    username: "Anurag",
    email: "Anurag@scaler.com",
  },
];

app.get("/getUserDetails", (req, res) => {
  res.status(200).json(userInfo);
});

app.post("/addNewUser", (req, res) => {
  console.log(req.body);

  const { username, email } = req?.body;
  if (!username || !email) {
    res.status(400).json({ message: "username and email are required" });
  }
  const existingUser = userInfo.find(
    (user) => user?.username.toLowerCase() === username.toLowerCase()
  );

  if (existingUser) {
    res.status(409).json({ message: "user already exisits" });
  }

  userInfo.push(req?.body);
  res.status(201).json({ message: "user has been created", user: req?.body });
});

// patch -> partial update
// put -> complete update
app.patch("/updateUserInfo", (req, res) => {
  const { username, email } = req?.body;
  if (!username || !email) {
    res.status(400).json({ message: "username and email are required" });
  }
  const existingUserIndex = userInfo.findIndex(
    (user) => user?.username.toLowerCase() === username.toLowerCase()
  );

  if (existingUserIndex !== -1) {
    userInfo[existingUserIndex].email = email;
    res.status(200).json({
      message: "user info has been updated",
      user: userInfo[existingUserIndex],
    });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

app.delete("/deleteUser", (req, res) => {
  const { email } = req?.body;
  const existingUser = userInfo.find(
    (user) => user?.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    userInfo = userInfo.filter(
      (user) => user?.email?.toLowerCase() !== email?.toLowerCase()
    );
    console.log("userinfo after filer");
    res.status(200).json({ message: "user has been deleted" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

app.listen(port, () => {
  console.log(`Express app is Listenting on port ${port}`);
});
