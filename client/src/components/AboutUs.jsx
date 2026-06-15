import aboutImg from "../assets/clinic.jpg";

import "./about-us.css";


export default function About() {
  return (
    <section className="about">
      <div className="about-container">

        <div className="about-image">
          <img src={aboutImg} alt="Dental Care" />

          <div className="experience-box">
            <h2>50</h2>
            <p>
              Years of <br />
              Experience
            </p>
          </div>
        </div>

        <div className="about-content">
          <span className="about-tag">ABOUT US</span>

          <h2>
            We Care For Your <br />
            Dental Health
          </h2>

          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc gravida sodales. Sed at felis a enim efficitur efficitur. In hac habitasse platea dictumst. Donec ac ligula id nunc efficitur convallis.
          </p>

        </div>

      </div>
    </section>
  );
}