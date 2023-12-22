const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    const serverName = "Week List Server";
    const currentTime = new Date().toLocaleString();

    const healthInfo = {
      serverName: serverName,
      currentTime: currentTime,
    };

    res.json(healthInfo);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
