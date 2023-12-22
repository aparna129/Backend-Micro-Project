const express = require("express");
const router = express.R
router.get("/health", (req, res) => {
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
