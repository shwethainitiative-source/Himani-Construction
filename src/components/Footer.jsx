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
            <a href="https://www.facebook.com/share/1NviWYgbKa/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/ashok_6387?utm_source=qr&igsh=azh1a3FrejQ4b2Jw" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
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
            <li style={{ color: 'var(--color-white)', fontWeight: '600' }}>Head Office:</li>
            <li style={{ lineHeight: '1.5' }}>
              106, 4th Cross, 6th Main,<br />
              Balaji Layout / Bhadrappa Layout,<br />
              Bangalore - 560094
            </li>
            <li>Phone: +91 70192 45628, +91 86604 59395</li>
            <li>Email: himaniconstruction@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Himani Construction & Interiors. All Rights Reserved.</p>
          <p className="developer-credit">
            Developed by <a href="https://shwethainitiative.com" target="_blank" rel="noopener noreferrer">Shwetha Initiative</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
