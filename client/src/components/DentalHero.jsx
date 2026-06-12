import react from "react";

export default function DentalHero() {
  return (
    <section className="dental-hero">
      <style>{`
        .dental-hero {
          background: #0c1f4a;
          position: relative;
          overflow: hidden;
          padding: 60px 24px;
        }

        .dental-hero__container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 60px;
          flex-wrap: wrap;
        }

        .dental-hero__image-wrap {
          flex: 1 1 320px;
          position: relative;
          min-width: 260px;
          display: flex;
          justify-content: center;
        }

        .dental-hero__blob {
          position: relative;
          width: 100%;
          max-width: 420px;
          aspect-ratio: 1 / 1.05;
          border-radius: 40px;
          background: linear-gradient(135deg, #5b8bff 0%, #2e6df6 60%, #1f5be0 100%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: visible;
        }

        .dental-hero__photo {
          width: 90%;
          max-width: 380px;
          object-fit: contain;
          object-position: bottom;
          position: relative;
          top: 18%;
        }

        .dental-hero__content {
          flex: 1 1 420px;
          min-width: 280px;
        }

        .dental-hero__eyebrow {
          color: #5b8bff;
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0 0 16px;
          letter-spacing: 0.5px;
        }

        .dental-hero__title {
          color: #ffffff;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 32px;
        }

        .dental-hero__button {
          display: inline-block;
          background: linear-gradient(90deg, #2e9bff 0%, #4f6bff 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 1px;
          text-decoration: none;
          padding: 18px 36px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 10px 25px rgba(46, 109, 246, 0.35);
        }

        .dental-hero__button:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(46, 109, 246, 0.45);
        }

        @media (max-width: 768px) {
          .dental-hero__container {
            flex-direction: column-reverse;
            text-align: center;
            gap: 40px;
          }

          .dental-hero__title {
            font-size: clamp(1.8rem, 8vw, 2.5rem);
          }

          .dental-hero__blob {
            max-width: 320px;
          }
        }
      `}</style>

      <div className="dental-hero__container">
        <div className="dental-hero__content">
          <p className="dental-hero__eyebrow">Book Dentail Appointment</p>
          <h1 className="dental-hero__title">
            We Are open And Welcoming Patients
          </h1>
          <button className="dental-hero__button">BOOK APPOINTMENT</button>
        </div>

        <div className="dental-hero__image-wrap">
          <div className="dental-hero__blob">
            <img
              className="dental-hero__photo"
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
              alt="Dentist holding dental model"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
