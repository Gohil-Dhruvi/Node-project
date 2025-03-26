const express = require("express");
const blogRoutes = express.Router();
const {
  renderAddBlog,
  getAllBlogs,
  addBlog,
  renderEditBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.controller");

blogRoutes.get("/add-blog", renderAddBlog);
blogRoutes.post("/add-blog", addBlog);

blogRoutes.get("/view-blogs", getAllBlogs);

blogRoutes.get("/edit-blog/:id", renderEditBlog);
blogRoutes.post("/edit-blog/:id", updateBlog);

blogRoutes.post("/delete-blog/:id", deleteBlog);

module.exports = blogRoutes;
