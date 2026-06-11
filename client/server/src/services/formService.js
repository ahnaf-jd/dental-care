const Form = require("../models/form.model");

const createForm = async (data) => {
  return await Form.create(data);
};

module.exports = {
  createForm,
};