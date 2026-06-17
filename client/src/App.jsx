import { Routes, Route } from "react-router-dom";
import "./styles/animations.css";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Messages from "./pages/Messages";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogAdmin from "./pages/admin/BlogAdmin";
import ContentAdmin from "./pages/admin/ContentAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import ScrollToTopButton from "./styles/ScrollToTopButton";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-blogs"
          element={
            <ProtectedRoute>
              <BlogAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-content"
          element={
            <ProtectedRoute>
              <ContentAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-gallery"
          element={
            <ProtectedRoute>
              <GalleryAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ScrollToTopButton />
    </>
  );
}

export default App;
