const Blog = require('../models/blog.model');
const imagekitService = require('./imagekitService');

const createBlog = async (data) => Blog.create(data);

const getAllBlogs = async (filters = {}) => {
  const query = {};
  if (filters.published) query.published = true;

  return Blog.find(query).sort({ createdAt: -1 }).select('-__v');
};

const getBlogById = async (id) => Blog.findById(id).select('-__v');

const getBlogBySlug = async (slug, { publishedOnly = false } = {}) => {
  const query = { slug };
  if (publishedOnly) query.published = true;
  return Blog.findOne(query).select('-__v');
};

const removeCoverAsset = async (blog) => {
  await imagekitService.deleteMediaAsset(blog.coverImage, blog.coverImageFileId);
};

const removeVideoAsset = async (blog) => {
  await imagekitService.deleteMediaAsset(blog.video, blog.videoFileId);
};

const removeGalleryAssets = async (blog) => {
  const images = blog.galleryImages || [];
  const fileIds = blog.galleryImageFileIds || [];

  await Promise.all(
    images.map((url, index) => imagekitService.deleteMediaAsset(url, fileIds[index]))
  );
};

const updateBlog = async (id, updateData) => {
  const blog = await Blog.findById(id);
  if (!blog) return null;

  if (updateData.coverImage && blog.coverImage !== updateData.coverImage) {
    await removeCoverAsset(blog);
  }

  if (updateData.video && blog.video !== updateData.video) {
    await removeVideoAsset(blog);
  }

  if (updateData.galleryImages) {
    await removeGalleryAssets(blog);
  }

  Object.entries(updateData).forEach(([key, value]) => {
    if (value !== undefined) {
      blog[key] = value;
    }
  });

  await blog.save();
  return blog.toObject({ versionKey: false });
};

const deleteBlog = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) return null;

  await removeCoverAsset(blog);
  await removeGalleryAssets(blog);
  await removeVideoAsset(blog);

  await Blog.findByIdAndDelete(id);
  return blog;
};

const searchBlogs = async (query, { publishedOnly = false } = {}) => {
  const filter = {
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { excerpt: { $regex: query, $options: 'i' } },
      { content: { $regex: query, $options: 'i' } },
    ],
  };

  if (publishedOnly) filter.published = true;

  return Blog.find(filter).sort({ createdAt: -1 }).select('-__v');
};

const getPublishedBlogs = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const blogs = await Blog.find({ published: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-__v');

  const total = await Blog.countDocuments({ published: true });

  return {
    blogs,
    pagination: {
      current: page,
      total: Math.ceil(total / limit) || 1,
      count: blogs.length,
      totalItems: total,
    },
  };
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  searchBlogs,
  getPublishedBlogs,
  updateBlog,
  deleteBlog,
};
