import { useState } from "react";
import { useSiteContent } from "../context/SiteContentContext";
import { mediaUrl } from "../services/contentApi";

const css = `
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;
  }

  .ts-section {
    background-color: #EEF2F7;
    padding: 72px 24px 96px;
    min-height: 100vh;
  }

  .ts-container {
    max-width: 960px;
    margin: 0 auto;
  }

  .ts-header {
    text-align: center;
    margin-bottom: 68px;
  }

  .ts-label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2.5px;
    color: #2563EB;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .ts-title {
    font-size: 53px;
    font-weight: 800;
    color: #1B2455;
    line-height: 1.2;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  .ts-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 36px;
    animation: fadeUp 0.35s ease both;
  }

  .ts-card-outer {
    position: relative;
    margin-top: 48px;
  }

  .ts-avatar {
    position: absolute;
    top: -48px;
    left: 20px;
    width: 74px;
    height: 74px;
    object-fit: cover;
    border: 2px solid #3DB8D0;
    display: block;
    z-index: 2;
  }

  .ts-card {
    background: #F6F9FE;
    border-radius: 10px;
    padding: 42px 24px 28px;
    box-shadow: 0 4px 24px rgba(20, 35, 100, 0.07);
    border: 1px solid #E5EBF5;
    position: relative;
    z-index: 1;
  }

  .ts-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .ts-stars {
    display: flex;
    gap: 3px;
  }

  .ts-star {
    font-size: 22px;
    color: #D1D5DB;
  }

  .ts-star-on {
    color: #FBBF24;
  }

  .ts-quote {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 72px;
    line-height: 0.65;
    color: #BDD4E8;
    user-select: none;
    flex-shrink: 0;
  }

  .ts-text {
    font-size: 13.5px;
    color: #6B7280;
    line-height: 1.8;
    margin-bottom: 20px;
  }

  .ts-name {
    font-size: 17px;
    font-weight: 700;
    color: #1B2455;
    margin-bottom: 4px;
  }

  .ts-role {
    font-size: 13px;
    color: #3B82F6;
    font-weight: 500;
  }

  .ts-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 52px;
  }

  .ts-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    padding: 0;
    background: #C8D3E2;
    transition: background-color 0.25s;
  }

  .ts-dot-active {
    background: #1B2455;
  }

  @media (max-width: 680px) {
    .ts-grid {
      grid-template-columns: 1fr;
    }

    .ts-title {
      font-size: 26px;
    }

    .ts-section {
      padding: 56px 16px 72px;
    }

    .ts-header {
      margin-bottom: 48px;
    }
  }
`;

const FALLBACK_AVATARS = [
  "https://i.pravatar.cc/150?img=47",
  "https://i.pravatar.cc/150?img=68",
  "https://i.pravatar.cc/150?img=32",
  "https://i.pravatar.cc/150?img=53",
];

function Stars({ n }) {
  return (
    <div className="ts-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`ts-star${i < n ? " ts-star-on" : ""}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function Card({ t, index }) {
  const image = mediaUrl(t.image) || FALLBACK_AVATARS[index % FALLBACK_AVATARS.length];

  return (
    <div className="ts-card-outer">
      <img src={image} alt={t.name} className="ts-avatar" />
      <div className="ts-card">
        <div className="ts-card-top">
          <Stars n={t.rating} />
          <span className="ts-quote">"</span>
        </div>
        <p className="ts-text">{t.text}</p>
        <h4 className="ts-name">{t.name}</h4>
        <p className="ts-role">{t.role}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { testimonials } = useSiteContent();
  const [page, setPage] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const slides = [];
  for (let i = 0; i < testimonials.items.length; i += 2) {
    slides.push(testimonials.items.slice(i, i + 2));
  }

  function goTo(i) {
    setPage(i);
    setAnimKey((k) => k + 1);
  }

  const currentSlide = slides[page] || [];

  return (
    <>
      <style>{css}</style>
      <section className="ts-section">
        <div className="ts-container">
          <header className="ts-header">
            <span className="ts-label">{testimonials.eyebrow}</span>
            <h2 className="ts-title">{testimonials.title}</h2>
          </header>

          <div key={animKey} className="ts-grid">
            {currentSlide.map((t, index) => (
              <Card key={`${page}-${index}`} t={t} index={page * 2 + index} />
            ))}
          </div>

          {slides.length > 1 && (
            <div className="ts-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`ts-dot${i === page ? " ts-dot-active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
