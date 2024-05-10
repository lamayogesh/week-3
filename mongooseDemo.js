const { kStringMaxLength } = require("buffer");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:OINyd1Ur6lAtUSWA@cluster0.atwetyt.mongodb.net/userappnew",
);

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

const user = new User({
  name: "yogesh",
  email: "yogesh@gmail.com",
  password: "123456",
});


user.save();
