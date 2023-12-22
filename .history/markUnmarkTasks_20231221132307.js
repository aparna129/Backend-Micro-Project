const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("./userModel");

router.get("/", (req, res) => {
  res.send("MARKING OR UNMARKING TASK");
});

router.patch("/:userId/:weeklistId/:taskId", async (req, res) => {
  try {
    const { userId, weeklistId, taskId } = req.params;
    const { markOrUnmark } = req.body;

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

    user.activeWeekLists[weeklistIndex].tasks[taskIndex].markOrUnmark =
      markOrUnmark;
    user.activeWeekLists[weeklistIndex].tasks[taskIndex].date = new Date();

    await user.save();

    res.send("Task updated successfully");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
