const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const startDate = new Date();
const endDate = new Date(
  startDate.getFullYear(),
  startDate.getMonth(),
  startDate.getDate() + 7
);

const Weeklist = mongoose.model("weeklist", {
  userId: String,
  startDate: String,
  endDate: String,
});

router.get("/", async (req, res) => {
  const weeklists = await Weeklist.find();
  res.json({ data: weeklists });
});

module.exports = router;
