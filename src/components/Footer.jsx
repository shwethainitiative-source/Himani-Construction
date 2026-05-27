import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <img src="/images/logo.png" alt="Himani Construction Logo" className="footer-logo" />
          <p className="footer-desc">
            Building your dreams into reality with precision, quality, and modern design.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon"><span>FB</span></a>
            <a href="#" className="social-icon"><span>TW</span></a>
            <a href="#" className="social-icon"><span>IG</span></a>
            <a href="#" className="social-icon"><span>LI</span></a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects/residential">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><Link to="/projects/residential">Residential Construction</Link></li>
            <li><Link to="/projects/commercial">Commercial Construction</Link></li>
            <li><Link to="/projects/interior">Interior Design</Link></li>
            <li><Link to="/projects/renovation">Renovation & Remodeling</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contact Details</h4>
          <ul className="footer-links">
            <li>Bengaluru Himanai</li>
            <li>Phone: +91 70192 45628, +91 86604 59395</li>
            <li>Email: himaniconstructionsandinterior@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Himani Construction & Interiors. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
