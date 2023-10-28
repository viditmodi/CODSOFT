const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    //yellow-u// Define the Schema Here
    comment_for: {
      type: String,
    },
    id: {
      type: String,
    },
    text: {
      type: String,
    },
    user: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0
    },
  },
  {
    //yellow-u// Options like Timestamps Ho Here
    timestamps: true,
  }
);

const CommentsCollection = mongoose.model("comments-data", commentSchema);

module.exports = CommentsCollection;
