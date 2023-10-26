const express = require("express");
const { postImagesUploader } = require("../config/multer.config");
const { createNewPost, getPostByPostID, getAllPostsByBlogID } = require("../controllers/posts.controllers");

const postsRouter = express.Router();

postsRouter.get("/test", (req, res)=>{
    res.send("This Router is working")
})


postsRouter.post("/", postImagesUploader.array("images"), createNewPost)
postsRouter.get("/", getPostByPostID)
postsRouter.get("/all", getAllPostsByBlogID)



module.exports = postsRouter