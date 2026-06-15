const multer = require('multer');

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/x-msvideo',
  'video/webm',
];

const LIMITS = {
  coverImage: 10 * 1024 * 1024,
  galleryImages: 10 * 1024 * 1024,
  video: 100 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'coverImage' || file.fieldname === 'galleryImages') {
    if (IMAGE_TYPES.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(
      new Error('Invalid image type. Allowed: JPEG, PNG, WebP, GIF'),
      false
    );
  }

  if (file.fieldname === 'video') {
    if (VIDEO_TYPES.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(
      new Error('Invalid video type. Allowed: MP4, MPEG, MOV, AVI, WebM'),
      false
    );
  }

  return cb(new Error(`Unexpected upload field: ${file.fieldname}`), false);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

const blogUploadFields = [
  { name: 'coverImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 },
  { name: 'video', maxCount: 1 },
];

const uploadBlogFiles = (req, res, next) => {
  upload.fields(blogUploadFields)(req, res, (err) => {
    if (!err) {
      if (req.files?.coverImage?.[0]?.size > LIMITS.coverImage) {
        return res.status(400).json({
          success: false,
          message: 'Cover image must be 10MB or smaller',
        });
      }

      const oversizedGallery = (req.files?.galleryImages || []).find(
        (file) => file.size > LIMITS.galleryImages
      );
      if (oversizedGallery) {
        return res.status(400).json({
          success: false,
          message: 'Each gallery image must be 10MB or smaller',
        });
      }

      if (req.files?.video?.[0]?.size > LIMITS.video) {
        return res.status(400).json({
          success: false,
          message: 'Video must be 100MB or smaller',
        });
      }

      return next();
    }

    if (err instanceof multer.MulterError) {
      const message =
        err.code === 'LIMIT_FILE_SIZE'
          ? 'File exceeds the maximum allowed size'
          : err.code === 'LIMIT_UNEXPECTED_FILE'
            ? `Unexpected file field: ${err.field}`
            : err.message;

      return res.status(400).json({ success: false, message });
    }

    return res.status(400).json({ success: false, message: err.message });
  });
};

module.exports = upload;
module.exports.uploadBlogFiles = uploadBlogFiles;
