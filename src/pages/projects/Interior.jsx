import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabaseService } from '../../utils/supabaseService';
import './ProjectPages.css';

const Interior = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const allProj = await supabaseService.getProjects();
        const filtered = allProj.filter(p => p.category === 'interior');
        setProjects(filtered);
      } catch (err) {
        console.error("Error loading interior projects:", err);
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
          src="/images/luxury_interior.jpg" 
          alt="High-End Interior Design" 
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
            No interior design projects published yet. Check back soon!
          </p>
        ) : (
          <div className="gallery-grid">
            {projects.map((project) => (
              <Link 
                to={`/project/${project.id}`}
                key={project.id} 
                className="gallery-item"
              >
                <img src={project.img} alt={project.title} />
                <span className="gallery-location">
                  {project.location || 'Bangalore'}
                </span>
              </Link>
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
