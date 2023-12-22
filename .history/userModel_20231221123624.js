const mongoose = require("mongoose");

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
      endDate: Date,
      tasks:Array
    },
  ],
});

module.exports = User;
