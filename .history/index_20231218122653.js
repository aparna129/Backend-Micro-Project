const express = require("express");
const dotenv = require("dotenv");



const app = express();

const port = process.env.PORT_NO;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
 
  console.log("Server running successfully");
});
