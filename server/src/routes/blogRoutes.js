const express = require('express');
const { uploadBlogFiles } = require('../middleware/uploadMiddleware');
const { validateBlogBody } = require('../middleware/validateBlog');
const verifyAdmin = require('../middleware/verifyAdmin');
const {
  createBlog,
  getBlogs,
  getAllBlogs,
  getPublishedBlogs,
  getBlogBySlug,
  searchBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

const router = express.Router();

router.post('/', verifyAdmin, uploadBlogFiles, validateBlogBody, createBlog);
router.put('/:id', verifyAdmin, uploadBlogFiles, validateBlogBody, updateBlog);
router.delete('/:id', verifyAdmin, deleteBlog);

router.get('/admin/all', verifyAdmin, getAllBlogs);
router.get('/published', getPublishedBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/search', searchBlogs);
router.get('/', getBlogs);
router.get('/:id', getBlogById);

module.exports = router;
