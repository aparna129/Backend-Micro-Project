const express = require("express");
const mongoose = req
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

router.use(bodyParser.urlencoded({ extended: false }));

// User Schema
const User = mongoose.model("user", {
  fullName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  mobile: Number,
});

router.get("/", (req, res) => {
  console.log("Signup Page");
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
