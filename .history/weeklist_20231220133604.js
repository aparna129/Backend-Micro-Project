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
    const { description } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (user.activeWeekLists.length >= 2) {
      res.send(
        "Cannot create weeklist as you already have two active weeklists"
      );
    }

    const startDate = new Date();
    const 
    const newWeekList = {
      description,
      startDate,
      endDate,
    };

    user.activeWeekLists.push(newWeekList);

    await user.save();

    res.json({
      message: "Week list created successfully",
      data: user.activeWeekLists,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
