const mongoose = require("mongoose");

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title must not exceed 200 characters'],
      minlength: [3, 'Title must be at least 3 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [500, 'Excerpt must not exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [10, 'Content must be at least 10 characters'],
    },
    coverImage: {
      type: String,
      default: null,
    },
    coverImageFileId: {
      type: String,
      default: null,
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    galleryImageFileIds: [
      {
        type: String,
      },
    ],
    video: {
      type: String,
      default: null,
    },
    videoFileId: {
      type: String,
      default: null,
    },
    author: {
      type: String,
      default: 'Admin',
      trim: true,
    },
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate unique slug before saving
blogSchema.pre('save', async function() {
  if (!this.isModified('title')) return;

  const baseSlug = generateSlug(this.title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await mongoose.models.Blog.findOne({
      slug,
      _id: { $ne: this._id },
    });

    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  this.slug = slug;
});

// Handle duplicate slug error
blogSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    next(new Error(`${field} must be unique`));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Blog", blogSchema);