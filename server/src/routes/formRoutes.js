const express = require("express");
const { body } = require('express-validator');

const router = express.Router();
const {submitForm} = require("../controllers/formController");

// Validation rules for form submission
const formValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 5, max: 5000 }).withMessage('Message must be between 5 and 5000 characters')
];

router.post("/submit", formValidationRules, submitForm);

module.exports = router;