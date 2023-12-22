const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const startDate = new Date();
const endDate = new Date(
  startDate.getFullYear(),
  startDate.getMonth(),
  startDate.getDate() + 7
);


router.post("/", (req, res) => {});

module.exports = router;
