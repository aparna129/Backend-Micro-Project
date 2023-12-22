const express = require("express");
const mongoose = require("mongoose");

const usersRouter = require("./users");
const weekListRouter = require("./weeklist");
const signupRouter = require("./signUpPage");

const app = express();

const PORT = process.env.PORT || 3000;

// User Schema
const User = mongoose.model("user", {
  fullName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  mobile: Number,
});

app.use("/users", usersRouter);

app.use("/weeklist", weekListRouter);

app.use("/signup", signupRouter);

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MongoDB_URL)
    .then(() => console.log("Server and Database connected successfully"))
    .catch((error) => {
      console.log(error);
    });
});
