const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const weeklists = Weeklist.fin
  res.json({ data: weeklists });
});
module.exports = router;
