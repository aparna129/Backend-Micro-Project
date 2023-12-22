const mongoose = require("mongoose");

// User Schema
const User = mongoose.model("user", {
  fullName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  mobile: Number,
  activeWeekLists: [
    {
      description: String,
      startDate: Date,
    },
  ],
});

module.exports = User;
