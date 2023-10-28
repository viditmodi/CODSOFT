require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { connectToServer, clearAllCollections } = require("./config/db.config");
const accountRouter = require("./routes/accounts.routes");
const blogRouter = require("./routes/blogs.routes");
const postsRouter = require("./routes/posts.routes");
const BlogsCollection = require("./models/blogs.model");
const PostsCollection = require("./models/posts.model");
const AccountCollection = require("./models/accounts.model");
const commentRouter = require("./routes/comments.routes");

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: [
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5501",
    "https://quillcraft.netlify.app",
  ],
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, authorization",
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));

//yellow-f// DEFAULT ROUTE
app.get("/connection", async (req, res) => {
  res.send("API is working");
});
app.delete("/connection/reset", async (req, res) => {
  clearAllCollections();
});

app.use("/uploads", express.static("uploads"));

app.use("/account", accountRouter);
app.use("/blog", blogRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentRouter);

app.get("/search", async (req, res) => {
  const { type, query } = req.query;
  let resultArray;
  switch (type) {
    case "category":
      resultArray = await BlogsCollection.find({ category: query });
    //   console.log(resultArray)
      resultArray = await Promise.all(resultArray.map(async (blog) => {
        const accountData = await AccountCollection.findOne({
          username: blog.author,
        });
        return {
          blogID: blog.blogID,
          thumbnail: blog.thumbnail,
          title: blog.title,
          desc: blog.desc,
          author: {
            image: accountData.image_url,
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
      }))
    //   console.log(resultArray)

      break;
    case "author":
      resultArray = await BlogsCollection.find({ author: query });
      const accountData = await AccountCollection.findOne({
        username: query,
      });
      resultArray = await Promise.all(resultArray.map(async (blog) => {
        return {
          blogID: blog.blogID,
          thumbnail: blog.thumbnail,
          title: blog.title,
          desc: blog.desc,
          author: {
            image: accountData.image_url,
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
      }))
      break;
    case "post":
      resultArray = await PostsCollection.findOne({ title: query });
      break;
    case "blog":
      resultArray = await BlogsCollection.findOne({ title: query });
      break;
      default:
          resultArray = await PostsCollection.findOne({ title: query });
      break;
  }

  
  if (!resultArray || resultArray.length < 1) {
    return res
      .status(200)
      .send({ status: false, message: "no matching results" });
  }

  res
    .status(200)
    .send({ status: true, message: "results found", data: resultArray });
  //   if(!resultArray || resultArray.length<1){
  //     return res.status(200).send({status: false, message: "no matching results"})
  //   }

  //   res.status(200).send({status: true, message: "results found", data: resultArray})
});

connectToServer(app, port);
