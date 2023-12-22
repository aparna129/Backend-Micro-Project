const express = require("express");
const dotenv = require("dotenv");

const app = express();

const port = process.env.PORT_NO;
console.log(process.env);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  dotenv.config();
  console.log("Server running successfully");
});
