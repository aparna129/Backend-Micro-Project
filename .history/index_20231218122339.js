const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
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
