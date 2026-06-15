import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Edit2, ImageIcon, Loader, Search, Trash2, Video } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal";
import { deleteBlog, fetchBlogs, mediaUrl } from "../../services/blogApi";

function computeStats(blogs) {
  return {
    total: blogs.length,
    published: blogs.filter((b) => b.published).length,
    drafts: blogs.filter((b) => !b.published).length,
  };
}

export default function BlogTable({ onEdit, refreshKey, onStatsChange }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchBlogs();
      setBlogs(data.data || []);
    } catch (e) {
      setError(e.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [refreshKey, loadBlogs]);

  useEffect(() => {
    onStatsChange?.(computeStats(blogs));
  }, [blogs, onStatsChange]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        !search.trim() ||
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        (blog.excerpt || "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && blog.published) ||
        (statusFilter === "draft" && !blog.published);

      return matchesSearch && matchesStatus;
    });
  }, [blogs, search, statusFilter]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      setError("");
      await deleteBlog(deleteTarget._id);
      setBlogs((prev) => prev.filter((b) => b._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (e) {
      setError(e.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="admin-blog-table">
      <div className="admin-blog-table-header">
        <h2>All Posts</h2>
        <div className="admin-blog-table-tools">
          <div className="admin-blog-search">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-blog-filter"
          >
            <option value="all">All status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {error ? <div className="admin-blog-error">{error}</div> : null}

      {loading ? (
        <div className="admin-blog-loading">
          <Loader size={36} />
          <p>Loading blogs...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="admin-blog-empty">
          <p>No posts match your filters. Create a new article to get started.</p>
        </div>
      ) : (
        <div className="admin-blog-table-wrapper">
          <table className="admin-blog-table__table">
            <thead>
              <tr>
                <th style={{ width: 72 }}>Cover</th>
                <th>Title</th>
                <th>Status</th>
                <th>Created</th>
                <th style={{ width: 170 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <div className="admin-blog-thumb">
                      {blog.coverImage ? (
                        <img src={mediaUrl(blog.coverImage)} alt="" />
                      ) : blog.video ? (
                        <Video size={18} />
                      ) : (
                        <ImageIcon size={18} />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="admin-blog-title">{blog.title}</div>
                    {blog.excerpt ? (
                      <div className="admin-blog-excerpt">{blog.excerpt}</div>
                    ) : null}
                  </td>
                  <td>
                    <span
                      className={
                        blog.published
                          ? "admin-blog-pill admin-blog-pill--yes"
                          : "admin-blog-pill admin-blog-pill--no"
                      }
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <div className="admin-blog-actions">
                      <button
                        type="button"
                        className="btn btn-edit"
                        onClick={() => onEdit(blog._id)}
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-delete"
                        onClick={() => setDeleteTarget(blog)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Blog"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.title}"? Media on ImageKit will also be removed.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => !deleting && setDeleteTarget(null)}
      />
    </div>
  );
}
