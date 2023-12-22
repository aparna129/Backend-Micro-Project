const express = require("express");

// Signup Route
router.post("/signup", async (req, res) => {
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