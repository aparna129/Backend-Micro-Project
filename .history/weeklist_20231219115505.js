const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const startDate = new Date();
const endDate = new Date(
  startDate.getFullYear(),
  startDate.getMonth(),
  startDate.getDate() + 7
);

const Weeklist = mongoose.model("weeklist", {
  userId: String,
  startDate: String,
  endDate: String,
});

router.get("/", async (req, res) => {
  const weeklists = await Weeklist.find();
  res.json({ data: weeklists });
});

router.post("/",(req,res)=>{
    try {
      const userId = req.body.userId; // Assuming userId is sent in the request
      const user = await User.findById(userId).populate('activeWeekLists');
  
      if (user.activeWeekLists.length >= 2) {
        return res.status(400).json({ error: "You already have two active week lists." });
      }
  
      // Check if any active week list is still ongoing
      const activeWeekList = user.activeWeekLists.find(list => list.endDate > new Date());
      if (activeWeekList) {
        return res.status(400).json({ error: "Please wait for the active week list to end before adding a new one." });
      }
  
      // Create a new week list
      const newWeekList = await WeekList.create({
        userId: userId,
        startDate: new Date(), // Set start date to current date
        endDate: /* Calculate end date for the week list */,
        // Other fields for the week list
      });
  
      // Update user's activeWeekLists field
      user.activeWeekLists.push(newWeekList._id);
      await user.save();
  
      res.json({ message: "Week list added successfully.", data: newWeekList });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add week list." });
    }
  });

module.exports = router;
