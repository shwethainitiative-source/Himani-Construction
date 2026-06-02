import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabaseService } from '../../utils/supabaseService';
import './ProjectPages.css';

const Commercial = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const allProj = await supabaseService.getProjects();
        const filtered = allProj.filter(p => p.category === 'commercial');
        setProjects(filtered);
      } catch (err) {
        console.error("Error loading commercial projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
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
            No commercial projects published yet. Check back soon!
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
