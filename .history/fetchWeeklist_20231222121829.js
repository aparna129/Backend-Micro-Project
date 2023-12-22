const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/:weeklistId", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const { weeklistId } = req.params;

    let weeklist = null;

    allUsers.forEach((user) => {
     
    });
   if(""){
      res.json({
        message: "Weeklist found",
        data: weeklist,
      });
    }
    } else {
      res.json({
        message: "Weeklist not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
