const express = require("express");
const { blogThumbnailUploader } = require("../config/multer.config");
const { createNewBlog, getAllBlogsByUsername, followBlog } = require("../controllers/blogs.controllers");

const blogRouter = express.Router();

blogRouter.get("/test", (req, res)=>{
    res.send("This Router is working")
})

blogRouter.post("/", blogThumbnailUploader.single('thumbnail'), createNewBlog)
blogRouter.get("/all/:username", getAllBlogsByUsername)
blogRouter.put("/follow", followBlog)



module.exports = blogRouter