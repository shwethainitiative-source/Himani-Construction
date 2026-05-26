import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <Link to="/">
            <img src="/images/logo.png" alt="Himani Construction & Interiors Logo" className="logo" />
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className="nav-link">Services</NavLink>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link" style={{ cursor: 'pointer' }}>Projects ▾</span>
              <ul className="dropdown-menu">
                <li><NavLink to="/projects/residential" className="dropdown-link">Residential Construction</NavLink></li>
                <li><NavLink to="/projects/commercial" className="dropdown-link">Commercial Construction</NavLink></li>
                <li><NavLink to="/projects/interior" className="dropdown-link">Interior Design</NavLink></li>
                <li><NavLink to="/projects/renovation" className="dropdown-link">Renovation & Remodeling</NavLink></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className="nav-link">Blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
