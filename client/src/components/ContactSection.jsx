import React, { useState } from "react";
import { Map, Clock, Mail } from "lucide-react";

const API_URL = "http://localhost:5000/api/forms";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactSection() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      console.log("Sending form data:", formData);
      
      const response = await fetch(API_URL + "/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (response.ok && data.success) {
        setStatus("success");
        setFormData(initialForm);
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        const errorMsg = data.message || data.errors?.[0]?.msg || "Failed to submit form";
        setErrorMessage(errorMsg);
        console.error("Form error:", errorMsg);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <section className="contact-section">
      <style>{`
        .contact-section {
          padding: 70px 24px;
          background: #ffffff;
        }

        .contact-section__header {
          text-align: center;
          margin-bottom: 50px;
        }

        .contact-section__eyebrow {
          color: #4f6bff;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 2px;
          margin: 0 0 12px;
        }

        .contact-section__title {
          color: #0c1f4a;
          font-size: clamp(1.8rem, 4vw, 2.75rem);
          font-weight: 800;
          margin: 0;
        }

        .contact-section__grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 60px;
        }

        .contact-form-panel {
          background: #f4f6fb;
          padding: 60px;
          border-radius: 4px;
        }

        .contact-form-panel__title {
          color: #0c1f4a;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          margin: 0 0 36px;
        }

        .contact-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 16px 20px;
          font-size: 0.95rem;
          font-family: inherit;
          color: #333;
          background: #ffffff;
          border: 1px solid #d8dce6;
          border-radius: 2px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #4f6bff;
        }

        .contact-form textarea {
          min-height: 140px;
          resize: vertical;
          margin-bottom: 24px;
        }

        .contact-form__submit {
          width: 100%;
          background: linear-gradient(90deg, #2e9bff 0%, #4f6bff 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 18px;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(46, 109, 246, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }

        .contact-form__submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(46, 109, 246, 0.45);
        }

        .contact-form__submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .contact-form__message {
          margin: 16px 0 0;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .contact-form__message--success {
          color: #1a9d5c;
        }

        .contact-form__message--error {
          color: #e23b3b;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .contact-info__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 28px 0;
          border-bottom: 1px solid #eef0f5;
          width: 100%;
        }

        .contact-info__item:last-child {
          border-bottom: none;
        }

        .contact-info__icon {
          flex-shrink: 0;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #4f6bff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .contact-info__content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .contact-info__content h3 {
          margin: 0 0 8px;
          font-size: 1.2rem;
          font-weight: 800;
          color: #0c1f4a;
          text-align: center;
        }

        .contact-info__content p {
          margin: 0;
          color: #6b7280;
          line-height: 1.7;
          font-size: 0.95rem;
          text-align: center;
        }

        @media (max-width: 900px) {
          .contact-section__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .contact-form-panel {
            padding: 40px 24px;
          }
        }

        @media (max-width: 600px) {
          .contact-form__row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="contact-section__header">
        <p className="contact-section__eyebrow">GET IN TOUCH</p>
        <h2 className="contact-section__title">Contact Us</h2>
      </div>

      <div className="contact-section__grid">
        <div className="contact-form-panel">
          <h3 className="contact-form-panel__title">Make Appointment</h3>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form__row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone No."
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="contact-form__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Submit Now"}
            </button>

            {status === "success" && (
              <p className="contact-form__message contact-form__message--success">
                Thanks! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="contact-form__message contact-form__message--error">
                {errorMessage || "Something went wrong. Please try again."}
              </p>
            )}
          </form>
        </div>

        <div className="contact-info">
          <div className="contact-info__item">
            <div className="contact-info__icon">
              <Map size={26} />
            </div>
            <div className="contact-info__content">
              <h3>Office Address</h3>
              <p>
                380 St Kilda Road, Melbourne
                <br />
                VIC 3004, Australia
              </p>
            </div>
          </div>

          <div className="contact-info__item">
            <div className="contact-info__icon">
              <Clock size={26} />
            </div>
            <div className="contact-info__content">
              <h3>Working Hours</h3>
              <p>
                Monday to Friday 09:00 to 18:30
                <br />
                Saturday 15:30
              </p>
            </div>
          </div>

          <div className="contact-info__item">
            <div className="contact-info__icon">
              <Mail size={26} />
            </div>
            <div className="contact-info__content">
              <h3>Message Us</h3>
              <p>
                support@example.com
                <br />
                info@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
