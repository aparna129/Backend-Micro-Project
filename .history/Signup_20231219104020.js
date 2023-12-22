const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { fullName, email, password, age, gender, mobile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      age,
      gender,
      mobile,
    });
    res.json({ data: user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
