import React from "react";
import { Calendar } from "lucide-react";

const blogs = [
  {
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
    date: "24th March 2021",
    title: "Cras accumsan nulla nec lacus ultricies placerat.",
    text:
      "Curabitur sagittis libero tincidunt tempor finibus. Mauris at dignissim ligula, nec tristique orci.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
    date: "24th March 2021",
    title: "Dras accumsan nulla nec lacus ultricies placerat.",
    text:
      "Curabitur sagittis libero tincidunt tempor finibus. Mauris at dignissim ligula, nec tristique orci.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop",
    date: "24th March 2021",
    title: "Seas accumsan nulla nec lacus ultricies placerat.",
    text:
      "Curabitur sagittis libero tincidunt tempor finibus. Mauris at dignissim ligula, nec tristique orci.",
  },
];

export default function BlogSection() {
  return (
    <section className="blog-section">
      <style>{`
        .blog-section {
          padding: 70px 24px;
          background: #ffffff;
          text-align: center;
        }

        .blog-section__eyebrow {
          color: #4f6bff;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 2px;
          margin: 0 0 12px;
        }

        .blog-section__title {
          color: #0c1f4a;
          font-size: clamp(1.8rem, 4vw, 2.75rem);
          font-weight: 800;
          margin: 0 0 50px;
        }

        .blog-section__grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          text-align: left;
        }

        .blog-card {
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .blog-card__image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .blog-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-card__date {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: #4f6bff;
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .blog-card__body {
          padding: 24px;
        }

        .blog-card__title {
          color: #0c1f4a;
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1.35;
          margin: 0 0 14px;
        }

        .blog-card__text {
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0 0 18px;
        }

        .blog-card__link {
          color: #4f6bff;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 1px;
          text-decoration: none;
          border-bottom: 2px solid #4f6bff;
          padding-bottom: 4px;
        }

        .blog-card__link:hover {
          color: #0c1f4a;
          border-color: #0c1f4a;
        }

        @media (max-width: 900px) {
          .blog-section__grid {
            grid-template-columns: 1fr;
            max-width: 500px;
          }
        }
      `}</style>

      <p className="blog-section__eyebrow">OUR BLOG</p>
      <h2 className="blog-section__title">Latest Blog &amp; News</h2>

      <div className="blog-section__grid">
        {blogs.map((blog, index) => (
          <article className="blog-card" key={index}>
            <div className="blog-card__image-wrap">
              <img
                className="blog-card__image"
                src={blog.image}
                alt={blog.title}
              />
              <span className="blog-card__date">
                <Calendar size={14} />
                {blog.date}
              </span>
            </div>
            <div className="blog-card__body">
              <h3 className="blog-card__title">{blog.title}</h3>
              <p className="blog-card__text">{blog.text}</p>
              <a className="blog-card__link" href="#">
                READ MORE
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
