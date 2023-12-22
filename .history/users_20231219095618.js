const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

router.get("/weeklists", (req, res) => {
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    res.send("Default Page !!");
  });

  // User Schema
  const User = mongoose.model("user", {
    fullName: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    mobile: Number,
  });

  app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json({ data: users });
  });

  // Signup Route
  app.post("/signup", async (req, res) => {
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

  // Login Route
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        jwttoken = jwt.sign(user.toJSON(), process.env.JWT_SECRETKEY, {
          expiresIn: "1h",
        });
        res.json({ jwttoken: jwttoken });
      }
    } catch (error) {
      console.log(error);
    }
  });

  // Health api
  app.get("/health", (req, res) => {
    const serverName = "Week List Server";
    const currentTime = new Date().toLocaleString();
    const serverState = "active";

    const healthInfo = {
      serverName: serverName,
      currentTime: currentTime,
      state: serverState,
    };

    res.json(healthInfo);
  });

  // Route not found middleware
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });

  app.listen(PORT, () => {
    mongoose
      .connect(process.env.MongoDB_URL)
      .then(() => )
      .catch((error) => {
        console.log(error);
      });
  });
});

module.exports = router;
