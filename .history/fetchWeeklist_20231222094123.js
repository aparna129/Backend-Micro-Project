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


       
      
      });


      activeWeeklists = activeWeeklists.concat(activeOnlyWeeklists);
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
