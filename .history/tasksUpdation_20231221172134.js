const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("TASKS UPDATION");
});

router.patch("/:userId/:weeklistId/:taskId", async (req, res) => {
  try {
    const { task } = req.body;
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
    const date = new Date();
    const markOrUnmark = "unmarked";

    const creationTime =
      user.activeWeekLists[weeklistIndex].tasks[taskIndex].date.getTime();

    const currentTime = new Date().getTime();

    const twentyFourHoursInMs = 3 * 60 * 1000;

    if (currentTime - creationTime > twentyFourHoursInMs) {
      return res.send("Cannot update task after 24 hours");
    }

    const newTask = {
      task,
      date,
      markOrUnmark,
    };

    user.activeWeekLists[weeklistIndex].tasks[taskIndex].task = task;

    await user.save();

    res.json({
      message: "Task updated successfully",
      updatedTask: user.activeWeekLists[weeklistIndex].tasks[taskIndex].task,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
