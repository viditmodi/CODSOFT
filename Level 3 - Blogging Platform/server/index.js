require("dotenv").config()
const express = require("express")
const multer  = require('multer')
const cors = require("cors")
const {connectToServer, clearAllCollections} = require("./config/db.config")
const accountRouter = require("./routes/accounts.routes")
const blogRouter = require("./routes/blogs.routes")

const app = express()
const port = process.env.PORT;

const corsOptions = {
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501"],
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, authorization",
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}
app.use(express.json())
app.use(cors(corsOptions))

//yellow-f// DEFAULT ROUTE
app.get("/connection", async (req, res)=>{
    res.send("API is working")
})
app.delete("/connection/reset", async (req, res)=>{
    clearAllCollections()
})

app.use('/uploads', express.static('uploads'));

app.use("/account", accountRouter)
app.use("/blog", blogRouter)



connectToServer(app, port);