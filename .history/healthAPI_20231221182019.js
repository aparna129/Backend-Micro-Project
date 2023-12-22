const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const serverName = "Week List Server";
  const currentTime = new Date().toLocaleString();

  const healthInfo = {
    serverName: serverName,
    currentTime: currentTime,
    state: serverState,
  };

  res.json(healthInfo);
});

module.exports = router;
