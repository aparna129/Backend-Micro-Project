const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("WEEKLISTS UPDATION");
});

router.patch("/:userId/:weeklistId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { weeklistId } = req.params;
    const { description } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.send("User does not exist");
      return;
    }

    const weeklist = user.activeWeekLists.find(
      (weekList) => weekList._id.toString() === weeklistId
    );

    if (!weeklist) {
      res.send("Weeklist does not exist");
      return;
    }

    const creationTime = weeklist.startDate.getTime();

    const currentTime = new Date().getTime();

    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

    if (currentTime - creationTime > twentyFourHoursInMs) {
      return res.send("Cannot update weeklist after 24 hours");
    }

    user.activeWeekLists[weeklistIndex].description = desc

    res.send("Weeklist updated successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
