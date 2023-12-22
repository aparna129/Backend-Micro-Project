const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("TASKS DELETION");
});

router.patch("/:userId/:weeklistId/:taskId", async (req, res) => {
  try {
    const { userId, weeklistId, taskId } = req.params;

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
    const creationTime =
      user.activeWeekLists[weeklistIndex].tasks[taskIndex].date.getTime();

    const currentTime = new Date().getTime();

    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

    if (currentTime - creationTime > twentyFourHoursInMs) {
      return res.send("Cannot delete task after 24 hours");
    }

    user.activeWeekLists[weeklistIndex].tasks.splice
    user.activeWeekLists.splice(weeklistIndex, 1);

    await user.save();

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
