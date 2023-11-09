const mongoose = require("mongoose");

const accountsSchema = mongoose.Schema(
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
      unique: true
    },
    email: {
      type: String,
      trim: true,
      unique: true
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AccountsCollection = mongoose.model("accounts-data", accountsSchema);

module.exports = AccountsCollection;
