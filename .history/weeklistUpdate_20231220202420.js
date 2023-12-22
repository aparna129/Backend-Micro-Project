const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("WEEKLISTS UPDATION");
});

router.patch("/:userId/:weeklistId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { weeklistId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      res.send("User does not exist");
    }

    const weeklist = user.activeWeekLists.find(
      (weekList) => weekList._id.toString() === weeklistId
    );

    console.log(weeklist);

    res.send("Weeklist updated successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

/*
app.patch("/users/:id", async (req, res) => {
  try {
    //Here id is must as we should know whose details are to be updated
    //Id is created in database
    const { id } = req.params;
