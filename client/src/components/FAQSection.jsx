import { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";

/* ── Styles ─────────────────────────────────────── */
const css = `
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;
  }

  /* ── Section shell ── */
  .faq-section {
    display: flex;
    width: 100%;
    min-height: 560px;
    background: #ffffff;
    overflow: hidden;
  }

  /* ── White gap after FAQ section ── */
  .faq-gap {
    width: 100%;
    height: 80px;
    background: #ffffff;
  }

  /* ── Left panel ── */
  .faq-left {
    flex: 0 0 50%;
    background: #0F1C58;
    padding: 68px 44px 68px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .faq-eyebrow {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    color: #3B82F6;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .faq-title {
    font-size: 36px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
    margin-bottom: 32px;
  }

  /* ── Accordion list ── */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .faq-item {
    background: #ffffff;
    border-radius: 3px;
    overflow: hidden;
  }

  /* ── Question row ── */
  .faq-row {
    display: flex;
    align-items: stretch;
    cursor: pointer;
    user-select: none;
    min-height: 52px;
  }

  .faq-row:hover .faq-question-text {
    color: #2563EB;
  }

  .faq-question-text {
    flex: 1;
    font-size: 13.5px;
    font-weight: 700;
    color: #1B2455;
    padding: 15px 14px 15px 18px;
    display: flex;
    align-items: center;
    line-height: 1.4;
    transition: color 0.2s;
  }

  /* ── Toggle button ── */
  .faq-btn {
    width: 44px;
    min-width: 44px;
    background: #3B82F6;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    transition: background-color 0.2s;
    flex-shrink: 0;
  }

  .faq-btn:hover {
    background: #2563EB;
  }

  /* ── Answer ── */
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0);   }
  }

  .faq-answer {
    padding: 2px 18px 18px;
    font-size: 13.5px;
    color: #6B7280;
    line-height: 1.78;
    animation: slideDown 0.22s ease;
  }

  /* ── Right panel ── */
  .faq-right {
    flex: 0 0 50%;
    overflow: hidden;
    position: relative;
    background: #c9d6e3; /* fallback while image loads */
  }

  .faq-right img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .faq-section {
      flex-direction: column;
    }

    .faq-left {
      flex: none;
      padding: 52px 24px 48px;
    }

    .faq-right {
      flex: none;
      height: 300px;
    }

    .faq-title {
      font-size: 28px;
    }
  }

  @media (max-width: 480px) {
    .faq-left {
      padding: 40px 18px;
    }

    .faq-title {
      font-size: 24px;
    }

    .faq-question-text {
      font-size: 13px;
    }
  }
`;

/* ── Data ────────────────────────────────────────── */
const faqs = [
  {
    id: 1,
    question: "Vivamus rhoncus ante a ipsum imperdiet ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  },
  {
    id: 2,
    question: "Integer id dolor at nisi laoreet iaculis vitae ?",
    answer:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.",
  },
  {
    id: 3,
    question: "Donec venenatis elit dignissim, posuere ?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
  },
  {
    id: 4,
    question: "Curabitur varius, massa sit amet egestas ?",
    answer:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
  },
];

/* ── Component ───────────────────────────────────── */
export default function FAQSection() {
  const [openId, setOpenId] = useState(1); // first item open by default

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <style>{css}</style>
      <section className="faq-section">

        {/* ── Left: content ── */}
        <div className="faq-left">
          <span className="faq-eyebrow">FAQ</span>
          <h2 className="faq-title">
            Frequently Asked<br />Question
          </h2>

          <div className="faq-list">
            {faqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="faq-item">
                  <div
                    className="faq-row"
                    onClick={() => toggle(item.id)}
                    role="button"
                    aria-expanded={isOpen}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && toggle(item.id)}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <button
                      className="faq-btn"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      {isOpen
                        ? <ChevronDown size={18} strokeWidth={2.5} />
                        : <ChevronLeft size={18} strokeWidth={2.5} />
                      }
                    </button>
                  </div>

                  {isOpen && (
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right: image ── */}
        {/* Replace the src URL with your own dental/medical image */}
        <div className="faq-right">
          <img
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80"
            alt="Dental care professional"
          />
        </div>

      </section>

      {/* White gap after FAQ */}
      <div className="faq-gap"></div>
    </>
  );
}
