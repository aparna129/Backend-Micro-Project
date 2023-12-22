const express = require("express");
const usersRouter = require("./users");
const weekListRouter = require("./weeklist");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api", usersRouter);

app.use("/api", weekListRouter);

app2.listen(PORT, () => {
  console.log("Server running successfully");
});
