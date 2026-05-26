import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">WE BUILD<br/>YOUR DREAMS</h1>
          <p className="hero-subtitle">Residential | Commercial | Interior Design</p>
          <Link to="/contact#contact-form" className="btn-primary" style={{ display: 'inline-block' }}>Get In Touch</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
