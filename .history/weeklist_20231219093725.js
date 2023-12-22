const express = require("express");
const app = require("./users.js");

const app2 = express();

app2.get("/", (req, res) => {
  res.send("Hello");
});

app2.listen(4000, () => {
  console.log("Server running successfully");
});
