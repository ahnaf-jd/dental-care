import { useState } from "react";
import { FaBars, FaTimes, FaTooth } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleBookAppointment = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
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
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* Desktop Button */}
      <button className="appointment-btn" onClick={handleBookAppointment}>
        BOOK APPOINTMENT
      </button>

      {/* Mobile Menu Button */}
      <div
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="#contact">Contact</a></li>

        <button className="mobile-btn" onClick={handleBookAppointment}>
          BOOK APPOINTMENT
        </button>
      </div>
    </nav>
  );
}

export default Navbar;