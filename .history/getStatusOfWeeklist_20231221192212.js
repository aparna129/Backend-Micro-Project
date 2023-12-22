const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/:userId/:weeklistId", (req, res) => {
    const {userId,weeklistI}
  res.send("");
});

module.exports = router;
