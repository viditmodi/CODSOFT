const CommentsCollection = require("../models/comments.model")


const createNewComment = async (req, res)=>{
    try {
        const {comment_for, text, id, user} = req.body

        const newComment = new CommentsCollection({comment_for, text, id, user})
        const addedComment = await newComment.save()
        res.status(200).send({status: true, message: "comment successful", data:addedComment})
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