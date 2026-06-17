import { useCallback, useEffect, useState } from "react";
import { FaBars, FaTimes, FaTooth } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  }, []);

  // If we navigated to '/', and the URL contains a hash (e.g. /#home), scroll to it.
  useEffect(() => {
    if (location.pathname !== "/") return;
    if (!location.hash) return;

    const id = location.hash.replace(/^#/, "");
    // Delay ensures DOM is rendered before trying to scroll.
    const t = window.setTimeout(() => scrollToSection(id), 50);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash, scrollToSection]);

  const goToSection = useCallback(
    (id) => {
      setMenuOpen(false);

      // If already on home page, just scroll.
      if (location.pathname === "/") {
        scrollToSection(id);
        return;
      }

      // Otherwise navigate to home with hash.
      navigate(`/${""}#${id}`);
    },
    [location.pathname, navigate, scrollToSection]
  );

  const handleBookAppointment = () => {
    goToSection("contact");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <FaTooth className="logo-icon" />
        <h1>Dental Care</h1>
      </div>

      {/* Desktop Navigation */}
      <ul className="nav-links">
        <li>
          <a href="#home" className="nav-link" onClick={() => goToSection("home")}>
            Home
          </a>
        </li>
        <li>
          <a href="#services" className="nav-link" onClick={() => goToSection("services")}>
            Services
          </a>
        </li>
        <li>
          <a href="#gallery" className="nav-link" onClick={() => goToSection("gallary")}>
            Gallery
          </a>
        </li>
        <li>
          <a href="/blogs" className="nav-link" onClick={() => goToSection("blogs")}>
            Blogs
          </a>
        </li>
        <li>
          <a href="#contact" className="nav-link" onClick={() => goToSection("contact")}>
            Contact Us
          </a>
        </li>
      </ul>

      {/* Desktop Button */}
      <button className="appointment-btn" onClick={handleBookAppointment}>
        BOOK APPOINTMENT
      </button>

      {/* Mobile Menu Button */}
      <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <li>
          <a href="#home" className="nav-link" onClick={() => goToSection("home")}>
            Home
          </a>
        </li>
        <li>
          <a href="#services" className="nav-link" onClick={() => goToSection("services")}>
            Services
          </a>
        </li>
        <li>
          <a href="#gallery" className="nav-link" onClick={() => goToSection("Gallery")}>
            Gallery
          </a>
        </li>
        <li>
          <a href="/blogs" className="nav-link" onClick={() => goToSection("blogs")}>
            Blogs
          </a>
        </li>
        <li>
          <a href="#contact" className="nav-link" onClick={() => goToSection("contact")}>
            Contact Us
          </a>
        </li>

        <button className="mobile-btn" onClick={handleBookAppointment}>
          BOOK APPOINTMENT
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

