const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:OINyd1Ur6lAtUSWA@cluster0.atwetyt.mongodb.net/userappnew",
);

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.post("/signin",async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  user.save();
  res.json({
    mesage: "User created successfully",
  });
});

app.listen(3000);
