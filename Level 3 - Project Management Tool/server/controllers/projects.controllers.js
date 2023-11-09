const { generateRandomString } = require("../functions/random.functions");
const AccountsCollection = require("../models/accounts.model");
const ProjectsCollection = require("../models/projects.model");
const TasksCollection = require("../models/tasks.model");

const createNewProject = async (req, res) => {
  try {
    const { name, desc, deadline, budget, creator } = req.body;

    const isExistingProject = await ProjectsCollection.findOne({
      name,
      creator,
    });
    if (isExistingProject) {
      return res
        .status(200)
        .send({ status: false, message: "Project already exists" });
    }

    const project_id = generateRandomString(30);

    const newProject = new ProjectsCollection({
      name,
      desc,
      deadline: new Date(deadline),
      project_id,
      budget,
      stage: "planning",
      creator,
      members: [creator],
    });

    const addedProject = await newProject.save();

    // const updatedAccount = await AccountsCollection.findOneAndUpdate({username: creator, })

    res
      .status(200)
      .send({
        status: true,
        message: "Project Creation Success",
        data: addedProject,
      });

    // project_id, stage, members
  } catch (error) {
    console.log("Error in createNewProject");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const getJoinedProjectsByUsername = async (req, res) => {
  try {
    const { username } = req.query;

    const isExistingUser = await AccountsCollection.findOne({
      username,
    });
    if (!isExistingUser) {
      return res
        .status(200)
        .send({ status: false, message: "User Does Not Exist" });
    }

    const projectList = await ProjectsCollection.find({ members: username });

    res
      .status(200)
      .send({ status: true, message: "Project List Found", data: projectList });

    // project_id, stage, members
  } catch (error) {
    console.log("Error in getAllProjectsByUsername");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const getAllProjectsByUsername = async (req, res) => {
  try {
    const { username } = req.query;

    const isExistingUser = await AccountsCollection.findOne({
      username,
    });
    if (!isExistingUser) {
      return res
        .status(200)
        .send({ status: false, message: "User Does Not Exist" });
    }

    const projectList = await ProjectsCollection.find({ creator: username });

    res
      .status(200)
      .send({ status: true, message: "Project List Found", data: projectList });

    // project_id, stage, members
  } catch (error) {
    console.log("Error in getAllProjectsByUsername");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { project_id } = req.query;

    const isExistingProject = await ProjectsCollection.findOne({
      project_id,
    });
    if (!isExistingProject) {
      return res
        .status(200)
        .send({ status: false, message: "Project Does Not Exist" });
    }

    const deletedProject = await ProjectsCollection.findOneAndDelete({
      project_id,
    });

    res
      .status(200)
      .send({ status: true, message: "Project Deleted", data: deletedProject });

    // project_id, stage, members
  } catch (error) {
    console.log("Error in deleteProject");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const getProjectData = async (req, res) => {
  try {
    const { project_id } = req.query;

    const isExistingProject = await ProjectsCollection.findOne({
      project_id,
    });
    if (!isExistingProject) {
      return res
        .status(200)
        .send({ status: false, message: "Project Does Not Exist" });
    }

    const taskArray = await TasksCollection.find({
      project_id: isExistingProject.project_id,
    });
    const completedTaskArray = await TasksCollection.find({
      project_id: isExistingProject.project_id,
      isCompleted: true,
    });

    res
      .status(200)
      .send({
        status: true,
        message: "Project Found",
        data: isExistingProject,
        tasks: {
          total: taskArray.length,
          completed: completedTaskArray.length,
        },
        taskArray,
      });

    // project_id, stage, members
  } catch (error) {
    console.log("Error in getProjectData");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

module.exports = {
  createNewProject,
  getAllProjectsByUsername,
  deleteProject,
  getProjectData,
  getJoinedProjectsByUsername
};
