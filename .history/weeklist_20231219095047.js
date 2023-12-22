const express = require("express");
const router = express.Router();

const app2 = express();

app2.get("/", (req, res) => {
  res.send("Hello");
});
