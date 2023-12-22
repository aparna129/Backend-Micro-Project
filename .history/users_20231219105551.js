const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("./mongoose");

dotenv.config();

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
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
