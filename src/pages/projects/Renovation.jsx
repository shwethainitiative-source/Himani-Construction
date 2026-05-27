import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../utils/db';
import './ProjectPages.css';

const Renovation = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const filtered = db.getProjects().filter(p => p.category === 'renovation');
    setProjects(filtered);
  }, []);

  return (
    <main className="project-detail-page">
      {/* Header */}
      <section className="project-page-header">
        <div className="pp-header-content">
          <h1>Renovation & Remodeling</h1>
          <p>Breathing new life into existing structures with modern upgrades.</p>
        </div>
      </section>

      {/* Overview */}
      <section className="project-overview container">
        <h2>Revitalize Your Property</h2>
        <div className="overview-text">
          <p>Remodeling requires a delicate touch and a deep understanding of existing structures. Whether you're looking to update a dated kitchen, add a new wing to your home, or completely gut and refurbish an old commercial property, our renovation experts handle the complexities of structural modifications flawlessly. We increase your property's value while preserving its unique character.</p>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="portfolio-gallery container">
        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '50px 0', color: 'var(--color-text-muted)', width: '100%', fontSize: '1.1rem' }}>
            No renovation projects published yet. Check back soon!
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
          <h2>Our Renovation Process</h2>
          <div className="process-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Assessment</h3>
              <p>Evaluating the existing structure for load-bearing constraints and upgrade potential.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Redesign</h3>
              <p>Creating plans that seamlessly integrate new additions or layouts with the old structure.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Demolition & Build</h3>
              <p>Safe, contained teardowns followed by expert reconstruction and systems upgrades.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Finishing</h3>
              <p>Applying modern finishes that completely transform the look and feel of the property.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="project-cta">
        <div className="container">
          <h2>Time for an Upgrade?</h2>
          <p>Discuss your remodeling ideas with our expert renovation team.</p>
          <Link to="/contact" className="cta-button">Get a Renovation Estimate</Link>
        </div>
      </section>
    </main>
  );
};

export default Renovation;
