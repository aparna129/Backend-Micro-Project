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

    console.log(creationTime);
    const timestamp1 = creationTime;
    const dateObject1 = new Date(timestamp1);
    console.log(dateObject1);

    const currentTime = new Date().getTime();

    console.log(currentTime);
    const timestamp2 = currentTime;
    const dateObject2 = new Date(timestamp2);
    console.log(dateObject2);

    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

    if (currentTime - creationTime > twentyFourHoursInMilliseconds) {
      return res.status(403).send("Cannot delete weeklist after 24 hours");
    }

    res.send("Weeklist updated successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
