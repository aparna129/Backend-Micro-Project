const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("Getting Status of Weeklist");
});

router.get("/:userId/:weeklistId", async (req, res) => {
  try {
    const { userId, weeklistId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      res.send("User does not exist");
      return;
    }

    const weeklistIndex = user.weekLists.findIndex(
      (weekList) => weekList._id.toString() === weeklistId
    );

    if (weeklistIndex == -1) {
      res.send("Weeklist does not exist");
      return;
    }

    const weeklist = user.weekLists[weeklistIndex];
    const allTasksMarked = weeklist.tasks.every(
      (task) => task.markOrUnmark == "marked"
    );

    if (allTasksMarked) {
      weeklist.status = "completed";
    } else {
      const currentDate = new Date();
      const startDate = weeklist.startDate;
      const startTime = startDate.getTime();
      const endTime = startTime + 7 * 24 * 60 * 60 * 1000;
      const endDate = new Date(endTime);

      if (currentDate > endDate) {
        weeklist.status = "inactive";
      } else {
        weeklist.status = "active";
      }
    }

    await user.save();
    res.json({ status: weeklist.status });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
