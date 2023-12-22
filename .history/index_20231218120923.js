const express = require("express");
const dotenv = require("do")

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log("Server running successfully");
});
