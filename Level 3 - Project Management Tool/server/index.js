require("dotenv").config()
const express = require("express")
const cors = require("cors")
const {connectToServer, clearAllCollections} = require("./config/db.config")
const accountsRouter = require("./routes/accounts.routes")
const projectsRouter = require("./routes/projects.routes")
const tasksRouter = require("./routes/tasks.routes")

const app = express()
const port = process.env.PORT;

const corsOptions = {}
app.use(express.json())
app.use(cors(corsOptions))

//yellow-f// DEFAULT ROUTE
app.get("/connection", async (req, res)=>{
    res.send("API is working")
})
app.delete("/connection/reset", async (req, res)=>{
    clearAllCollections()
})


app.use("/account", accountsRouter)
app.use("/project", projectsRouter)
app.use("/task", tasksRouter)



connectToServer(app, port);