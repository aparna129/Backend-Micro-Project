const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/:userId/:weeklistId", async (req, res) => {
  const { userId, weeklistId } = req.params;

  res.send("Helelo");
});

module.exports = router;
