const mongoose = require("mongoose");

const postsSchema = mongoose.Schema(
  {
    //yellow-u// Define the Schema Here
    postID: {
      type: String,
      unique: true,
    },
    thumbnail: {
      type: String,
      unique: true,
    },
    blogID: {
      type: String,
    },
    title: {
      type: String,
    },
    data: {
      type: Array,
    },
    total_views: {
      type: Number,
      default: 0,
    },
    total_likes: {
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

const PostsCollection = mongoose.model("posts-data", postsSchema);

module.exports = PostsCollection;
