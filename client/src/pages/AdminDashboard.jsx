import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "../styles/admin-dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("adminAuthenticated");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <div className="dashboard-header-content">
          <h1>Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="logout-btn"
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      <div className="admin-dashboard-content">
        <div className="welcome-section">
          <h2>Welcome, {currentUser?.email || "Admin"}</h2>
          <p>You are now logged in to the Dental Care Admin Portal</p>


          <div className="dashboard-card">
            <div className="card-icon">✍🏻</div>
            <h3>Blogs</h3>
            <p>Manage blogs</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📝</div>
            <h3>Content</h3>
            <p>Manage website content</p>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/admin-messages')}>
            <div className="card-icon">💬</div>
            <h3>Messages</h3>
            <p>Manage contact form messages</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
