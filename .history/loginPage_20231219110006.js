const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  console.log("Login Page");
});

router.post("/", async (req, res) => {
  try {
    const { fullName, email, password, age, gender, mobile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      age,
      gender,
      mobile,
    });
    res.json({ data: user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
