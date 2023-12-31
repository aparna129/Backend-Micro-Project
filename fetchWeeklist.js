const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/:weeklistId", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const { weeklistId } = req.params;

    let foundWeeklist = null;

    allUsers.forEach((user) => {
      const userWeeklist = user.weekLists.find(
        (weeklist) => String(weeklist._id) == weeklistId
      );

      if (userWeeklist) {
        foundWeeklist = {
          yourWeekList: userWeeklist.toObject(),
          createdBy: user.fullName,
          userId: user._id,
        };
      }
    });

    if (foundWeeklist != null) {
      res.json({
        message: "Weeklist found",
        data: foundWeeklist,
      });
    } else {
      res.json({
        message: "Weeklist not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
