const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const weekListsRouter = require("./weeklist");

const app = express();

app.use("/api", usersRouter);

app.use("/api", weekListRouter);
