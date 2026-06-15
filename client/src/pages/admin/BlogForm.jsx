import React, { useEffect, useMemo, useState } from "react";
import { ImagePlus, Loader, Upload, Video } from "lucide-react";
import {
  BlogApiError,
  createBlog,
  fetchBlogById,
  mapApiErrorsToFields,
  mediaUrl,
  updateBlog,
} from "../../services/blogApi";

function FileDropZone({ id, label, accept, multiple, hint, icon: Icon, onChange, children }) {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}</label>
      <label htmlFor={id} className="upload-dropzone">
        <Icon size={22} />
        <span>{hint}</span>
        <small>Click to choose {multiple ? "files" : "a file"}</small>
        <input
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onChange}
        />
      </label>
      {children}
    </div>
  );
}

export default function BlogForm({ mode, blogId, onCancel, onSaved }) {
  const isEdit = mode === "edit";

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [published, setPublished] = useState(false);

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const [existingCover, setExistingCover] = useState(null);
  const [existingGallery, setExistingGallery] = useState([]);
  const [existingVideo, setExistingVideo] = useState(null);

  const previews = useMemo(() => {
    const cover = coverImageFile ? URL.createObjectURL(coverImageFile) : null;
    const gallery = galleryFiles.map((file) => URL.createObjectURL(file));
    const video = videoFile ? URL.createObjectURL(videoFile) : null;
    return { cover, gallery, video };
  }, [coverImageFile, galleryFiles, videoFile]);

  useEffect(() => {
    return () => {
      if (previews.cover) URL.revokeObjectURL(previews.cover);
      previews.gallery.forEach((url) => URL.revokeObjectURL(url));
      if (previews.video) URL.revokeObjectURL(previews.video);
    };
  }, [previews]);

  useEffect(() => {
    if (!isEdit || !blogId) return;

    const loadBlog = async () => {
      try {
        setInitialLoading(true);
        setError("");
        const data = await fetchBlogById(blogId);
        const blog = data.data;

        setTitle(blog.title || "");
        setExcerpt(blog.excerpt || "");
        setContent(blog.content || "");
        setAuthor(blog.author || "Admin");
        setPublished(!!blog.published);

        setExistingCover(blog.coverImage || null);
        setExistingGallery(blog.galleryImages || []);
        setExistingVideo(blog.video || null);

        setCoverImageFile(null);
        setGalleryFiles([]);
        setVideoFile(null);
      } catch (e) {
        setError(e.message || "Failed to load blog");
      } finally {
        setInitialLoading(false);
      }
    };

    loadBlog();
  }, [isEdit, blogId]);

  const clearFieldError = (field) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const localErrors = {};
    if (!title.trim()) localErrors.title = "Title is required";
    if (!content.trim()) localErrors.content = "Content is required";
    if (title.trim().length > 0 && title.trim().length < 3) {
      localErrors.title = "Title must be at least 3 characters";
    }
    if (content.trim().length > 0 && content.trim().length < 10) {
      localErrors.content = "Content must be at least 10 characters";
    }

    if (Object.keys(localErrors).length) {
      setFieldErrors(localErrors);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("excerpt", excerpt.trim());
      formData.append("content", content.trim());
      formData.append("author", author.trim() || "Admin");
      formData.append("published", String(published));

      if (coverImageFile) formData.append("coverImage", coverImageFile);
      galleryFiles.forEach((file) => formData.append("galleryImages", file));
      if (videoFile) formData.append("video", videoFile);

      const data = isEdit
        ? await updateBlog(blogId, formData)
        : await createBlog(formData);

      onSaved?.(data.data);
    } catch (e) {
      if (e instanceof BlogApiError && e.errors.length) {
        setFieldErrors(mapApiErrorsToFields(e.errors));
        setError("Please fix the highlighted fields.");
        return;
      }
      setError(e.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const coverPreview = previews.cover || mediaUrl(existingCover);
  const galleryPreview = previews.gallery.length
    ? previews.gallery
    : (existingGallery || []).map(mediaUrl).filter(Boolean);
  const videoPreview = previews.video || mediaUrl(existingVideo);

  return (
    <div className="admin-blog-form">
      {error ? <div className="admin-blog-error admin-blog-error--block">{error}</div> : null}

      {initialLoading ? (
        <div className="admin-blog-loading">
          <Loader size={36} />
          <p>Loading blog...</p>
        </div>
      ) : (
        <form className="admin-blog-form__form" onSubmit={handleSubmit}>
          <div className="admin-blog-form__section">
            <h3>Post Details</h3>

            <div className="form-row">
              <label htmlFor="blog-title">Title *</label>
              <input
                id="blog-title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  clearFieldError("title");
                }}
                placeholder="Enter blog title"
              />
              {fieldErrors.title ? <span className="field-error">{fieldErrors.title}</span> : null}
            </div>

            <div className="form-row">
              <label htmlFor="blog-excerpt">Excerpt</label>
              <textarea
                id="blog-excerpt"
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  clearFieldError("excerpt");
                }}
                rows={3}
                placeholder="Short summary for listing cards"
              />
              {fieldErrors.excerpt ? <span className="field-error">{fieldErrors.excerpt}</span> : null}
            </div>

            <div className="form-row">
              <label htmlFor="blog-content">Content *</label>
              <textarea
                id="blog-content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  clearFieldError("content");
                }}
                rows={10}
                placeholder="Write your article content..."
              />
              {fieldErrors.content ? <span className="field-error">{fieldErrors.content}</span> : null}
            </div>

            <div className="admin-blog-form__row">
              <div className="form-row">
                <label htmlFor="blog-author">Author</label>
                <input
                  id="blog-author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="form-row form-row--toggle">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                  <span>Publish immediately</span>
                </label>
              </div>
            </div>
          </div>

          <div className="admin-blog-form__section">
            <h3>Media (ImageKit CDN)</h3>
            <p className="form-hint form-hint--section">
              Cover image is used on blog cards. Video and gallery appear on the article page.
              On edit, leave a field empty to keep existing files.
            </p>

            <FileDropZone
              id="blog-cover"
              label="Cover Image"
              accept="image/jpeg,image/png,image/webp,image/gif"
              hint="Cover image for listings"
              icon={ImagePlus}
              onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
            >
              {coverPreview ? (
                <img className="preview-image" src={coverPreview} alt="Cover preview" />
              ) : null}
            </FileDropZone>

            <FileDropZone
              id="blog-gallery"
              label="Gallery Images"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              hint="Gallery images for article"
              icon={Upload}
              onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
            >
              {galleryPreview.length ? (
                <div className="preview-gallery">
                  {galleryPreview.map((src, index) => (
                    <img
                      key={index}
                      className="preview-thumb"
                      src={src}
                      alt={`Gallery preview ${index + 1}`}
                    />
                  ))}
                </div>
              ) : null}
            </FileDropZone>

            <FileDropZone
              id="blog-video"
              label="Video"
              accept="video/mp4,video/webm,video/quicktime,video/mpeg"
              hint="Optional article video"
              icon={Video}
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            >
              {videoPreview ? (
                <video className="preview-video" src={videoPreview} controls />
              ) : null}
            </FileDropZone>
          </div>

          <div className="admin-blog-form__actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Uploading & Saving..." : isEdit ? "Update Post" : "Create Post"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
