import "./about-us.css";
import clinicimg from "../assets/clinic.jpg";

export default function AboutUs() {
  return (
    <section className="about-us">
      <div className="about-container">
        {/* Left Side - Images */}
        <div className="about-left">
          <div className="about-images">
            <div className="image-card large">
              <img src={clinicimg} alt="Dental clinic" />
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="about-right">
          <span className="about-tag">ABOUT US</span>
          
          <h2>Your Trusted Dental Care</h2>
          
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae libero non enim placerat eleifend aliquam erat volutpat. Curabitur diam ex, dapibus purus sapien, cursus sed nisl tristique, commodo gravida lectus non.
          </p>
        </div>
        </div>
    </section>
  );
}
