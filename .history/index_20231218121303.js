const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(po, () => {
  console.log("Server running successfully");
});