const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT_NO;

app.listen(port, () => {
  console.log("Server running successfully");
});
