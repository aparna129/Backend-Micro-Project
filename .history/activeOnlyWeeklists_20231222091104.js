const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let activeWeeklists = [];

    allUsers.forEach((user) => {
      const userWeeklists = user.weekLists.map((weeklist) => {
        const currentDate = new Date();
        const endDate = new Date(weeklist.endDate);

        const timeLeft = endDate.getTime() - currentDate.getTime();

        const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutesLeft = Math.floor(
          (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const formattedTime = `${daysLeft}d:${hoursLeft}h:${minutesLeft}m:${secondsLeft}s`;

        const currentWeeklist = weeklist.toObject();

        if (currentWeeklist.status == "active") {
          return {
            yourWeeklist: currentWeeklist,
            timeLeft: formattedTime,
            createdBy: user.fullName,
            userId: user._id,
          };
        }
        return null;
      });

      .filter((weeklist) => weeklist !== null);

      activeWeeklists = activeWeeklists.concat(userWeeklists);
    });

    res.json({
      message: "Active weeklists with time left to complete",
      data: activeWeeklists,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
