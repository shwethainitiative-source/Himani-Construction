import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabaseService } from '../../utils/supabaseService';
import './ProjectPages.css';

const Residential = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const allProj = await supabaseService.getProjects();
        const filtered = allProj.filter(p => p.category === 'residential');
        setProjects(filtered);
      } catch (err) {
        console.error("Error loading residential projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <main className="project-detail-page">
      {/* Header Banner */}
      <div className="project-page-banner-container">
        <img 
          src="/images/luxury_residential.jpg" 
          alt="Luxury Residential Construction" 
          className="project-page-banner-img" 
        />
      </div>


      {/* Portfolio Gallery */}
      <section className="portfolio-gallery container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 0', flexDirection: 'column', gap: '15px', width: '100%' }}>
            <div style={{
              border: '3px solid rgba(55, 26, 16, 0.1)',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              borderLeftColor: '#371A10',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : projects.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '50px 0', color: 'var(--color-text-muted)', width: '100%', fontSize: '1.1rem' }}>
            No residential projects published yet. Check back soon!
          </p>
        ) : (
          <div className="gallery-grid">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="gallery-item"
                onClick={() => setSelectedProject(project)}
              >
                <img src={project.img} alt={project.title} />
                <div className="gallery-overlay">
                  <h4>{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Preview */}
        {selectedProject && (
          <div className="lightbox-overlay" onClick={() => setSelectedProject(null)}>
            <button className="lightbox-close" onClick={() => setSelectedProject(null)}>×</button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedProject.img} alt={selectedProject.title} className="lightbox-image" />
              <div className="lightbox-caption">
                <h3>{selectedProject.title}</h3>
                {selectedProject.description && <p>{selectedProject.description}</p>}
              </div>
            </div>
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
