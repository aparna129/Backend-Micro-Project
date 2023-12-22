const express = require("express");
const usersRouter = require("./users.js");
const weekListRouter = require("./weeklist");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api", usersRouter);

app.use("/api", weekListRouter);

app.listen(PORT, () => {
  console.log("Server running successfully");
});
