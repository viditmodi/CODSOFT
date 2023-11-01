const express = require("express");
const { blogThumbnailUploader } = require("../config/multer.config");
const { createNewBlog, getAllBlogsByUsername, followBlog, getAllFollowedBlogs, getFeaturedBlogs } = require("../controllers/blogs.controllers");

const blogRouter = express.Router();

blogRouter.get("/test", (req, res)=>{
    res.send("This Router is working")
})

blogRouter.post("/", blogThumbnailUploader.single('thumbnail'), createNewBlog)
blogRouter.get("/all/:username", getAllBlogsByUsername)
blogRouter.put("/follow", followBlog)
blogRouter.get("/follow", getAllFollowedBlogs)
blogRouter.get("/featured", getFeaturedBlogs)



module.exports = blogRouter