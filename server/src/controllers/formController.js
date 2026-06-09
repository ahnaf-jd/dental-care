const { validationResult } = require('express-validator');
const formService = require("../services/formService");

const submitForm = async (req, res, next) => {
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

    const form = await formService.createForm(req.body);

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: form,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitForm,
};