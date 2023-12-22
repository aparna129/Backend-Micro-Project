const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let allWeeklists = [];

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

        return {
          ...weeklist.toObject(),
          timeLeft: {
            days: daysLeft,
            hours: hoursLeft,
            minutes: minutesLeft,
            seconds: secondsLeft,
          },
          userId: user._id,
        };
      });

      allWeeklists = allWeeklists.concat(userWeeklists);
    });

    res.json({
      message: "All weeklists with time left to complete",
      data: `${weeklist},${daysLeft}d:${hoursLeft}h:${minutesLeft}m:${secondsLeft}s`,
      user._d,
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
