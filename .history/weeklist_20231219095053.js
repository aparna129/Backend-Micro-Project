const express = require("express");
const router = express.Router();

const app2 = express();

app.get("/", (req, res) => {
  res.send("Hello");
});
