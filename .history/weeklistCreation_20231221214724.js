const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("WEEKLISTS CREATION");
});

router.post("/:userId", async (req, res) => {
  try {
    const { description } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      res.send("User does not exist");
      return;
    }
    

    const inactiveOrCompletedWeeklists = user.weekLists.filter(
      (weeklist) =>
        weeklist.status == "inactive" || weeklist.status == "completed"
    );

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const newWeekList = {
      description,
      startDate,
      endDate,
    };

    user.weekLists.push(newWeekList);

    await user.save();

    res.json({
      message: "Week list created successfully",
      data: user.weekLists,
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
