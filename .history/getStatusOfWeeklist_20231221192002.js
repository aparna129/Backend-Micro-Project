const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

const status = "active";

router.get("/", (req, res) => {
  res.send(status);
});

module.exports = router;
