const express = require("express");
const {
  createNewAccount,
  loginToAccount,
  logoutOfAccount,
} = require("../controllers/accounts.controllers");

const accountsRouter = express.Router();

accountsRouter.get("/test", (req, res) => {
  res.send("This Router is working");
});

accountsRouter.route("/").post(createNewAccount);
accountsRouter.route("/auth").post(loginToAccount).put(logoutOfAccount);

module.exports = accountsRouter;
