const express = require('express')
const app = express()
const {connection} = require("./db");
const {authenticate} = require("./Middlewares/authenticate.middleware")
const {UserRouter} = require("./Routes/User.routes")
const {PostRouter} = require("./Routes/Post.routes")
const {  cartRoute } = require("./Routes/Cart.Route");
require("dotenv").config()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home page")
})
app.use("/users",UserRouter)

app.use("/posts",PostRouter)
app.use("/carts", cartRoute);

app.listen(process.env.port,async()=>{
    try{
        await connection
         console.log("Connected to DB")
    }catch(err){
        console.log(err.message)
    }
    console.log("Server is running at port 4500");
})