const multer = require('multer');

const allowedImages = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const allowedVideos = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'coverImage' || file.fieldname === 'galleryImages') {
    if (allowedImages.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${file.fieldname}. Only images (JPEG, PNG, WebP, GIF) are allowed`), false);
    }
  } else if (file.fieldname === 'video') {
    if (allowedVideos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type for video. Only MP4, MPEG, MOV, AVI, and WebM are allowed'), false);
    }
  } else {
    cb(new Error('Unknown file field'), false);
  }
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
    if (!err) return next();

    if (err instanceof multer.MulterError) {
      const message =
        err.code === 'LIMIT_FILE_SIZE'
          ? 'File too large. Maximum size is 100MB.'
          : err.message;
      return res.status(400).json({ success: false, message });
    }

    return res.status(400).json({ success: false, message: err.message });
  });
};

module.exports = upload;
module.exports.uploadBlogFiles = uploadBlogFiles;
