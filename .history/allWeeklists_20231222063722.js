const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/", (req, res) => {
  res.send("MARKING OR UNMARKING TASK");
});
