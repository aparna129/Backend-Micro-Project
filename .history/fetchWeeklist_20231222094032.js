const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/:weeklistId", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let activeWeeklists = [];

    allUsers.forEach((user) => {
      const userWeeklists = user.weekLists.map((weeklist) => {
       

        const currentWeeklist = weeklist.toObject();

       
          return {
            yourWeeklist: currentWeeklist,
            createdBy: user.fullName,
            userId: user._id,
          };
      
      });


      activeWeeklists = activeWeeklists.concat(activeOnlyWeeklists);
    });

   
      res.json({
        message: "Active weeklists with time left to complete",
        data: activeWeeklists,
      });
    } else {
      res.json({
        message: "No Active weeklists are there",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
