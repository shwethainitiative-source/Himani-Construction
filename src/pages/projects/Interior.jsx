import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../utils/db';
import './ProjectPages.css';

const Interior = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const filtered = db.getProjects().filter(p => p.category === 'interior');
    setProjects(filtered);
  }, []);

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
        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '50px 0', color: 'var(--color-text-muted)', width: '100%', fontSize: '1.1rem' }}>
            No interior design projects published yet. Check back soon!
          </p>
        ) : (
          <div className="gallery-grid">
            {projects.map((project) => (
              <div key={project.id} className="gallery-item">
                <img src={project.img} alt={project.title} />
                <div className="gallery-overlay">
                  <h4>{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
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
