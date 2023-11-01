const AccountCollection = require("../models/accounts.model")
const BlogsCollection = require("../models/blogs.model")
const PostsCollection = require("../models/posts.model")


const createNewPost = async (req, res)=>{
    try {
        let {postID, blogID, data, title, thumbnail, desc} = req.body

        thumbnail = process.env.URL + "uploads/posts/" + thumbnail
        data = JSON.parse(data)

        data.forEach(element => {
            if(element.type === "image"){
                element.data = process.env.URL + "uploads/posts/" + element.data
            }
        });

        const newPost = new PostsCollection({postID, blogID, data, title, thumbnail, desc})
        const addedPost = newPost.save()

        const blogData = await BlogsCollection.findOne({blogID})
        const updatedBlog = await BlogsCollection.findOneAndUpdate({blogID}, {total_posts: blogData.total_posts+1}, {new:true})
        const accountData = await AccountCollection.findOne({username: blogData.author})

        const updatedAccount = await AccountCollection.findOneAndUpdate({username: accountData.username}, {total_posts: accountData.total_posts+1}, {new:true})

        // console.log(req.body)
        // console.log(req.files)
        // res.send("ok")
        res.status(200).send({status: true, message: "post created", userdata: updatedAccount})
    } catch (error) {
        console.log("Error in createNewPost")
        console.log(error)
        res.send({status: false, message: error})
    }
}


const getAllPostsByBlogID = async (req, res)=>{
    try {
        let {blogID} = req.query;

        const isExistingBlog = await BlogsCollection.findOne({blogID})
        if(!isExistingBlog){
            return  res.status(200).send({status: false, message:"No such blog"})
        }

        const postsArray = await PostsCollection.find({blogID})
        // console.log(blogID, postsArray)
        if(!postsArray){
            return res.status(200).send({status: false, message: "no posts found"})
        }
        
        res.status(200).send({status: true, message: `${postsArray.length} posts found`, data: postsArray, blogData: isExistingBlog})
        // console.log(req.body)
        // console.log(req.files)
        // res.send("ok")
    } catch (error) {
        console.log("Error in getAllPostsByBlogID")
        console.log(error)
        res.send({status: false, message: error})
    }
}


const getPostByPostID = async (req, res)=>{
    try {
        let {postID} = req.query

        const isExistingPost = await PostsCollection.findOne({postID})
        if(!isExistingPost){
            return  res.status(400).send({status: false, message:"No such post"})
        }

        
        const blogData = await BlogsCollection.findOne({blogID: isExistingPost.blogID})
        const accountData = await AccountCollection.findOne({username: blogData.author})

        const updatedAccount = await AccountCollection.findOneAndUpdate({username: accountData.username}, {total_views: accountData.total_views+1}, {new:true})

        const updatedBlog = await BlogsCollection.findOneAndUpdate({blogID: blogData.blogID}, {total_views: blogData.total_views+1}, {new: true})

        const updatedPost = await PostsCollection.findOneAndUpdate({postID: isExistingPost.postID}, {total_views: isExistingPost.total_views+1}, {new: true})


        res.status(200).send({status: true, message: `post found`, data: isExistingPost})
        // console.log(req.body)
        // console.log(req.files)
        // res.send("ok")
    } catch (error) {
        console.log("Error in getPostByPostID")
        console.log(error)
        res.send({status: false, message: error})
    }
}



module.exports = {createNewPost, getAllPostsByBlogID, getPostByPostID}