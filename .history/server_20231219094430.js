const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));


app.listen(PORT, () => {
  mongoose
    .connect(process.env.then(() => console.log("Database and Server Connected Successfully"))
    .catch((error) => {
      console.log(error);
    });
});

module.exports = app;
