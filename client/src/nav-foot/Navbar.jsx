import { useState } from "react";
import { FaBars, FaTimes, FaTooth } from "react-icons/fa";
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
        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>Home</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>Services</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("blog"); }}>Blog</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Contact</a></li>
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
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>Home</a>
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>Services</a>
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("blog"); }}>Blog</a>
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Contact</a>

        <button className="mobile-btn" onClick={handleBookAppointment}>
          BOOK APPOINTMENT
        </button>
      </div>
    </nav>
  );
}

export default Navbar;