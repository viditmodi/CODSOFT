const BlogsCollection = require("../models/blogs.model")
const PostsCollection = require("../models/posts.model")


const createNewPost = async (req, res)=>{
    try {
        let {postID, blogID, data, title, thumbnail} = req.body

        thumbnail = process.env.URL + "/uploads/posts/" + thumbnail
        data = JSON.parse(data)

        data.forEach(element => {
            if(element.type === "image"){
                element.data = process.env.URL + "/uploads/posts/" + element.data
            }
        });

        const newPost = new PostsCollection({postID, blogID, data, title, thumbnail})
        const addedPost = newPost.save()

        // console.log(req.body)
        // console.log(req.files)
        // res.send("ok")
        res.status(200).send({status: true, message: "post created"})
    } catch (error) {
        console.log("Error in createNewPost")
        console.log(error)
        res.send({status: false, message: error})
    }
}


const getAllPostsByBlogID = async (req, res)=>{
    try {
        let {blogID} = req.query

        const isExistingBlog = await BlogsCollection.findOne({blogID})
        if(!isExistingBlog){
            return  res.status(400).send({status: false, message:"No such blog"})
        }

        const postsArray = await PostsCollection.find({blogID})
        if(!postsArray || postsArray.length<1){
            return res.status(400).send({status: false, message: "no posts found"})
        }
        
        res.status(200).send({status: true, message: `${postsArray.length} posts found`})
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

        
        res.status(200).send({status: true, message: `post found`})
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