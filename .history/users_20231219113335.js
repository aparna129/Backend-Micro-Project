const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("./userModel");

dotenv.config();

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
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

module.exports = router;
