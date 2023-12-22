const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("Login Page");
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      jwttoken = jwt.sign(user.toJSON(), process.env.JWT_SECRETKEY, {
        expiresIn: "1h",
      });
      res.json({ jwttoken: jwttoken });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
