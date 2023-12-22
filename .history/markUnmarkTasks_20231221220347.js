const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

const canBeMarkedUnmarked = async (req, res, next) => {
  const { userId, weeklistId, taskId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    res.send("User does not exist");
    return;
  }

  const weeklistIndex = user.weekLists.findIndex(
    (weekList) => weekList._id.toString() === weeklistId
  );

  if (weeklistIndex === -1) {
    res.send("Weeklist does not exist");
    return;
  }

  const taskIndex = user.weekLists[weeklistIndex].tasks.findIndex(
    (task) => task._id.toString() === taskId
  );

  if (taskIndex === -1) {
    res.send("Task does not exist");
    return;
  }

  const currentDate = new Date();
  const startDate = user.weekLists[weeklistIndex].startDate;
  const startTime = startDate.getTime();
  const endTime = startTime + 7 * 24 * 60 * 60 * 1000;
  const endDate = new Date(endTime);

  if (
    (currentDate >= startDate && currentDate <= endDate) ||
    user.weekLists[weeklistIndex].status != "completed"
  ) {
    next();
  } else {
    res.send(
      "Task cannot be marked or unmarked as weeklist is "
    );
  }
};

router.get("/", (req, res) => {
  res.send("MARKING OR UNMARKING TASK");
});

router.patch(
  "/:userId/:weeklistId/:taskId",
  canBeMarkedUnmarked,
  async (req, res) => {
    try {
      const { userId, weeklistId, taskId } = req.params;
      const { markUnmark } = req.body;

      const user = await User.findById(userId);

      const weeklistIndex = user.weekLists.findIndex(
        (weekList) => weekList._id.toString() === weeklistId
      );

      const taskIndex = user.weekLists[weeklistIndex].tasks.findIndex(
        (task) => task._id.toString() === taskId
      );

      user.weekLists[weeklistIndex].tasks[taskIndex].markOrUnmark = markUnmark;
      user.weekLists[weeklistIndex].tasks[taskIndex].date = new Date();

      await user.save();

      res.json({
        message: `Task ${user.weekLists[weeklistIndex].tasks[taskIndex].markOrUnmark} successfully`,
        markOrUnmark:
          user.weekLists[weeklistIndex].tasks[taskIndex].markOrUnmark,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
