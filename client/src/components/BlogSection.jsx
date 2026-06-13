import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Loader } from "lucide-react";
import {
  fetchPublishedBlogs,
  formatBlogDate,
  mediaUrl,
} from "../services/blogApi";
import "./blog-section.css";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchPublishedBlogs(1, 3);
        setBlogs(data.blogs || []);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <section className="blog-section">
      <p className="blog-section__eyebrow">OUR BLOG</p>
      <h2 className="blog-section__title">Latest Blog &amp; News</h2>

      {loading ? (
        <div className="blog-section__loading">
          <Loader size={32} />
        </div>
      ) : blogs.length === 0 ? (
        <p className="blog-section__empty">New articles coming soon.</p>
      ) : (
        <div className="blog-section__grid">
          {blogs.map((blog) => (
            <article className="blog-card" key={blog._id}>
              <Link to={`/blogs/${blog.slug}`} className="blog-card__image-wrap">
                <img
                  className="blog-card__image"
                  src={
                    mediaUrl(blog.coverImage) ||
                    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={blog.title}
                />
                <span className="blog-card__date">
                  <Calendar size={14} />
                  {formatBlogDate(blog.createdAt)}
                </span>
              </Link>
              <div className="blog-card__body">
                <h3 className="blog-card__title">
                  <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h3>
                <p className="blog-card__text">
                  {blog.excerpt || blog.content.slice(0, 120) + "..."}
                </p>
                <Link className="blog-card__link" to={`/blogs/${blog.slug}`}>
                  READ MORE
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <Link to="/blogs" className="blog-section__view-all">
        View All Articles
      </Link>
    </section>
  );
}
