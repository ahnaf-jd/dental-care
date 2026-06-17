const galleryService = require("../services/galleryService");

const getAll = async (req, res, next) => {
  try {
    const items = await galleryService.getAll();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "A file (image or video) is required",
      });
    }

    const { title } = req.body;
    const item = await galleryService.create(file, title);

    res.status(201).json({
      success: true,
      message: "Gallery item uploaded successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file || null;
    const { title } = req.body;

    const item = await galleryService.update(id, file, title);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gallery item updated successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await galleryService.remove(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
