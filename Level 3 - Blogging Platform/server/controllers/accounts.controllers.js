const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AccountCollection = require("../models/accounts.model");

const createNewAccount = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    const {
      first_name,
      last_name,
      username,
      email,
      phone,
      password,
      confirm_password,
    } = req.body;

    const isExistingAccount = await AccountCollection.find({
      $or: [{ email: email }, { username: username }],
    });
    if (isExistingAccount && isExistingAccount.length > 0) {
      return res
        .status(400)
        .send({ status: false, message: "Account Already Exists" });
    }
    if (password !== confirm_password) {
      return res
        .status(400)
        .send({ status: false, message: "Passwords do not match" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const token = jwt.sign({ email, username }, process.env.AUTH_TOKEN_SECRET);
    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Internal Server Error" });
    }
    const tokens = [{ token }];

    const newAccount = new AccountCollection({
      first_name,
      last_name,
      username,
      email,
      phone,
      password: hashedPassword,
      tokens,
    });

    const addedAccount = await newAccount.save();

    res.status(200).send({
      status: true,
      message: "Account Creation Success",
      authToken: token,
      data: { first_name, last_name, username, email, phone },
    });

    // res.send(req.body);
  } catch (error) {
    console.log("Error in createNewAccount");
    res.send({ status: false, message: error });
  }
};

const logInToAccount = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    const { username, password } = req.body;

    const isExistingAccount = await AccountCollection.findOne({
      $or: [{ email: username }, { username: username }],
    });
    if (!isExistingAccount) {
      return res
        .status(400)
        .send({ status: false, message: "Incorrect Credential" });
    }

    const isPasswordVerified = await bcryptjs.compare(
      password,
      isExistingAccount.password
    );
    if (!isPasswordVerified) {
      return res
        .status(400)
        .send({ status: false, message: "Incorrect Credentials" });
    }

    const token = jwt.sign(
      { email: isExistingAccount.email, username: isExistingAccount.username },
      process.env.AUTH_TOKEN_SECRET
    );
    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Internal Server Error" });
    }
    const tokens = isExistingAccount.tokens;
    tokens.push({ token });

    const updatedAccount = await AccountCollection.findOneAndUpdate(
      { email: isExistingAccount.email },
      { tokens },
      { new: true }
    );

    res.status(200).send({
      status: true,
      message: "Logged In Successfully",
      authToken: token,
      data: {
        first_name: isExistingAccount.first_name,
        last_name: isExistingAccount.last_name,
        username: isExistingAccount.username,
        email: isExistingAccount.email,
        phone: isExistingAccount.phone,
        image_url: isExistingAccount.image_url,
        user_tier: isExistingAccount.user_tier,
        total_blogs: isExistingAccount.total_blogs,
        total_posts: isExistingAccount.total_posts,
        total_views: isExistingAccount.total_views,
        total_likes: isExistingAccount.total_likes,
        total_comments: isExistingAccount.total_comments,
        joining: isExistingAccount.createdAt,
      },
    });

    // res.send(req.body);
  } catch (error) {
    console.log("Error in functionName");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const logOutOfAccount = async (req, res) => {
  try {
    const { username } = req.headers;
    const token = req.headers.authorization;

    const account = await AccountCollection.findOne({ "tokens.token": token });
    if (!account) {
      return res
        .status(400)
        .send({ status: false, message: "internal sever error-token" });
    }

    if (account.username !== username) {
      return res
        .status(400)
        .send({ status: false, message: "internal sever error-name" });
    }

    const newTokenArray = account.tokens.filter((data) => data.token !== token);

    const updatedAccount = await AccountCollection.findOneAndUpdate(
      { username },
      { tokens: newTokenArray },
      { new: true }
    );

    if (!updatedAccount) {
      return res
        .status(400)
        .send({ status: false, message: "internal server error" });
    }

    res.status(200).send({ status: true, message: "logged out success" });

    // res.send(req.body);
  } catch (error) {
    console.log("Error in logout user");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const authorizeAccount = async (req, res) => {
  const username = req.headers.username;
  if (!username) {
    return res
      .status(400)
      .send({ status: false, message: "UnAuthorized Access" });
  }
  console.log("object");
  res
    .status(200)
    .send({ status: true, message: "Authorized Access", data: username });
};


const updateAccountData = async (req, res) => {
  const {username} = req.params;
  const existingAccount = await AccountCollection.findOne({username})
  if (!existingAccount){
    return res.status(400).send({status: false, message: "Account not found"})
  }

  const {first_name, last_name, phone} = req.body

  const updatedAccount = await AccountCollection.findOneAndUpdate({username}, {first_name, last_name, phone}, {new: true})

  res.status(200).send({status: true, message: "Account updated successfully", data: updatedAccount})
  console.log("object");
  res
    .status(200)
    .send({ status: true, message: "Authorized Access", data: username });
};





module.exports = {
  createNewAccount,
  logInToAccount,
  authorizeAccount,
  logOutOfAccount,
  updateAccountData
};
