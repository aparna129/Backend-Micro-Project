const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Default Page !!");
});

app.get("/health", (req, res) => {
  const serverName = "Week List Server";
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
