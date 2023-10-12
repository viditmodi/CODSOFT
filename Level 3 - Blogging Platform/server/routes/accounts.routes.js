const express = require("express");
const { body } = require("express-validator");
const { createNewAccount, logInToAccount } = require("../controllers/accounts.controllers");

const accountRouter = express.Router();

accountRouter.get("/test", (req, res) => {
  res.send("This Router is working");
});

accountRouter.post(
  "/",
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("first name cannot be empty"),
  body("last_name").trim().notEmpty().withMessage("last name cannot be empty"),
  body("username").trim().notEmpty().withMessage("username cannot be empty"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("not a valid email"),
  body("phone")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("not a valid phone number"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("not a strong password"),
  createNewAccount
);

accountRouter.post(
  "/login",
  body("username").trim().notEmpty().withMessage("username cannot be empty"),
  body("password").trim().notEmpty().withMessage("password cannot be empty"),
  logInToAccount
);

module.exports = accountRouter;
