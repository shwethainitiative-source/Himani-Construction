import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../utils/db';
import './ProjectPages.css';

const Residential = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const filtered = db.getProjects().filter(p => p.category === 'residential');
    setProjects(filtered);
  }, []);

  return (
    <main className="project-detail-page">
      {/* Header */}
      <section className="project-page-header">
        <div className="pp-header-content">
          <h1>Residential Construction</h1>
          <p>Building your dream home with unparalleled craftsmanship and attention to detail.</p>
        </div>
      </section>

      {/* Overview */}
      <section className="project-overview container">
        <h2>Creating Homes, Not Just Houses</h2>
        <div className="overview-text">
          <p>At Himani Construction, residential building is where our passion truly shines. We understand that a home is more than just bricks and mortar; it's a sanctuary for you and your family. From modern smart-homes to classic architectural marvels, our team works closely with you to bring your exact vision to life, ensuring every corner reflects your personal style while adhering to the highest structural standards.</p>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="portfolio-gallery container">
        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '50px 0', color: 'var(--color-text-muted)', width: '100%', fontSize: '1.1rem' }}>
            No residential projects published yet. Check back soon!
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
          <h2>Our Residential Process</h2>
          <div className="process-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Consultation</h3>
              <p>We start by understanding your lifestyle needs, design preferences, and budget constraints.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Architectural Design</h3>
              <p>Our experts draft blueprints, 3D models, and finalize materials for your approval.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Construction</h3>
              <p>Our skilled craftsmen bring the plans to life with rigorous quality control at every phase.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Handover</h3>
              <p>A thorough final walkthrough ensures every detail is perfect before handing you the keys.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="project-cta">
        <div className="container">
          <h2>Ready to Build Your Dream Home?</h2>
          <p>Schedule a free consultation with our residential experts today.</p>
          <Link to="/contact" className="cta-button">Get a Quote</Link>
        </div>
      </section>
    </main>
  );
};

export default Residential;
