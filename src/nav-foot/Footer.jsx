import "./Footer.css";
import {
  FaTooth,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-col">
          <div className="footer-logo">
            <FaTooth className="tooth-icon" />
            <h2>Decare.</h2>
          </div>

          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            euismod, nisl eget consectetur sagittis, nisl nunc consectetur nisi,
            euismod aliquam nisl nunc euismod nisi.
          </p>

          <div className="footer-info">
            <div className="icon-box">
              <FaClock />
            </div>

            <div>
              <span>Monday - Saturday:</span>
              <h4>9:00am - 10:00pm</h4>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h3>Other Links</h3>

          <ul>
            <li>+ Home</li>
            <li>+ Services</li>
            <li>+ Contact</li>
            <li>+ Blog</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h3>Our Services</h3>

          <ul>
            <li>+ Root Canal</li>
            <li>+ Alignment Teeth</li>
            <li>+ Cosmetic Teeth</li>
            <li>+ Oral Hygiene</li>
            <li>+ Live Advisory</li>
            <li>+ Cavity Inspection</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h3>Contact Us</h3>

          <div className="contact-item">
            <div className="icon-box">
              <FaMapMarkerAlt />
            </div>

            <p>
            Savar, Dhaka, Bangladesh
            </p>
          </div>

          <div className="contact-item">
            <div className="icon-box">
              <FaPhoneAlt />
            </div>

            <p>
              +880 1600000000
            </p>
          </div>

          <div className="contact-item">
            <div className="icon-box">
              <FaEnvelope />
            </div>

            <p>
              info@example.com
              <br />
              help@example.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}

      <div className="footer-bottom">

        <p>
          Copyright © 2026 Dental. All rights reserved.
        </p>

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