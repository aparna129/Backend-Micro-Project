const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const weeklists = W
  res.json({ data: weeklists });
});
module.exports = router;
