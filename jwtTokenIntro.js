const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";
const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: "yogesh@gmail.com",
    password: "123",
    name: "Yogesh Lama",
  },
  {
    username: "madan@gmail.com",
    password: "123321",
    name: "Madan Bhandari",
  },
  {
    username: "preeti@gmail.com",
    password: "123321",
    name: "Preeti Rana",
  },
];

function userExists(username, password) {
  let userExists = false;
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (
      ALL_USERS[i].username == username &&
      ALL_USERS[i].password == password
    ) {
      userExists = true;
    }
  }

  return userExists;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, jwtPassword);
  const username = decoded.username;
  res.json({
    users: ALL_USERS.filter(function (value) {
      if (value.username == username) {
        return false;
      } else {
        return true;
      }
    }),
  });
});

app.listen(3000);
