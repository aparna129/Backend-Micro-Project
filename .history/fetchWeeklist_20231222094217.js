const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/:weeklistId", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const {weeklistId}

    allUsers.forEach((user) => {
      const userWeeklists = user.weekLists.map((weeklist) => {
        const currentWeeklist = weeklist.toObject();

        const weeklist = user.weekLists.find(
            (weekList) => weekList._id.toString() === weeklistId
          );
      
          const weeklistIndex = user.weekLists.findIndex(
            (weekList) => weekList._id.toString() === weeklistId
          );
      
          if (!weeklist) {
            res.send("Weeklist does not exist");
            return;
          }
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
