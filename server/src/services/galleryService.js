const GalleryItem = require("../models/gallery.model");
const imagekitService = require("./imagekitService");

const FOLDER = "/dental-care/gallery";

const IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const getAll = async () => {
  return GalleryItem.find().sort({ sortOrder: 1, createdAt: -1 });
};

const getById = async (id) => {
  return GalleryItem.findById(id);
};

const create = async (file, title) => {
  const result = await imagekitService.uploadFile(file, FOLDER);

  const type = IMAGE_MIMES.includes(file.mimetype) ? "image" : "video";

  // Put new items at the end
  const maxOrder = await GalleryItem.findOne().sort({ sortOrder: -1 }).select("sortOrder");
  const sortOrder = (maxOrder?.sortOrder ?? -1) + 1;

  const item = await GalleryItem.create({
    title: title || "",
    type,
    url: result.url,
    fileId: result.fileId,
    sortOrder,
  });

  return item;
};

const update = async (id, file, title) => {
  const item = await GalleryItem.findById(id);
  if (!item) return null;

  // Update title if provided
  if (title !== undefined) {
    item.title = title;
  }

  // Replace media file if a new one is provided
  if (file) {
    // Upload new file first
    const result = await imagekitService.uploadFile(file, FOLDER);

    // Delete old file from ImageKit
    if (item.fileId) {
      try {
        await imagekitService.deleteFile(item.fileId);
      } catch {
        // Old file may already be removed
      }
    }

    const type = IMAGE_MIMES.includes(file.mimetype) ? "image" : "video";
    item.url = result.url;
    item.fileId = result.fileId;
    item.type = type;
  }

  await item.save();
  return item;
};

const remove = async (id) => {
  const item = await GalleryItem.findById(id);
  if (!item) return null;

  // Delete from ImageKit
  if (item.fileId) {
    try {
      await imagekitService.deleteFile(item.fileId);
    } catch {
      // File may already be removed from ImageKit
    }
  }

  await GalleryItem.findByIdAndDelete(id);
  return item;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
