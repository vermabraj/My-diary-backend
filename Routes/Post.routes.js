
const express = require("express");
const { PostModel } = require("../Models/Post.model");
const PostRouter = express.Router();



PostRouter.get("/", async (req, res) => {
  const posts = await PostModel.find();
  res.json(posts);
});

PostRouter.post("/create", async (req, res) => {
    const payload = req.body;
  const posts = new PostModel(payload)
  await posts.save();
  res.send({"msg":"Post created Successfully"})
});

PostRouter.post("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try{
    await PostModel.findByIdAndUpdate({_id:ID}, payload);
 
 res.send({ msg: "Post has been updated Successfully" });
  }catch(err){
 res.send({ msg: "Something went wrong with Posts" });
  }
 
});

PostRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  
  try {
    await PostModel.findByIdAndDelete({ _id: ID });

    res.send({ msg: "Post has been deleted Successfully" });
  } catch (err) {
    res.send({ msg: "Something went wrong with Posts","error":err.message }); 
  }
});


module.exports = {PostRouter}