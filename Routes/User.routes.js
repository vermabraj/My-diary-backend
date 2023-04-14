const express = require("express");
const { UserModel } = require("../Models/User.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) res.send({ msg: "something went wrong" });
      else {
        const user = new UserModel({ name, email, pass: hash });
        await user.save();
        res.send({ msg: "user registered successfully" });
      }
    });
  } catch (err) {
    res.send({
      msg: "something went wrong with registering user",
      error: err.message,
    });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, async (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ msg: "logged in", token: token });
        } else {
          res.send({ msg: "wrong password" });
        }
      });
    } else {
      res.send({ msg: "user not found" });
    }
  } catch (err) {
    res.send({
      msg: "something went wrong with registering user",
      error: err.message,
    });
  }
});

module.exports = { UserRouter };
