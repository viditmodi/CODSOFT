const mongoose = require("mongoose");

const blogsSchema = mongoose.Schema(
  {
    //yellow-u// Define the Schema Here
    blogID: {
      type: String,
      unique: true,
    },
    thumbnail: {
      type: String,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    author: {
      type: String,
    },
    category: {
      type: String,
    },
    total_likes: {
      type: Number,
      default: 0,
    },
    total_views: {
      type: Number,
      default: 0,
    },
    total_comments: {
      type: Number,
      default: 0,
    },
  },
  {
    //yellow-u// Options like Timestamps Ho Here
    timestamps: true,
  }
);

const BlogsCollection = mongoose.model("blog-data", blogsSchema);

module.exports = BlogsCollection;
