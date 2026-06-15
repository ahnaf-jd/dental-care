const blogService = require('../services/blogService');
const { uploadBlogMedia } = require('../services/blogMediaService');

const createBlog = async (req, res, next) => {
  try {
    const blogData = { ...req.blogPayload };
    const media = await uploadBlogMedia(req.files);
    Object.assign(blogData, media);

    const blog = await blogService.createBlog(blogData);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const { published } = req.query;
    const filters = {};
    if (published === 'true') filters.published = true;

    const blogs = await blogService.getAllBlogs(filters);

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const updateData = { ...req.blogPayload };
    const media = await uploadBlogMedia(req.files);
    Object.assign(updateData, media);

    const blog = await blogService.updateBlog(req.params.id, updateData);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getBlogs = getAllBlogs;

const getPublishedBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const result = await blogService.getPublishedBlogs(page, limit);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const publishedOnly = req.query.published === 'true';
    const blog = await blogService.getBlogBySlug(req.params.slug, { publishedOnly });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

const searchBlogs = async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    const publishedOnly = req.query.published === 'true';

    if (q.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters',
      });
    }

    const blogs = await blogService.searchBlogs(q, { publishedOnly });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getAllBlogs,
  getPublishedBlogs,
  getBlogBySlug,
  searchBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
