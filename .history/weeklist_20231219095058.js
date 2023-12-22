const express = require("express");
const router = express.Router();

const app3 = express();

app3.get("/", (req, res) => {
  res.send("Hello");
});
