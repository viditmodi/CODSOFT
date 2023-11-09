const { generateRandomString } = require("../functions/random.functions");
const AccountsCollection = require("../models/accounts.model");
const ProjectsCollection = require("../models/projects.model");
const TasksCollection = require("../models/tasks.model");

const createNewTask = async (req, res) => {
  try {
    const { name, desc, deadline, budget, assigned_to, project_id } = req.body;

    
    const isExistingProject = await ProjectsCollection.findOne({
      project_id
    });
    if (!isExistingProject) {
      return res
        .status(200)
        .send({ status: false, message: "Project does not exist" });
    }
    const isExistingUser = await AccountsCollection.findOne({
      username: assigned_to
    });
    if (!isExistingUser) {
      return res
        .status(200)
        .send({ status: false, message: "user does not exist" });
    }

    const task_id = generateRandomString(45);

    const newTask = new TasksCollection({
      name,
      desc,
      deadline: new Date(deadline),
      task_id: task_id,
      project_id,
      budget,
      assigned_to
    });

    const addedTask = await newTask.save()

    res.status(200).send({status: true, message: "Task Creation Success", data: addedTask})

    const members = isExistingProject.members
    if(!members.includes(assigned_to)){
      members.push(assigned_to)
    }

    const updatedProject = await ProjectsCollection.findOneAndUpdate({project_id: isExistingProject.project_id}, {members}, {new: true})

    // project_id, stage, members
  } catch (error) {
    console.log("Error in createNewTask");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const getAllTasksByProjectID = async (req, res) => {
  try {
    const { project_id } = req.query;

    const isExistingProject = await ProjectsCollection.findOne({
      project_id
    });
    if (!isExistingProject) {
      return res
        .status(200)
        .send({ status: false, message: "Project Does Not Exist" });
    }

    const taskList = await TasksCollection.find({project_id: project_id})

    res.status(200).send({status: true, message: "Task List Found", data: taskList, projectData: isExistingProject})

    // project_id, stage, members
  } catch (error) {
    console.log("Error in getAllTasksByProjectID");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task_id } = req.query;

    const isExistingTask = await TasksCollection.findOne({
      task_id
    });
    if (!isExistingTask) {
      return res
        .status(200)
        .send({ status: false, message: "Task Does Not Exist" });
    }

    const deletedTask = await TasksCollection.findOneAndDelete({task_id})

    res.status(200).send({status: true, message: "Task Deleted", data: deletedTask})

    // project_id, stage, members
  } catch (error) {
    console.log("Error in deleteTask");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const markAsComplete = async (req, res) => {
  try {
    const { task_id } = req.query;

    const isExistingTask = await TasksCollection.findOne({
      task_id
    });
    if (!isExistingTask) {
      return res
        .status(200)
        .send({ status: false, message: "Task Does Not Exist" });
    }

    const updatedTask = await TasksCollection.findOneAndUpdate({task_id}, {isCompleted: true}, {new: true})

    res.status(200).send({status: true, message: "Task completed", data: updatedTask})

    // project_id, stage, members
  } catch (error) {
    console.log("Error in mark as complete");
    console.log(error);
    res.send({ status: false, message: error });
  }
};







module.exports = { createNewTask, getAllTasksByProjectID, deleteTask, markAsComplete };
