const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema(
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
    project_id: {
      type: String,
      trim: true,
      unique: true
    },
    budget: {
      type: Number,
      default: 0,
    },
    stage: {
      type: String,
      trim: true,
    },
    creator: {
      type: String,
      trim: true,
    },
    members: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProjectsCollection = mongoose.model("projects-data", projectsSchema);

module.exports = ProjectsCollection;
