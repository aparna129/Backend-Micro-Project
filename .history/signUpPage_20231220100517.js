const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("Signup Page");
});

router.post("/", async (req, res) => {
  try {
    const { fullName, email, password, age, gender, mobile, activeWeekLists } =
      req.body;
      console.log
    //const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password,
      age,
      gender,
      mobile,
      activeWeekLists: [activeWeekLists],
    });
    res.json({ data: req.body });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
