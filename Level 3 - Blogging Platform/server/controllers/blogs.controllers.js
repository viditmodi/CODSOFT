const AccountCollection = require("../models/accounts.model");
const BlogsCollection = require("../models/blogs.model");

const createNewBlog = async (req, res) => {
  try {
    const { title, desc, author, category, blogID } = req.body;
    // console.log(req.body)
    // console.log(req.body.blogID)
    // console.log(req.file)

    const accountData = await AccountCollection.findOne({ username:author });
    if (!accountData) {
      return res
        .status(400)
        .send({ status: false, message: "Author Does Not Exist" });
    }

    const thumbnail = process.env.URL + req.file.path;

    const newBlog = new BlogsCollection({
      thumbnail,
      title,
      desc,
      author,
      category,
      blogID
    });

    const addedBlog = await newBlog.save();
    const updatedAccount = await AccountCollection.findOneAndUpdate({username:author}, {total_blogs: accountData.total_blogs+1}, {new: true})
    res.status(200).send({
      status: true,
      message: "Blog Created Successfully",
      data: {
        blogID: addedBlog.blogID,
        thumbnail: addedBlog.thumbnail,
        title: addedBlog.title,
        desc: addedBlog.desc,
        author: {
          image:
            accountData.image_url,
          name: accountData.username,
        },
        category: addedBlog.category,
        metadata: {
          publishedDate: new Date(addedBlog.createdAt),
          likes: addedBlog.total_likes,
          views: addedBlog.total_views,
          comments: addedBlog.total_comments,
        },
      },
      userdata: updatedAccount
    });
    // console.log(process.env.URL +  req.file.path)
  } catch (error) {
    console.log("Error in createNewBlog");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const getAllBlogsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const accountData = await AccountCollection.findOne({ username });
    if (!accountData) {
      return res
        .status(400)
        .send({ status: false, message: "Author Does Not Exist" });
    }

    const blogsArray = await BlogsCollection.find({ author: username });
    if (!blogsArray || blogsArray.length < 1) {
      return res.status(400).send({ status: false, message: "No Blog Found" });
    }

    const newBlogArray = blogsArray.map((blog) => {
      return {
        blogID: blog.blogID,
        thumbnail: blog.thumbnail,
        title: blog.title,
        desc: blog.desc,
        author: {
          image:
            accountData.image_url,
          name: accountData.username,
        },
        category: blog.category,
        metadata: {
          publishedDate: new Date(blog.createdAt),
          likes: blog.total_likes,
          views: blog.total_views,
          comments: blog.total_comments,
        },
      };
    });

    res.status(200).send({status: true, message: newBlogArray.length + " Blogs Found", data: newBlogArray})
  } catch (error) {
    console.log("Error in getAllBlogsByUsername");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

module.exports = { createNewBlog, getAllBlogsByUsername };
