const express = require("express");
const { createNewTask, getAllTasksByProjectID, deleteTask, markAsComplete } = require("../controllers/tasks.controllers");

const tasksRouter = express.Router();

tasksRouter.get("/test", (req, res) => {
  res.send("This Router is working");
});

tasksRouter.route("/").post(createNewTask).delete(deleteTask);

tasksRouter.route("/list").get(getAllTasksByProjectID);
tasksRouter.route("/complete").put(markAsComplete);

module.exports = tasksRouter;
