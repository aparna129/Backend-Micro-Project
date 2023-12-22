const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("m")
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

dotenv.config();

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

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
});

// Signup Route
router.post("/signup", async (req, res) => {
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

// Login Route
router.post("/login", async (req, res) => {
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

// Health api
router.get("/health", (req, res) => {
  const serverName = "Week List Server";
  const currentTime = new Date().toLocaleString();
  const serverState = "active";

  const healthInfo = {
    serverName: serverName,
    currentTime: currentTime,
    state: serverState,
  };

  res.json(healthInfo);
});

// Route not found middleware
router.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = router;
