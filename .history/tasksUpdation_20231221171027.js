const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("WEEKLISTS UPDATION");
});

router.patch("/:userId/:weeklistId/:taskId", async (req, res) => {
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

    if (!weeklist) {
      res.send("Weeklist does not exist");
      return;
    }

    const date = new Date();
    const markOrUnmark = "unmarked";

    const creationTime = user..startDate.getTime();

    const currentTime = new Date().getTime();

    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

    if (currentTime - creationTime > twentyFourHoursInMs) {
      return res.send("Cannot update weeklist after 24 hours");
    }

    const newTask = {
      task,
      date,
      markOrUnmark,
    };

    user.activeWeekLists[weeklistIndex].tasks.push(newTask);

    await user.save();

    

    user.activeWeekLists[weeklistIndex].description = description;
    await user.save();

    res.send("Weeklist updated successfully");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
