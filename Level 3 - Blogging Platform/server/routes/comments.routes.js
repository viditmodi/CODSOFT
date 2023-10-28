const express = require("express");
const { createNewComment, getAllComments } = require("../controllers/comments.controllers");

const commentRouter = express.Router();

commentRouter.get("/test", (req, res)=>{
    res.send("This Router is working")
})

commentRouter.post("/", createNewComment)
commentRouter.get("/all", getAllComments)



module.exports = commentRouter