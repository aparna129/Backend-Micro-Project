const express = require("express");
const app = require("./users.js");

const app2 = express();

app2.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000,())