const express = require("express")
router.get("/health", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const currentTime = new Date().toLocaleString();

    let isServerActive = false; // Flag to track server status

    allUsers.forEach((user) => {
      user.weekLists.forEach((weeklist) => {
        const weeklistState = determineWeeklistState(weeklist);

        if (weeklistState === "active") {
          isServerActive = true; // At least one active weeklist, consider server active
        }
      });
    });

    const serverState = isServerActive ? "active" : "inactive";

    res.json({
      currentTime,
      serverState,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
