import { useCallback, useEffect, useState } from "react";
import { FaBars, FaTimes, FaTooth } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

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
          <button type="button" className="nav-link" onClick={() => goToSection("home")}>
            Home
          </button>
        </li>
        <li>
          <button type="button" className="nav-link" onClick={() => goToSection("services")}>
            Services
          </button>
        </li>
        <li>
          <button type="button" className="nav-link" onClick={() => goToSection("gallary")}>
            Gallary
          </button>
        </li>
        <li>
          <button type="button" className="nav-link" onClick={() => goToSection("blog")}>
            Blog
          </button>
        </li>
        <li>
          <button type="button" className="nav-link" onClick={() => goToSection("contact")}>
            Contact
          </button>
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
          <button type="button" className="nav-link" onClick={() => goToSection("home")}>
            Home
          </button>
        </li>
        <li>
          <button type="button" className="nav-link" onClick={() => goToSection("services")}>
            Services
          </button>
        </li>
        <li>
          <button type="button" className="nav-link" onClick={() => goToSection("blog")}>
            Blog
          </button>
        </li>
        <li>
          <button type="button" className="nav-link" onClick={() => goToSection("contact")}>
            Contact
          </button>
        </li>

        <button className="mobile-btn" onClick={handleBookAppointment}>
          BOOK APPOINTMENT
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

