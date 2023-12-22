const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("./userModel");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/:userId/:weeklistId", async (req, res) => {
  const { userId, weeklistId } = req.params;

  const user = await User.findById(userId);

    if (!user) {
      res.send("User does not exist");
      return;
    }

    const weeklistIndex = user.weekLists.findIndex(
      (weekList) => weekList._id.toString() === weeklistId
    );

    if (!weeklist) {
      res.send("Weeklist does not exist");
      return;
    }

  res.send("");
});

module.exports = router;
