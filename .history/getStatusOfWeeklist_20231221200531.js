const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/:userId/:weeklistId", async (req, res) => {
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

  const weeklist = user.activeWeekLists[weeklistIndex];
  const allTasksMarked = weeklist.tasks.every((task) => task.markOrUnmark === true);

  const status = "active";

  res.send(status);
});

module.exports = router;
