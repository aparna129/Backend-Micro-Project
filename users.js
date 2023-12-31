const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const User = require("./userModel");

dotenv.config();

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
