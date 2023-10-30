const AccountCollection = require("../models/accounts.model")
const BlogsCollection = require("../models/blogs.model")
const CommentsCollection = require("../models/comments.model")
const PostsCollection = require("../models/posts.model")


const createNewComment = async (req, res)=>{
    try {
        const {comment_for, text, id, user} = req.body

        const newComment = new CommentsCollection({comment_for, text, id, user})
        const addedComment = await newComment.save()

        const accountData = await AccountCollection.findOne({username: user})
        const updatedAccount = await AccountCollection.findOneAndUpdate({username: accountData.username}, {total_comments: accountData.total_comments+1}, {new: true})

        if(comment_for==="post"){
            const postData = await PostsCollection.findOne({postID: id})
            const updatedPost = await PostsCollection.findOneAndUpdate({postID: id}, {total_comments: postData.total_comments})
        }else if(comment_for==="blog"){
            const blogData = await BlogsCollection.findOne({blogID: id})
            const updatedblog = await BlogsCollection.findOneAndUpdate({blogID: id}, {total_comments: blogData.total_comments})
            
        }
        res.status(200).send({status: true, message: "comment successful", data:addedComment, accountData: updatedAccount})
    } catch (error) {
        console.log("Error in createNewComment")
        console.log(error)
        res.send({status: false, message: error})
    }
}


const getAllComments = async (req, res)=>{
    try {
        const {comment_for, id} = req.query

        const commentsArray = await CommentsCollection.find({comment_for, id})
        // const addedComment = await newComment.save()
        res.status(200).send({status: true, message: "comment found", data:commentsArray})
    } catch (error) {
        console.log("Error in getAllComments")
        console.log(error)
        res.send({status: false, message: error})
    }
}




module.exports = {createNewComment, getAllComments}