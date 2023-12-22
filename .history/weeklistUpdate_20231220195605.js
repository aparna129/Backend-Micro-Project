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
    await User.findByIdAndUpdate(userId, {
      description: "HelloNot",
    });
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
    const { firstName, lastName, phone } = req.body;
    //findByIdAndUpdate is the method to update data and it takes
    //2 arguments one is id and the other one is all key-value pairs of model used
    //Not necessary to pass value every time and not necessary to pass each and every value but all keys must be passed
    await User.findByIdAndUpdate(id, {
      firstName: "Shravya",
      lastName,
      phone,
    });
    res.json({
      message: "Success",
      data: "User updated successfully",
    });
  } catch (error) {
    res.json({
      message: "Failed",
      data: "Something went wrong",
    });
  }
});
*/
