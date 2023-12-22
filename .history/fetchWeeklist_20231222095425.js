const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/:weeklistId", async (req, res) => {
  try {
    const { weeklistId } = req.params;

    const allUsers = await User.find({});
    let foundWeeklist = null;

    allUsers.forEach((user) => {
      const userWeeklist = user.weekLists.find((weeklist) => {
        const currentWeeklist = weeklist.toObject();
        return currentWeeklist._id.toString() === weeklistId;
      });

      if (userWeeklist) {
        foundWeeklist = {
          yourWeekList: userWeeklist.toObject(),
          createdBy: user.fullName,
          userId: user._id,
        };
      }
    });

    if (foundWeeklist) {
      res.json({
        message: " Weeklist",
        data: foundWeeklist,
      });
    } else {
      res.json({
        message: "Weeklist not found",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
