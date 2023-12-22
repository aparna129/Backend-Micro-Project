const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Weeklist = mongoose.model('weeklist',{
    userId:String,
    startDate:
})
router.get("/", async (req, res) => {
  const weeklists = await Weeklist.find();
  res.json({ data: weeklists });
});


module.exports = router;
