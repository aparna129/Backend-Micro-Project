const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const startDate = new Date().toLocaleString();
const endDate = new Date(startDate.

const Weeklist = mongoose.model("weeklist", {
  userId: String,
  startDate: startDate,
  endDate : 
});
router.get("/", async (req, res) => {
  const weeklists = await Weeklist.find();
  res.json({ data: weeklists });
});

module.exports = router;
