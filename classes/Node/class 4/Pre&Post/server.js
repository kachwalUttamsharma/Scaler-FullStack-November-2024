const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://kachwalsharma1:kn3mjWY6bcPLTnb8@cluster0.wdlkgvp.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("mongodb connection successfull");
  })
  .catch((error) => {
    console.log("mongodb connection failure ", error);
  });

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timeseries: true,
  }
);

userSchema.pre("save", function (next) {
  console.log("Pre-save hook: Hashing password before saving the user");
  this.password = `hashed_${this.password}`;
  next();
});

userSchema.post("save", function (doc, next) {
  console.log(
    `Post-save hook: User ${doc.name}  ${doc.password} has been saved`
  );
  next();
});

userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getQuery());
  console.log(
    `Pre-findOneAndDelete hook: Preparing to remove user ${user.name}`
  );
  next();
});

userSchema.post("findOneAndDelete", function (doc, next) {
  console.log(`Post-remove hook: User ${doc.name} has been removed`);
  next();
});

const User = mongoose.model("users", userSchema);

app.post("/users", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.status(201).send(`user ${newUser.name} has been created successfully`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    await User.findOneAndDelete({ _id: req.params.id });
    res.send(`User ${user.name} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error deleting user");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
