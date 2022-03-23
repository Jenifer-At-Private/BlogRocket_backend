const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  body: {
    type: String,
  },
  useId: {
    type: String,
  },
  time: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = { Blog };
