const Form = require("../models/form.model");

const createForm = async (data) => {
  return await Form.create(data);
};

const getAllForms = async () => {
  return await Form.find().sort({ createdAt: -1 });
};

const getFormById = async (id) => {
  return await Form.findById(id);
};

const deleteForm = async (id) => {
  return await Form.findByIdAndDelete(id);
};

module.exports = {
  createForm,
  getAllForms,
  getFormById,
  deleteForm,
};