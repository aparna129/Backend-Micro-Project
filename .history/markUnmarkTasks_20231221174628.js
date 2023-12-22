const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("MARKING OR UNMARKING TASK");
});

router.patch("/:userId/:weeklistId/:taskId", async (req, res) => {
  try {
    const { userId, weeklistId, taskId } = req.params;
    const { markUnmark } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.send("User does not exist");
      return;
    }

    const weeklistIndex = user.activeWeekLists.findIndex(
      (weekList) => weekList._id.toString() === weeklistId
    );

    if (weeklistIndex == -1) {
      res.send("Weeklist does not exist");
      return;
    }

    const taskIndex = user.activeWeekLists[weeklistIndex].tasks.findIndex(
      (task) => task._id.toString() === taskId
    );

    if (taskIndex == -1) {
      res.send("Task does not exist");
      return;
    }

    const currentDate = new Date();
    const startDate = user.activeWeekLists[weeklistIndex].startDate;
    const startTime = startDate.getTime();
    const endTime = startTime + 7 * 24 * 60 * 60 * 1000;
    const endDate = new Date(endTime);

    if (currentDate >= startDate && currentDate <= endDate) {
      user.activeWeekLists[weeklistIndex].tasks[taskIndex].markOrUnmark =
        markUnmark;
      user.activeWeekLists[weeklistIndex].tasks[taskIndex].date = new Date();

      await user.save();

      res.json({
        message: "Task updated successfully",
        data: user.activeWeekLists[weeklistIndex].tasks[taskIndex].markOrUnmark,
      });
    } else {
      res
        .status(403)
        .send("Task can only be updated within the specified 7-day period.");
    }
    user.activeWeekLists[weeklistIndex].tasks[taskIndex].markOrUnmark =
      markUnmark;
    user.activeWeekLists[weeklistIndex].tasks[taskIndex].date = new Date();

    await user.save();

    res.json({
      message: `Task ${user.activeWeekLists[weeklistIndex].tasks[taskIndex].markOrUnmark} successfully`,
      markedOrUnmarked:
        user.activeWeekLists[weeklistIndex].tasks[taskIndex].markOrUnmark,
      updatedTime: user.activeWeekLists[weeklistIndex].tasks[taskIndex].date,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
