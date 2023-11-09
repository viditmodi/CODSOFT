const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    task_id: {
      type: String,
      trim: true,
      unique: true
    },
    project_id: {
      type: String,
      trim: true,
    },
    isCompleted: {
      type: Boolean
    },
    budget: {
      type: Number,
      default: 0,
    },
    assigned_to: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const TasksCollection = mongoose.model("tasks-data", tasksSchema);

module.exports = TasksCollection;
