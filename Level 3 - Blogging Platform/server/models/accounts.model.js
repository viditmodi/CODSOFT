const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    image_url: {
      type: String,
      trim: true,
    },
    user_tier: {
      type: String,
      trim: true,
      default: "newbie",
    },
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
    // liked_blogs: [
    //   {
    //     type: String,
    //   },
    // ],
    total_followers: {
      type: Number,
      default: 0,
    },
    total_blogs: {
      type: Number,
      default: 0,
    },
    total_posts: {
      type: Number,
      default: 0,
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
    liked: [{ type: String }],
    following: [{ type: String }],
    tokens: [
      {
        token: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AccountCollection = mongoose.model("account-data", accountSchema);

module.exports = AccountCollection;
