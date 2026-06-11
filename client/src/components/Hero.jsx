import "./Hero.css";
import doctorImg from "../assets/doctor.png";
import doctorImg2 from "../assets/doctor2.jpeg";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-left">
          <span className="hero-tag">
            WELCOME TO Dental Care
          </span>

          <h1>
            We Provide <br />
            Dental Service
          </h1>

          <p>
            Donec vitae libero non enim placerat eleifend aliquam erat volutpat.
            Curabitur diam ex, dapibus purus sapien, cursus sed nisl tristique,
            commodo gravida lectus non.
          </p>

          <div className="hero-form">
            <input
              type="number"
              placeholder="Your Phone Number..."
            />

            <button>
              GET CALL BACK
            </button>
          </div>
        </div>

        <div className="hero-right">

  <div className="shape"></div>

  <img
    src={doctorImg2}
    alt="Doctor"
    className="doctor"
  />

  <div className="doctor-card">
    <div className="avatar">Dr</div>

    <div className="doctor-card-content">
      <h4 className="doctor-card-name">Dr. John Smith</h4>
      <p className="doctor-card-title">Best Dental Specialist</p>
    </div>
  </div>

        </div>
      </div>
    </section>
  );
}

