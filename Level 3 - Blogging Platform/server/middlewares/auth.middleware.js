const AccountCollection = require("../models/accounts.model");
const jwt = require("jsonwebtoken");

const isValidUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("token: ", token, typeof token);
    if (!token || token === "undefined") {
      return res.status(400).send({ status: false, message: "no token" });
    }
    const tokenData = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    if (!tokenData) {
      return res
        .status(400)
        .send({ status: false, message: "Unauthorized Access-token" });
    }
    const account = await AccountCollection.findOne({ "tokens.token": token });
    if (!account) {
      return res
        .status(400)
        .send({ status: false, message: "Unauthorized Access-account" });
    }
    // console.log(account.email, tokenData.email);
    if (account.username !== tokenData.username || account.email !== tokenData.email) {
      return res
        .status(400)
        .send({ status: false, message: "Unauthorized Access-username/email" });
    }

    req.headers.username = account.username;
    req.headers.email = account.email;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ status: false, message: "Unauthorized Access-error" });
  }
};

module.exports = { isValidUser };
