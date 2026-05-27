import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../utils/db';
import './ProjectPages.css';

const Commercial = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const filtered = db.getProjects().filter(p => p.category === 'commercial');
    setProjects(filtered);
  }, []);

  return (
    <main className="project-detail-page">
      {/* Header */}
      <section className="project-page-header">
        <div className="pp-header-content">
          <h1>Commercial Construction</h1>
          <p>Delivering robust, scalable, and modern workspaces built for business growth.</p>
        </div>
      </section>

      {/* Overview */}
      <section className="project-overview container">
        <h2>Building the Foundations of Business</h2>
        <div className="overview-text">
          <p>Our commercial construction division specializes in creating environments that foster productivity, impress clients, and stand the test of time. From corporate headquarters and retail centers to specialized industrial facilities, we manage complex commercial projects with strict adherence to timelines, budgets, and safety regulations. We ensure your business experiences minimal downtime during the build phase.</p>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="portfolio-gallery container">
        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '50px 0', color: 'var(--color-text-muted)', width: '100%', fontSize: '1.1rem' }}>
            No commercial projects published yet. Check back soon!
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
          <h2>Our Commercial Process</h2>
          <div className="process-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Feasibility</h3>
              <p>Analyzing site viability, zoning laws, and budget forecasting for the commercial property.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Planning</h3>
              <p>Engineering robust structural plans and coordinating with local authorities for permits.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Execution</h3>
              <p>Deploying large-scale teams to execute the build while maintaining strict safety protocols.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Launch</h3>
              <p>Final inspections, compliance certifications, and handing over a business-ready facility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="project-cta">
        <div className="container">
          <h2>Planning a Commercial Project?</h2>
          <p>Let's discuss how we can build the perfect space for your business.</p>
          <Link to="/contact" className="cta-button">Request a Proposal</Link>
        </div>
      </section>
    </main>
  );
};

export default Commercial;
