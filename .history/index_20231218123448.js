const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running at ');
});