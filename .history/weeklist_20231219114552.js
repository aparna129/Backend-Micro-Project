const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const 
router.get("/", async (req, res) => {
  const weeklists = await Weeklist.find();
  res.json({ data: weeklists });
});


module.exports = router;
