import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectPages.css';

const Interior = () => {
  return (
    <main className="project-detail-page">
      {/* Header */}
      <section className="project-page-header">
        <div className="pp-header-content">
          <h1>Interior Design</h1>
          <p>Transforming empty spaces into inspiring environments tailored to your taste.</p>
        </div>
      </section>

      {/* Overview */}
      <section className="project-overview container">
        <h2>Aesthetics Meeting Functionality</h2>
        <div className="overview-text">
          <p>Our interior design team believes that the spaces we inhabit shape our daily lives. Whether it's a cozy residential living room or a dynamic corporate office, we blend color psychology, spatial planning, and premium material selection to create interiors that are both stunning and highly functional. We handle everything from conceptual mood boards to final furniture placement.</p>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="portfolio-gallery container">
        <div className="gallery-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="gallery-item">
              <img src="/images/service-img-placeholder.png" alt={`Interior Project ${item}`} />
              <div className="gallery-overlay">
                <h4>Modern Elegance {item}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="our-process">
        <div className="container">
          <h2>Our Design Process</h2>
          <div className="process-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Discovery</h3>
              <p>Understanding your style preferences, practical needs, and vision for the space.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Concept Design</h3>
              <p>Presenting mood boards, color palettes, 3D renderings, and spatial layouts.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Procurement</h3>
              <p>Sourcing premium materials, custom furniture, lighting, and décor elements.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Styling</h3>
              <p>Executing the design plan and meticulously styling the space to perfection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="project-cta">
        <div className="container">
          <h2>Ready to Transform Your Space?</h2>
          <p>Book a consultation with our award-winning interior designers.</p>
          <Link to="/contact" className="cta-button">Start Your Design Journey</Link>
        </div>
      </section>
    </main>
  );
};

export default Interior;
