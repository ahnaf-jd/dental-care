const express = require("express");
const cors = require("cors");
const path = require("path");

const formRoutes = require("./routes/formRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contentRoutes = require("./routes/contentRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// CORS configuration - restrict to frontend URL
const allowedOrigins = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://dental-care-five-xi.vercel.app/"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/blogs", blogRoutes);

app.use(express.json());

app.use("/api/forms", formRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/gallery", galleryRoutes);

// Global error handler middleware
app.use((err, req, res, next) => {
  // Only log detailed errors in development mode
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err.message);
  } else {
    console.error('Internal Server Error');
  }
  
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
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