const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("TASKS CREATION");
});

router.post("/:userId/:weeklistId", async (req, res) => {
  try {
    const { task } = req.body;
    const { userId, weeklistId } = req.params;

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

    const date = new Date();

    const newTask = {
      task,
      date,
    };

    user.activeWeekLists[weeklistIndex].tasks.push(newTask);

    await user.save();

    res.json({
      message: "Task created successfully",
      task: user.activeWeekLists[weeklistIndex].tasks[],
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
