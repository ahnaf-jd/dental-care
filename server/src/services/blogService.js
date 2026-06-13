const Blog = require("../models/blog.model");

const createBlog = async (data) => {
  return await Blog.create(data);
};

const getAllBlogs = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

const getBlogById = async (id) => {
  return await Blog.findById(id);
};

const updateBlog = async (id, data) => {
  return await Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};