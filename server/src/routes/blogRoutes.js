const express = require("express");
const { body } = require('express-validator');

const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Validation rules for blog creation
const blogValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters')
];

// Validation rules for blog update - fields are optional but validated when present
const blogUpdateValidationRules = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('content')
    .optional()
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters')
];

// Routes - order matters! Specific routes must come before parameterized routes
router.post("/upload", blogValidationRules, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", blogUpdateValidationRules, updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;