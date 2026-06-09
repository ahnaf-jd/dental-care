const express = require("express");
const cors = require("cors");

const formRoutes = require("./routes/formRoutes");
const blogRoutes = require("./routes/blogRoutes")

const app = express();

// CORS configuration - restrict to frontend URL
const allowedOrigins = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/api/forms", formRoutes);
app.use("/api/blogs", blogRoutes);

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = app;