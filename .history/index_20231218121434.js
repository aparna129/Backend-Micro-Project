const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const port = process.env.PORT_NO;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(posr, () => {
  console.log("Server running successfully");
});
