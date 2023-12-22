const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("WEEKLISTS");
});

router.post("/:userId", async (req, res) => {
  try {
    const { description, startDate } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      res.send("User not found");
    }

    if (user.activeWeekLists.length >= 2) {
      res.send("Youalread")
    }

    // Create a new week list
    const newWeekList = {
      description,
      startDate,
    };
    console.log(newWeekList);
    // Add the new week list to the user's activeWeekLists array
    user.activeWeekLists.push(newWeekList);
    await user.save();

    res.json({
      message: "Week list added successfully",
      data: user.activeWeekLists,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
