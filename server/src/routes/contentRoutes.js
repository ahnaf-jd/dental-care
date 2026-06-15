const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const { uploadContentFiles } = require("../middleware/uploadMiddleware");
const { getContent, updateContent } = require("../controllers/contentController");

const router = express.Router();

router.get("/", getContent);
router.put("/", verifyAdmin, uploadContentFiles, updateContent);

module.exports = router;
