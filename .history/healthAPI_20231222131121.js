const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/health", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const currentTime = new Date().toLocaleString();

    let isServerActive = false;

    allUsers.forEach((user) => {
      user.weekLists.forEach((weeklist) => {
        const currentWeeklist = weeklist.toObject();

        if (weeklistState === "active") {
          isServerActive = true;
        }
      });
    });

    const serverState = isServerActive ? "active" : "inactive";

    res.json({
      serverName: "WeekList Server",
      currentTime,
      serverState,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
