import React, { useEffect, useMemo, useState } from "react";
import { ImagePlus, Loader, Upload, Video } from "lucide-react";
import {
  createBlog,
  fetchBlogById,
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
        <small>Click or drag files here</small>
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
    const gallery = galleryFiles.length
      ? galleryFiles.map((f) => URL.createObjectURL(f))
      : [];
    const video = videoFile ? URL.createObjectURL(videoFile) : null;
    return { cover, gallery, video };
  }, [coverImageFile, galleryFiles, videoFile]);

  useEffect(() => {
    return () => {
      if (previews.cover) URL.revokeObjectURL(previews.cover);
      previews.gallery.forEach((u) => URL.revokeObjectURL(u));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return setError("Title is required");
    if (!content.trim()) return setError("Content is required");

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("excerpt", excerpt.trim());
      formData.append("content", content.trim());
      formData.append("author", author.trim() || "Admin");
      formData.append("published", published);

      if (coverImageFile) formData.append("coverImage", coverImageFile);
      if (galleryFiles.length) {
        galleryFiles.forEach((f) => formData.append("galleryImages", f));
      }
      if (videoFile) formData.append("video", videoFile);

      const data = isEdit
        ? await updateBlog(blogId, formData)
        : await createBlog(formData);

      onSaved?.(data.data);
    } catch (e) {
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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="blog-excerpt">Excerpt</label>
              <textarea
                id="blog-excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="Short summary shown on listing cards"
              />
            </div>

            <div className="form-row">
              <label htmlFor="blog-content">Content *</label>
              <textarea
                id="blog-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder="Write your article content..."
                required
              />
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
            <h3>Media (uploaded to ImageKit)</h3>

            <FileDropZone
              id="blog-cover"
              label="Cover Image"
              accept="image/*"
              hint="Upload cover image"
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
              accept="image/*"
              multiple
              hint="Upload gallery images"
              icon={Upload}
              onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
            >
              {galleryPreview.length ? (
                <div className="preview-gallery">
                  {galleryPreview.map((src, idx) => (
                    <img
                      key={idx}
                      className="preview-thumb"
                      src={src}
                      alt={`Gallery preview ${idx + 1}`}
                    />
                  ))}
                </div>
              ) : null}
            </FileDropZone>

            <FileDropZone
              id="blog-video"
              label="Video"
              accept="video/*"
              hint="Upload video"
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
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
