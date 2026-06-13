const { validationResult } = require('express-validator');
const blogService = require("../services/blogService");
const { processUploadedFiles } = require("../utils/blogMedia");

/**
 * Create a new blog
 * POST /api/blogs
 */
const createBlog = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, excerpt, content, author, published } = req.body;
    
    // Build blog data
    const blogData = {
      title,
      excerpt,
      content,
      author: author || 'Admin',
      published: published === 'true' || published === true,
    };

    const media = await processUploadedFiles(req.files);
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

/**
 * Get all blogs (admin view - includes unpublished)
 * GET /api/blogs
 */
const getAllBlogs = async (req, res, next) => {
  try {
    const { published } = req.query;
    
    const filters = {};
    if (published === 'true') {
      filters.published = true;
    }

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

/**
 * Get a blog by ID
 * GET /api/blogs/:id
 */
const getBlogById = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a blog by slug
 * GET /api/blogs/slug/:slug
 */
const getBlogBySlug = async (req, res, next) => {
  try {
    const publishedOnly = req.query.published === 'true';
    const blog = await blogService.getBlogBySlug(req.params.slug, { publishedOnly });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a blog
 * PUT /api/blogs/:id
 */
const updateBlog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, excerpt, content, author, published } = req.body;
    
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (author !== undefined) updateData.author = author || 'Admin';
    if (published !== undefined) {
      updateData.published = published === 'true' || published === true;
    }

    const media = await processUploadedFiles(req.files);
    Object.assign(updateData, media);

    const blog = await blogService.updateBlog(req.params.id, updateData);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
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

/**
 * Delete a blog
 * DELETE /api/blogs/:id
 */
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search blogs
 * GET /api/blogs/search?q=query
 */
const searchBlogs = async (req, res, next) => {
  try {
    const { q, published } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters',
      });
    }

    const blogs = await blogService.searchBlogs(q, {
      publishedOnly: published === 'true',
    });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get published blogs (public endpoint)
 * GET /api/blogs/published?page=1&limit=10
 */
const getPublishedBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await blogService.getPublishedBlogs(
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  searchBlogs,
  getPublishedBlogs,
};