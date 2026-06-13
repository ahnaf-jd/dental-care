import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, PenLine, Plus, X } from "lucide-react";
import BlogTable from "./BlogTable";
import BlogForm from "./BlogForm";
import "../../styles/admin-blog.css";

export default function BlogAdmin() {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });

  const mode = useMemo(() => (editingId ? "edit" : "create"), [editingId]);

  const openCreate = () => {
    setEditingId(null);
    setFormKey((k) => k + 1);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setFormKey((k) => k + 1);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormKey((k) => k + 1);
    setShowForm(false);
  };

  const handleSaved = () => {
    setEditingId(null);
    setRefreshKey((k) => k + 1);
    setFormKey((k) => k + 1);
    setShowForm(false);
  };

  return (
    <div className="admin-blog-page">
      <header className="admin-blog-topbar">
        <div className="admin-blog-topbar__inner">
          <div className="admin-blog-topbar__left">
            <button
              type="button"
              className="admin-blog-back"
              onClick={() => navigate("/admin-dashboard")}
            >
              ← Dashboard
            </button>
            <div>
              <h1>Blog Management</h1>
              <p>Create, publish, and manage articles with ImageKit media.</p>
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            <Plus size={18} />
            New Post
          </button>
        </div>
      </header>

      <div className="admin-blog-body">
        <div className="admin-blog-stats">
          <div className="admin-blog-stat">
            <FileText size={22} />
            <div>
              <span>Total Posts</span>
              <strong>{stats.total}</strong>
            </div>
          </div>
          <div className="admin-blog-stat admin-blog-stat--published">
            <PenLine size={22} />
            <div>
              <span>Published</span>
              <strong>{stats.published}</strong>
            </div>
          </div>
          <div className="admin-blog-stat admin-blog-stat--draft">
            <FileText size={22} />
            <div>
              <span>Drafts</span>
              <strong>{stats.drafts}</strong>
            </div>
          </div>
        </div>

        <div className="admin-blog-card admin-blog-card--table">
          <BlogTable
            onEdit={handleEdit}
            refreshKey={refreshKey}
            onStatsChange={setStats}
          />
        </div>
      </div>

      <div className={`admin-blog-drawer ${showForm ? "admin-blog-drawer--open" : ""}`}>
        <div className="admin-blog-drawer__backdrop" onClick={handleCancel} />
        <aside className="admin-blog-drawer__panel">
          <div className="admin-blog-drawer__header">
            <h2>{mode === "edit" ? "Edit Post" : "Create Post"}</h2>
            <button type="button" className="admin-blog-drawer__close" onClick={handleCancel}>
              <X size={20} />
            </button>
          </div>
          <BlogForm
            key={`${mode}-${formKey}`}
            mode={mode}
            blogId={editingId}
            onCancel={handleCancel}
            onSaved={handleSaved}
          />
        </aside>
      </div>
    </div>
  );
}
