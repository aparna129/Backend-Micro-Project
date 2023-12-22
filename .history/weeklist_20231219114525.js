const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
  const weeklists = Weeklist.find();
  res.json({ data: weeklists });
});
module.exports = router;
