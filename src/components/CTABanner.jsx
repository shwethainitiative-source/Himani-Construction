import React from 'react';
import { Link } from 'react-router-dom';
import './CTABanner.css';

const CTABanner = () => {
  return (
    <section className="cta-banner">
      <div className="cta-image-wrapper" style={{ backgroundImage: "url('/images/cta_building_new.jpg')" }}>
      </div>
      <div className="black-corner"></div>
      <div className="cta-content">
        <div className="cta-text-wrapper">
          <p className="cta-subtitle">Talk to our experts</p>
          <h2 className="cta-title">Need Our Services?</h2>
        </div>
        <Link to="/contact#contact-form" className="cta-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>Get in Touch</Link>
      </div>
    </section>
  );
};

export default CTABanner;
