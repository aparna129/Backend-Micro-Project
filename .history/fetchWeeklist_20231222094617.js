const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/:weeklistId", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const { weeklistId } = req.params;

    allUsers.forEach((user) => {
      const userWeeklists = user.weekLists.map((weeklist) => {
        const currentWeeklist = weeklist.toObject();

        if (currentWeeklist._id == weeklistId) {
          return {
            yourWeekList: currentWeeklist,
            createdBy: user.fullName,
            userId: user._id,
          };
        }
        return null;

       
      });
    });

    res.json({
      message: "Active weeklists with time left to complete",
      data: activeWeeklists,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;