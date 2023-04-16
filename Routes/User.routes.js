
const express = require('express')
const {UserModel} = require("../Models/User.model")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRouter = express.Router();


UserRouter.post('/register', async (req, res) => {
const {first_name,last_name,email,avatar,gender,password,age,city} = req.body;
try{
   
    bcrypt.hash(password,5,async(err,hash)=>{
        if(err) res.send({"msg":"something went wrong"})
        else{
            const user = new UserModel({
              first_name,
              last_name,
              email,
              avatar,
              gender,
              age,
              city,
              password: hash,
            });
            await user.save()
            res.send({"msg":"user registered successfully"})
        }
    })
}catch(err){
res.send({"msg":"something went wrong with registering user","error":err.message})
}
})

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
if(user.length>0){
    bcrypt.compare(password,user[0].password,async(err,result)=>{
if(result){
    const token = jwt.sign({userID:user[0]._id},"masai");
    res.send({
      first_name: user[0].first_name,
      last_name: user[0].last_name,
      gender: user[0].gender,
      email: user[0].email,
      token: token,
    });
}else{
    res.send({"msg":"wrong password"})
}
    })
}else{
    res.send({"msg":"user not found"})
}
    
  } catch (err) {
    res.send({
      msg: "something went wrong with registering user",
      error: err.message,
    });
  }
});

module.exports = {UserRouter}