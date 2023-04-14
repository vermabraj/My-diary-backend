const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: String,
  description: String
});

const PostModel = mongoose.model("post", PostSchema);
module.exports = { PostModel };

