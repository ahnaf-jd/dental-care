import aboutImg from "../assets/clinic.jpg";
import "./about-us.css";
import { useSiteContent } from "../context/SiteContentContext";
import { mediaUrl } from "../services/contentApi";

export default function About() {
  const { about } = useSiteContent();
  const image = mediaUrl(about.image) || aboutImg;

  return (
    <section className="about">
      <div className="about-container">
        <div className="about-image">
          <img src={image} alt="Dental Care" />

          <div className="experience-box">
            <h2>{about.experienceYears}</h2>
            <p>
              Years of <br />
              Experience
            </p>
          </div>
        </div>

        <div className="about-content">
          <span className="about-tag">{about.tag}</span>

          <h2>
            {about.titleLine1} <br />
            {about.titleLine2}
          </h2>

          <p>{about.description}</p>
        </div>
      </div>
    </section>
  );
}
