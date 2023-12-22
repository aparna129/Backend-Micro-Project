const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT;

app.listen(3000, () => {
  console.log($(port));
});
