const Blog = require("../models/blog.model");

const createBlog = async (data) => {
  return await Blog.create(data);
};

const getAllBlogs = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

module.exports = {
  createBlog,
  getAllBlogs,
};