const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("MARKING OR UNMARKING TASK");
});

router.patch("/:userId/:weeklistId/:taskId", async (req, res) => {
  const { userId, weeklistId, taskid } = req.params;
  const { markOrUnmark } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.send("User does not exist");
    return;
  }

});
