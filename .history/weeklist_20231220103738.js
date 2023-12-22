const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/addWeekList/:userId", async (req, res) => {
    try {
      const { description, startDate } = req.body;
      const userId = req.params.userId;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the user already has two active week lists
      if (user.activeWeekLists.length >= 2) {
        return res.status(400).json({ error: 'Maximum active week lists reached' });
      }
  
      // Create a new week list
      const newWeekList = {
        description,
        startDate,
        endDate: /* Calculate the end date based on your logic */,
      };
  
      // Add the new week list to the user's activeWeekLists array
      user.activeWeekLists.push(newWeekList);
      await user.save();
  
      res.json({ message: 'Week list added successfully', data: user.activeWeekLists });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;
