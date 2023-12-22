const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const weekListsRouter = require("./weeklist");

const app = express();

app.use('/api', usersRouter);

// Use week list-related routes
app.use('/api', weekListsRouter);
