const express = require("express");
const { body } = require('express-validator');

const router = express.Router();
const {
  createBlog,
  getBlogs,
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

router.post("/upload", blogValidationRules, createBlog);

router.get("/", getBlogs);

module.exports = router;