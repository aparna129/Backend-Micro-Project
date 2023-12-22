const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Default Page !!");
});

// User Schema
const User = mongoose.model("user", {
  fullName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  mobile: Number,
});

// Signup Route
app.post("/signup", (req, res) => {});

app.post("/login", (req, res) => {});

// Health api
app.get("/health", (req, res) => {
  const serverName = "Week List Server";
  const currentTime = new Date().toLocaleString();
  const serverState = "active";

  const healthInfo = {
    serverName: serverName,
    currentTime: currentTime,
    state: serverState,
  };

  res.json(healthInfo);
});

// Route not found middleware
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MongoDB_URL)
    .then(() => console.log("Database and Server Connected Successfully"))
    .catch((error) => {
      console.log(error);
    });
});
