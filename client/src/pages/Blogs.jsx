import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Loader, Search } from "lucide-react";
import Navbar from "../nav-foot/Navbar";
import Footer from "../nav-foot/Footer";
import {
  fetchPublishedBlogs,
  formatBlogDate,
  mediaUrl,
  searchBlogs,
} from "../services/blogApi";
import "./blog.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        if (search.trim().length >= 2) {
          const data = await searchBlogs(search.trim(), { publishedOnly: true });
          setBlogs(data.data || []);
          setPagination(null);
        } else {
          const data = await fetchPublishedBlogs(page, 9);
          setBlogs(data.blogs || []);
          setPagination(data.pagination || null);
        }
      } catch (e) {
        setError(e.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadBlogs, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [page, search]);

  const totalPages = pagination?.total || 1;

  const emptyMessage = useMemo(() => {
    if (search.trim().length >= 2) return "No published blogs match your search.";
    return "No published blogs yet. Check back soon!";
  }, [search]);

  return (
    <>
      <Navbar />
      <main className="blog-page">
        <section className="blog-page__hero">
          <p className="blog-page__eyebrow">OUR BLOG</p>
          <h1>Dental Care Blog &amp; News</h1>
          <p>Expert tips, treatment insights, and oral health advice from our team.</p>
        </section>

        <section className="blog-page__content">
          <div className="blog-page__toolbar">
            <div className="blog-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {error ? <div className="blog-alert blog-alert--error">{error}</div> : null}

          {loading ? (
            <div className="blog-loading">
              <Loader size={40} />
              <p>Loading articles...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="blog-empty">{emptyMessage}</div>
          ) : (
            <>
              <div className="blog-grid">
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
                      <p className="blog-card__author">{blog.author || "Admin"}</p>
                      <h2 className="blog-card__title">
                        <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                      </h2>
                      <p className="blog-card__text">
                        {blog.excerpt || blog.content.slice(0, 140) + "..."}
                      </p>
                      <Link className="blog-card__link" to={`/blogs/${blog.slug}`}>
                        READ MORE
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {!search && totalPages > 1 ? (
                <div className="blog-pagination">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
