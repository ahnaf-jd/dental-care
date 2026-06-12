import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "../styles/admin-login.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjBuaaAZWQ4bUZT8O9tFbSDC7av78bIB4",
  authDomain: "dental-admin-auth.firebaseapp.com",
  projectId: "dental-admin-auth",
  storageBucket: "dental-admin-auth.firebasestorage.app",
  messagingSenderId: "446678695540",
  appId: "1:446678695540:web:28cc3657c867582ab0db21",
  measurementId: "G-D42XE5QFQZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // Save auth status to localStorage
      localStorage.setItem("adminAuthenticated", "true");

      // Redirect to admin dashboard
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.message || "Failed to login. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Admin Login</h1>
          <p>Dental Care Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          {error && <div className="admin-login-error">{error}</div>}

          <div className="admin-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Contact administrator if you don't have login credentials</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
