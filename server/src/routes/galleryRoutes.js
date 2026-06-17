const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const { uploadGalleryFile } = require("../middleware/uploadMiddleware");
const {
  getAll,
  create,
  update,
  remove,
} = require("../controllers/galleryController");

const router = express.Router();

router.get("/", getAll);
router.post("/", verifyAdmin, uploadGalleryFile, create);
router.put("/:id", verifyAdmin, uploadGalleryFile, update);
router.delete("/:id", verifyAdmin, remove);

module.exports = router;
