const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("Server running at "${POR);
});
