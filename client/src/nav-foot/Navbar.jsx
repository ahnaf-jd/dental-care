import { useState } from "react";
import { FaBars, FaTimes, FaTooth } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <FaTooth className="logo-icon" />
        <h1>Dental Care</h1>
      </div>

      {/* Desktop Navigation */}
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/">Services</a></li>
        <li><a href="/">Blog</a></li>
        <li><a href="/">Contact</a></li>
      </ul>

      {/* Desktop Button */}
      <button className="appointment-btn">
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
        <a href="/">Home</a>
        <a href="/">Services</a>
        <a href="/">Blog</a>
        <a href="/">Contact</a>

        <button className="mobile-btn">
          BOOK APPOINTMENT
        </button>
      </div>
    </nav>
  );
}

export default Navbar;