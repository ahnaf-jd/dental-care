import "./footer.css";
import {
  FaTooth,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useSiteContent } from "../context/SiteContentContext";

function Footer() {
  const { footer, services } = useSiteContent();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <div className="footer-logo">
            <FaTooth className="tooth-icon" />
            <h2>{footer.brandName}</h2>
          </div>

          <p>{footer.description}</p>

          <div className="footer-info">
            <div className="icon-box">
              <FaClock />
            </div>

            <div>
              <span>{footer.hoursLabel}</span>
              <h4>{footer.hours}</h4>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h3>Other Links</h3>

          <ul>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
              >
                + Home
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
              >
                + Services
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                + Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("blog");
                }}
              >
                + Blog
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Our Services</h3>

          <ul>
            {services.items.map((item, index) => (
              <li key={index}>+ {item.title}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>

          <div className="contact-item">
            <div className="icon-box">
              <FaMapMarkerAlt />
            </div>

            <p>{footer.address}</p>
          </div>

          <div className="contact-item">
            <div className="icon-box">
              <FaPhoneAlt />
            </div>

            <p>{footer.phone}</p>
          </div>

          <div className="contact-item">
            <div className="icon-box">
              <FaEnvelope />
            </div>

            <p>
              {footer.emails.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{footer.copyright}</p>

        <div className="social-icons">
          <a href="/">
            <FaFacebookF />
          </a>

          <a href="/">
            <FaInstagram />
          </a>

          <a href="/">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
