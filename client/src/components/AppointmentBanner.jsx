import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

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

  /* ── Outer shell: provides white space for the doctor to overflow into ── */
 .ab-shell {
  position: relative;
  background: #EEF2F7;
  padding-top: 120px;
  }

  /* ── Dark navy band ── */
  .ab-band {
    background: #0C1A50;
    position: relative;
    overflow: visible;
    display: flex;
    align-items: center;
    min-height: 410px;
  }

  /* ── Left column ── */
  .ab-left {
    flex: 0 0 44%;
    position: relative;
    height: 410px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: visible;
  }

  /*
   * Blue rounded blob – clips the doctor photo inside.
   * Height = section height (410) + shell overflow (120) = 530px
   * so the blob's top sits exactly at the shell padding boundary.
   */
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

  /* ── Right column ── */
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

  /* ── Fixed scroll-to-top button ── */
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

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .ab-heading { font-size: 38px; }
  }

  @media (max-width: 700px) {
    /* Keep padding-top so the doctor's head overflows above the dark band */
    .ab-shell {
      padding-top: 80px;
    }

    /* Stack into a single column */
    .ab-band {
      flex-direction: column;
      align-items: stretch;
      min-height: auto;
    }

    /* Image row: fixed height; overflow: visible so blob pokes above */
    .ab-left {
      flex: none;
      width: 100%;
      height: 330px;
      overflow: visible;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

    /*
     * Blob height = ab-left height (330) + shell padding-top (80) = 410px
     * This ensures the blob top aligns with the white shell edge.
     */
    .ab-blob {
      width: 272px;
      height: 410px;
      border-radius: 26px;
      left: 50%;
      transform: translateX(-50%);
    }

    /* Text sits below the image row */
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

/* ── Component ───────────────────────────────────── */
export default function AppointmentBanner() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide button if scroll position is less than 300px (hero section height)
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

          {/* Left: blob + doctor photo */}
          <div className="ab-left">
            <div className="ab-blob">
              {/*
                For the exact cut-out effect, replace src with a
                transparent-background PNG of your dentist.
              */}
              <img
                className="ab-doctor-img"
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80"
                alt="Dental professional"
              />
            </div>
          </div>

          {/* Right: text + CTA */}
          <div className="ab-right">
            <p className="ab-eyebrow">Book Dentail Appointment</p>
            <h2 className="ab-heading">
              We Are open And<br />Welcoming Patients
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
              Book Appointment
            </button>
          </div>

        </section>

        {/* Scroll-to-top */}
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
