const formService = require("../services/formService");

const submitForm = async (req, res) => {
  try {
    const form = await formService.createForm(req.body);

    res.status(201).json({
      success: true,
      data: form,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  submitForm,
};