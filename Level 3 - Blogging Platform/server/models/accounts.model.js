const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
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
