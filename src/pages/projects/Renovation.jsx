import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabaseService } from '../../utils/supabaseService';
import './ProjectPages.css';

const Renovation = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const allProj = await supabaseService.getProjects();
        const filtered = allProj.filter(p => p.category === 'renovation');
        setProjects(filtered);
      } catch (err) {
        console.error("Error loading renovation projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <main className="project-category-page">
      {/* Header Banner */}
      <div className="project-page-banner-container">
        <img 
          src="/images/luxury_renovation.png" 
          alt="Quality-Driven Renovation & Remodeling" 
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
            No renovation projects published yet. Check back soon!
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
