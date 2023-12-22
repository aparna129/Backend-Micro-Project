const express = require("express");
const mongoose = require("mongoose");

const usersRouter = require("./users");
const signupRouter = require("./signUpPage");
const loginRouter = require("./loginPage");
const healthAPI = require("./healthAPI");
const weekListCreateRouter = require("./weeklistCreation");
const weeklistUpdateRouter = require("./weeklistUpdate");
const weeklistDeleteRouter = require("./weeklistDelete");
const taskCreateRouter = require("./tasksCreation");
const markUnmarkRouter = require("./markUnmarkTasks");
const taskUpdateRouter = require("./tasksUpdation");
const taskDeleteRouter = require("./tasksDeletion");
const getStatusRouter = require("./getStatusOfWeeklist");
const allWeeklistsRouter = require("./allWeeklists");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/users", usersRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/health", healthAPI);
app.use("/weeklistcreation", weekListCreateRouter);
app.use("/weeklistupdate", weeklistUpdateRouter);
app.use("/weeklistdelete", weeklistDeleteRouter);
app.use("/taskcreation", taskCreateRouter);
app.use("/markunmark", markUnmarkRouter);
app.use("/taskupdate", taskUpdateRouter);
app.use("/taskdelete", taskDeleteRouter);
app.use("/getstatus", getStatusRouter);
app.use("/allweeklists", allWeeklistsRouter);
app.use("/activeweeklists")

// Route not found middleware
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MongoDB_URL)
    .then(() => console.log("Server and Database connected successfully"))
    .catch((error) => {
      console.log(error);
    });
});
