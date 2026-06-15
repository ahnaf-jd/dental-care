import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Loader, User } from "lucide-react";
import Navbar from "../nav-foot/Navbar";
import Footer from "../nav-foot/Footer";
import {
  fetchBlogBySlug,
  formatBlogDate,
  mediaUrl,
} from "../services/blogApi";
import "./blog.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchBlogBySlug(slug, { publishedOnly: true });
        setBlog(data.data);
      } catch (e) {
        setError(e.message || "Blog not found");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="blog-detail-page">
        <div className="blog-detail-page__inner">
          <Link to="/blogs" className="blog-detail-back">
            <ArrowLeft size={18} />
            Back to all articles
          </Link>

          {loading ? (
            <div className="blog-loading">
              <Loader size={40} />
              <p>Loading article...</p>
            </div>
          ) : error || !blog ? (
            <div className="blog-empty">
              <h1>Article not found</h1>
              <p>{error || "This blog may be unpublished or removed."}</p>
              <Link to="/blogs" className="blog-card__link">
                Browse all blogs
              </Link>
            </div>
          ) : (
            <article className="blog-detail">
              {blog.coverImage ? (
                <div className="blog-detail__cover">
                  <img src={mediaUrl(blog.coverImage)} alt={blog.title} />
                </div>
              ) : null}

              <header className="blog-detail__header">
                <p className="blog-page__eyebrow">DENTAL CARE BLOG</p>
                <h1>{blog.title}</h1>
                <div className="blog-detail__meta">
                  <span>
                    <User size={16} />
                    {blog.author || "Admin"}
                  </span>
                  <span>
                    <Calendar size={16} />
                    {formatBlogDate(blog.createdAt)}
                  </span>
                </div>
                {blog.excerpt ? <p className="blog-detail__excerpt">{blog.excerpt}</p> : null}
              </header>

              <div className="blog-detail__content">
                {blog.content.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {blog.video ? (
                <div className="blog-detail__video">
                  <h2>Video</h2>
                  <video
                    src={mediaUrl(blog.video)}
                    controls
                    style={{ width: "100%", borderRadius: "12px", background: "#000" }}
                  />
                </div>
              ) : null}

              {blog.galleryImages?.length ? (
                <section className="blog-detail__gallery">
                  <h2>Gallery</h2>
                  <div className="blog-detail__gallery-grid">
                    {blog.galleryImages.map((image, index) => (
                      <img
                        key={index}
                        src={mediaUrl(image)}
                        alt={`${blog.title} gallery ${index + 1}`}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
