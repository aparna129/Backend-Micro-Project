const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let allWeeklists = [];

    // Iterate through each user's weeklists
    allUsers.forEach((user) => {
      const userWeeklists = user.weekLists.map((weeklist) => {
        const currentDate = new Date();
        const endDate = new Date(weeklist.endDate);

        // Calculate time left in milliseconds
        const timeLeft = endDate.getTime() - currentDate.getTime();

        // Convert milliseconds to days (you can modify this conversion as needed)
        const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

        return {
          ...weeklist.toObject(), // Convert Mongoose document to plain JavaScript object
          timeLeftInDays: daysLeft,
          userId: user._id, // Include userId for reference
        };
      });

      // Concatenate weeklists from all users
      allWeeklists = allWeeklists.concat(userWeeklists);
    });

    res.json({
      message: "All Weeklists from all users with time left to complete",
      data: allWeeklists,
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
