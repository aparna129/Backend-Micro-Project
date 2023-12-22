const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/", (req, res) => {
  res.send("WEEKLISTS DELETION");
});

router.delete("/:userId/:weeklistId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { weeklistId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      res.send("User does not exist");
      return;
    }

    const weeklist = user.activeWeekLists.find(
      (weekList) => weekList._id.toString() === weeklistId
    );

    const weeklistIndex = user.activeWeekLists.findIndex(
      (weekList) => weekList._id.toString() === weeklistId
    );

    if (!weeklist) {
      res.send("Weeklist does not exist");
      return;
    }

    const creationTime = weeklist.startDate.getTime();

    const currentTime = new Date().getTime();

    const twentyFourHoursInMs =  1000;

    if (currentTime - creationTime > twentyFourHoursInMs) {
      return res.send("Cannot delete weeklist after 24 hours");
    }

    user.activeWeekLists.splice(weeklistIndex, 1);
    await user.save();

    res.send("Weeklist deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
