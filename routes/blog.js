const express = require("express");
const { isAuthenticated } = require("../controller/auth");

const { getBlogs, newBlog, updateBlog } = require("../controller/blog");

const router = express.Router();

router.get("/blogs", getBlogs);

router.post("/blog/create", isAuthenticated, newBlog);

router.put("/blog/:postId", isAuthenticated, updateBlog);

module.exports = router;
