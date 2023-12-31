const mongoose = require("mongoose");

const User = mongoose.model("user", {
  fullName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  mobile: Number,
  weekLists: [
    {
      description: String,
      startDate: Date,
      endDate: Date,
      status: String,
      tasks: [{ task: String, date: Date, markOrUnmark: String }],
    },
  ],
});

module.exports = User;
