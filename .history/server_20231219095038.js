const express = require("express");
const usersRouter = require("./users");
const weekListRouter = require("./weeklist");

const app = express();

app.use("/api", usersRouter);

app.use("/api", weekListRouter);
