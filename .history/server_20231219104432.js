const express = require("express");
const mongoose = require("mongoose");

const usersRouter = require("./users");
const weekListRouter = require("./weeklist");
const signupRouter = require("./signUpP");

const app = express();

const PORT = process.env.PORT || 3000;

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
