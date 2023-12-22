const express = require("express");
const usersRouter = require("./users");
const weekListRouter = require("./weeklist");

const app2 = express();

app2.use("/api", usersRouter);

app2.use("/api", weekListRouter);
n
