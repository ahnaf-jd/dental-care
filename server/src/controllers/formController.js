const { validationResult } = require('express-validator');
const formService = require("../services/formService");
const XLSX = require('xlsx');

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

const getAllForms = async (req, res, next) => {
  try {
    const forms = await formService.getAllForms();
    res.status(200).json({
      success: true,
      data: forms,
      count: forms.length,
    });
  } catch (error) {
    next(error);
  }
};

const getFormById = async (req, res, next) => {
  try {
    const form = await formService.getFormById(req.params.id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found',
      });
    }
    res.status(200).json({
      success: true,
      data: form,
    });
  } catch (error) {
    next(error);
  }
};

const deleteForm = async (req, res, next) => {
  try {
    const form = await formService.deleteForm(req.params.id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Form deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const exportToExcel = async (req, res, next) => {
  try {
    const forms = await formService.getAllForms();
    
    if (forms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No forms to export',
      });
    }

    // Prepare data for Excel
    const excelData = forms.map(form => ({
      'Name': form.name,
      'Email': form.email,
      'Phone': form.phone,
      'Subject': form.subject,
      'Message': form.message,
      'Date': new Date(form.createdAt).toLocaleString(),
    }));

    // Create workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Set column widths
    const columnWidths = [
      { wch: 20 },
      { wch: 25 },
      { wch: 15 },
      { wch: 20 },
      { wch: 40 },
      { wch: 20 },
    ];
    worksheet['!cols'] = columnWidths;
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Messages');

    // Generate buffer
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Send file
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="form_submissions.xlsx"');
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitForm,
  getAllForms,
  getFormById,
  deleteForm,
  exportToExcel,
};