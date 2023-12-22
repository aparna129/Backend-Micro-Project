const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const weeklists = Weeklist.find();
  res.json({ data: weeklists });
});
module.exports = router;
