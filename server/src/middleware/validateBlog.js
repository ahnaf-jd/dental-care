const parsePublished = (value) => value === true || value === 'true';

const validateBlogBody = (req, res, next) => {
  const title = String(req.body.title ?? '').trim();
  const content = String(req.body.content ?? '').trim();
  const excerpt = String(req.body.excerpt ?? '').trim();
  const author = String(req.body.author ?? 'Admin').trim() || 'Admin';
  const published = parsePublished(req.body.published);

  const errors = [];

  if (!title) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (title.length < 3) {
    errors.push({ field: 'title', message: 'Title must be at least 3 characters' });
  } else if (title.length > 200) {
    errors.push({ field: 'title', message: 'Title must not exceed 200 characters' });
  }

  if (!content) {
    errors.push({ field: 'content', message: 'Content is required' });
  } else if (content.length < 10) {
    errors.push({ field: 'content', message: 'Content must be at least 10 characters' });
  }

  if (excerpt.length > 500) {
    errors.push({ field: 'excerpt', message: 'Excerpt must not exceed 500 characters' });
  }

  if (author.length > 100) {
    errors.push({ field: 'author', message: 'Author name must not exceed 100 characters' });
  }

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  req.blogPayload = { title, excerpt, content, author, published };
  next();
};

module.exports = { validateBlogBody, parsePublished };
