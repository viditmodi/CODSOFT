const express = require("express");
const {
  createNewProject,
  getAllProjectsByUsername,
  deleteProject,
  getProjectData,
  getJoinedProjectsByUsername,
} = require("../controllers/projects.controllers");

const projectsRouter = express.Router();

projectsRouter.get("/test", (req, res) => {
  res.send("This Router is working");
});

projectsRouter
  .route("/")
  .post(createNewProject)
  .delete(deleteProject)
  .get(getProjectData);

projectsRouter.route("/list").get(getAllProjectsByUsername);
projectsRouter.route("/list/joined").get(getJoinedProjectsByUsername);

module.exports = projectsRouter;
