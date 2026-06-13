const express = require("express");
const { body } = require('express-validator');
const { uploadBlogFiles } = require("../middleware/uploadMiddleware");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  searchBlogs,
  getPublishedBlogs,
} = require("../controllers/blogController");

// Validation rules for blog creation and update
const blogValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('excerpt')
    .trim()
    .optional()
    .isLength({ max: 500 }).withMessage('Excerpt must not exceed 500 characters'),
  body('author')
    .trim()
    .optional()
    .isLength({ max: 100 }).withMessage('Author name must not exceed 100 characters'),
];

// ADMIN ROUTES (Protected with verifyAdmin)

// Create blog with file uploads
// Accepts: coverImage (1), galleryImages (multiple), video (1)
router.post(
  "/",
  verifyAdmin,
  uploadBlogFiles,
  blogValidationRules,
  createBlog
);

// Get all blogs (admin - includes unpublished)
// Note: kept for backward compatibility if you already use this endpoint.
router.get("/admin/all", verifyAdmin, getAllBlogs);

// Update blog with optional file uploads
router.put(
  "/:id",
  verifyAdmin,
  uploadBlogFiles,
  blogValidationRules,
  updateBlog
);

// Delete blog
router.delete("/:id", verifyAdmin, deleteBlog);


// PUBLIC ROUTES

// Get published blogs (paginated)
router.get("/published", getPublishedBlogs);

// Get blog by slug (must come before /:id to avoid slug being treated as id)
router.get("/slug/:slug", getBlogBySlug);

// Search blogs
router.get("/search", searchBlogs);

// Get all blogs (admin view - includes unpublished)
router.get("/", getAllBlogs);

// Get blog by ID
router.get("/:id", getBlogById);

module.exports = router;