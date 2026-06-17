import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Image as ImageIcon,
  Film,
  Trash2,
  RefreshCw,
  Save,
  X,
  FolderOpen,
} from "lucide-react";
import {
  fetchGallery,
  uploadGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../../services/galleryApi";
import "../../styles/admin-gallery.css";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "image", label: "Photos" },
  { id: "video", label: "Videos" },
];

export default function GalleryAdmin() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [replacingId, setReplacingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [titles, setTitles] = useState({});

  const clearAlerts = () => {
    setMessage("");
    setError("");
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setError("");
    setTimeout(() => setMessage(""), 4000);
  };

  const showError = (msg) => {
    setError(msg);
    setMessage("");
    setTimeout(() => setError(""), 5000);
  };

  const loadGallery = useCallback(async () => {
    try {
      const res = await fetchGallery();
      setItems(res.data);
      // Sync local title state
      const titleMap = {};
      res.data.forEach((item) => {
        titleMap[item._id] = item.title || "";
      });
      setTitles(titleMap);
    } catch (err) {
      showError(err.response?.data?.message || err.message || "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  // ── Upload ──
  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    clearAlerts();
    setUploading(true);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("galleryFile", file);
        await uploadGalleryItem(formData);
      }
      showMessage(
        files.length === 1
          ? "File uploaded successfully!"
          : `${files.length} files uploaded successfully!`
      );
      await loadGallery();
    } catch (err) {
      showError(err.response?.data?.message || err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const onFileSelect = (e) => {
    handleUpload(Array.from(e.target.files));
    e.target.value = "";
  };

  // ── Drag & Drop ──
  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleUpload(Array.from(e.dataTransfer.files));
  };

  // ── Title Update ──
  const handleTitleChange = (id, value) => {
    setTitles((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveTitle = async (id) => {
    setSavingId(id);
    clearAlerts();
    try {
      const formData = new FormData();
      formData.append("title", titles[id] || "");
      await updateGalleryItem(id, formData);
      showMessage("Caption updated!");
      await loadGallery();
    } catch (err) {
      showError(err.response?.data?.message || err.message || "Failed to update caption");
    } finally {
      setSavingId(null);
    }
  };

  // ── Replace File ──
  const handleReplace = async (id, file) => {
    if (!file) return;
    setReplacingId(id);
    clearAlerts();
    try {
      const formData = new FormData();
      formData.append("galleryFile", file);
      formData.append("title", titles[id] || "");
      await updateGalleryItem(id, formData);
      showMessage("File replaced successfully!");
      await loadGallery();
    } catch (err) {
      showError(err.response?.data?.message || err.message || "Failed to replace file");
    } finally {
      setReplacingId(null);
    }
  };

  // ── Delete ──
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    clearAlerts();
    try {
      await deleteGalleryItem(deleteTarget);
      showMessage("Item deleted.");
      setDeleteTarget(null);
      await loadGallery();
    } catch (err) {
      showError(err.response?.data?.message || err.message || "Failed to delete item");
      setDeleteTarget(null);
    }
  };

  // ── Filtering ──
  const filteredItems = items.filter((item) =>
    filter === "all" ? true : item.type === filter
  );

  const imageCount = items.filter((i) => i.type === "image").length;
  const videoCount = items.filter((i) => i.type === "video").length;

  return (
    <div className="gallery-admin-page">
      {/* Top Bar */}
      <header className="gallery-topbar">
        <div className="gallery-topbar__inner">
          <div className="gallery-topbar__left">
            <button
              type="button"
              className="gallery-back"
              onClick={() => navigate("/admin-content")}
            >
              ← Content
            </button>
            <div>
              <h1>Gallery</h1>
              <p>Upload and manage photos &amp; videos.</p>
            </div>
          </div>
          <div className="gallery-count">
            <ImageIcon size={15} />
            {imageCount} Photos
            <span style={{ opacity: 0.5, margin: "0 2px" }}>|</span>
            <Film size={15} />
            {videoCount} Videos
          </div>
        </div>
      </header>

      <div className="gallery-body">
        {/* Alerts */}
        {message && (
          <div className="gallery-alert gallery-alert--success">{message}</div>
        )}
        {error && (
          <div className="gallery-alert gallery-alert--error">{error}</div>
        )}

        {/* Upload Zone */}
        <div
          className={`gallery-upload-zone${dragging ? " dragging" : ""}${uploading ? " uploading" : ""}`}
          onClick={onDropZoneClick}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="gallery-upload-icon">
            <Upload size={40} />
          </div>
          <h3>{uploading ? "Uploading..." : "Drop files here or click to upload"}</h3>
          <p>
            Supports <strong>JPEG, PNG, WebP, GIF</strong> images and{" "}
            <strong>MP4, MOV, WebM, AVI</strong> videos
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/mpeg,video/quicktime,video/x-msvideo,video/webm"
            multiple
            onChange={onFileSelect}
          />
        </div>

        {/* Filter Tabs */}
        {items.length > 0 && (
          <div className="gallery-filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`gallery-filter-btn${filter === f.id ? " active" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                {f.id === "all" && ` (${items.length})`}
                {f.id === "image" && ` (${imageCount})`}
                {f.id === "video" && ` (${videoCount})`}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="gallery-loading">
            <div className="gallery-spinner" />
            <p>Loading gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="gallery-empty">
            <div className="gallery-empty__icon">
              <FolderOpen size={48} />
            </div>
            <h3>
              {items.length === 0
                ? "No media yet"
                : "No matching items"}
            </h3>
            <p>
              {items.length === 0
                ? "Upload your first photo or video above."
                : "Try switching the filter tab."}
            </p>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div key={item._id} className="gallery-card">
                {/* Preview */}
                <div className="gallery-card__preview">
                  {item.type === "image" ? (
                    <img src={item.url} alt={item.title || "Gallery image"} loading="lazy" />
                  ) : (
                    <video src={item.url} controls preload="metadata" />
                  )}
                  <span
                    className={`gallery-card__type-badge gallery-card__type-badge--${item.type}`}
                  >
                    {item.type === "image" ? "Photo" : "Video"}
                  </span>
                </div>

                {/* Body */}
                <div className="gallery-card__body">
                  <input
                    className="gallery-card__title-input"
                    type="text"
                    placeholder="Add a caption..."
                    value={titles[item._id] ?? item.title ?? ""}
                    onChange={(e) => handleTitleChange(item._id, e.target.value)}
                  />

                  <div className="gallery-card__actions">
                    {/* Save Caption */}
                    <button
                      type="button"
                      className="gallery-btn gallery-btn--save"
                      disabled={savingId === item._id}
                      onClick={() => handleSaveTitle(item._id)}
                      title="Save caption"
                    >
                      <Save size={14} />
                      {savingId === item._id ? "Saving..." : "Save"}
                    </button>

                    {/* Replace File */}
                    <button
                      type="button"
                      className="gallery-btn gallery-btn--replace"
                      disabled={replacingId === item._id}
                      title="Replace file"
                    >
                      <RefreshCw size={14} />
                      {replacingId === item._id ? "..." : "Replace"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/mpeg,video/quicktime,video/x-msvideo,video/webm"
                        onChange={(e) => {
                          handleReplace(item._id, e.target.files[0]);
                          e.target.value = "";
                        }}
                      />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      className="gallery-btn gallery-btn--delete"
                      onClick={() => setDeleteTarget(item._id)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="gallery-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete this item?</h3>
            <p>
              This will permanently remove the file from the gallery and
              storage. This action cannot be undone.
            </p>
            <div className="gallery-modal__actions">
              <button
                type="button"
                className="gallery-modal-btn gallery-modal-btn--cancel"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="gallery-modal-btn gallery-modal-btn--confirm"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
