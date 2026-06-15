import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
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

 .ab-shell {
  position: relative;
  background: #EEF2F7;
  padding-top: 120px;
  }

  .ab-band {
    background: #0C1A50;
    position: relative;
    overflow: visible;
    display: flex;
    align-items: center;
    min-height: 410px;
  }

  .ab-left {
    flex: 0 0 44%;
    position: relative;
    height: 410px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: visible;
  }

  .ab-blob {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 530px;
    background: #2F78F0;
    border-radius: 30px;
    z-index: 1;
    overflow: hidden;
  }

  .ab-doctor-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  .ab-right {
    flex: 1;
    padding: 0 64px 0 20px;
  }

  .ab-eyebrow {
    font-size: 14px;
    font-weight: 600;
    color: #7DB5FA;
    margin-bottom: 14px;
    letter-spacing: 0.2px;
  }

  .ab-heading {
    font-size: 48px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    margin-bottom: 30px;
  }

  .ab-cta {
    display: inline-block;
    background: #3B82F6;
    color: #ffffff;
    border: none;
    padding: 18px 48px;
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: background-color 0.2s, transform 0.15s;
  }

  .ab-cta:hover  { background: #2563EB; transform: translateY(-1px); }
  .ab-cta:active { transform: translateY(0); }

  .ab-scroll-btn {
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #3B82F6;
    border: none;
    cursor: pointer;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.5);
    z-index: 1000;
    transition: background 0.2s, transform 0.2s;
  }

  .ab-scroll-btn:hover {
    background: #1D5FD8;
    transform: translateY(-2px);
  }

  .ab-scroll-btn.hidden {
    display: none !important;
  }

  @media (max-width: 900px) {
    .ab-heading { font-size: 38px; }
  }

  @media (max-width: 700px) {
    .ab-shell {
      padding-top: 80px;
    }

    .ab-band {
      flex-direction: column;
      align-items: stretch;
      min-height: auto;
    }

    .ab-left {
      flex: none;
      width: 100%;
      height: 330px;
      overflow: visible;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

    .ab-blob {
      width: 272px;
      height: 410px;
      border-radius: 26px;
      left: 50%;
      transform: translateX(-50%);
    }

    .ab-right {
      padding: 28px 22px 52px;
    }

    .ab-eyebrow {
      font-size: 13px;
      margin-bottom: 10px;
    }

    .ab-heading {
      font-size: 30px;
      margin-bottom: 24px;
    }

    .ab-cta {
      padding: 16px 36px;
    }
  }

  @media (max-width: 400px) {
    .ab-blob  { width: 240px; }
    .ab-heading { font-size: 26px; }
  }
`;

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80";

export default function AppointmentBanner() {
  const { appointment } = useSiteContent();
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const bannerImage = mediaUrl(appointment.image) || DEFAULT_IMAGE;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{css}</style>

      <div className="ab-shell">
        <section className="ab-band">
          <div className="ab-left">
            <div className="ab-blob">
              <img className="ab-doctor-img" src={bannerImage} alt="Dental professional" />
            </div>
          </div>

          <div className="ab-right">
            <p className="ab-eyebrow">{appointment.eyebrow}</p>
            <h2 className="ab-heading">
              {appointment.headingLine1}
              <br />
              {appointment.headingLine2}
            </h2>
            <button
              className="ab-cta"
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {appointment.ctaText}
            </button>
          </div>
        </section>

        <button
          className={`ab-scroll-btn ${!showScrollBtn ? "hidden" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
      </div>
    </>
  );
}
