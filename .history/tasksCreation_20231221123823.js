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

    const startDate = new Date();

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
