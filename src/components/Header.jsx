import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <Link to="/" onClick={closeMenu}>
            <img src="/images/logo.png" alt="Himani Construction & Interiors Logo" className="logo" />
          </Link>
        </div>

        {/* Hamburger Menu Toggle Button */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={closeMenu} end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" onClick={closeMenu}>About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className="nav-link" onClick={closeMenu}>Services</NavLink>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link" style={{ cursor: 'pointer' }}>Projects ▾</span>
              <ul className="dropdown-menu">
                <li><NavLink to="/projects/residential" className="dropdown-link" onClick={closeMenu}>Residential Construction</NavLink></li>
                <li><NavLink to="/projects/commercial" className="dropdown-link" onClick={closeMenu}>Commercial Construction</NavLink></li>
                <li><NavLink to="/projects/interior" className="dropdown-link" onClick={closeMenu}>Interior Design</NavLink></li>
                <li><NavLink to="/projects/renovation" className="dropdown-link" onClick={closeMenu}>Renovation & Remodeling</NavLink></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className="nav-link" onClick={closeMenu}>Blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link" onClick={closeMenu}>Contact Us</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
