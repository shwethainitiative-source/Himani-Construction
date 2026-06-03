import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabaseService } from '../../utils/supabaseService';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'residential': return 'Residential Construction';
      case 'commercial': return 'Commercial Construction';
      case 'interior': return 'Interior Design';
      case 'renovation': return 'Renovation & Remodeling';
      default: return category;
    }
  };

  const getCategoryPath = (category) => {
    switch (category) {
      case 'residential': return '/projects/residential';
      case 'commercial': return '/projects/commercial';
      case 'interior': return '/projects/interior';
      case 'renovation': return '/projects/renovation';
      default: return '/';
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const activeProject = await supabaseService.getProject(id);
        
        if (activeProject) {
          setProject(activeProject);
          
          // Get up to 3 related projects in the same category
          const allProjects = await supabaseService.getProjects();
          const related = allProjects
            .filter(p => p.category === activeProject.category && p.id.toString() !== id)
            .slice(0, 3);
          setRelatedProjects(related);
        }
      } catch (err) {
        console.error("Error fetching project details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <main className="project-detail-page loading-state">
        <div className="spinner"></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="project-detail-page error-state">
        <div className="container text-center">
          <h2>Project Not Found</h2>
          <p>We couldn't find the project you were looking for. It may have been archived or removed.</p>
          <Link to="/" className="back-link-btn">← Back to Homepage</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="project-detail-page">
      {/* Top Breadcrumb Navigation */}
      <div className="project-detail-nav container">
        <Link to="/" className="back-link">Home</Link>
        <span className="separator">/</span>
        <Link to={getCategoryPath(project.category)} className="back-link">
          {getCategoryLabel(project.category)}
        </Link>
        <span className="separator">/</span>
        <span className="active-breadcrumb">{project.title}</span>
      </div>

      {/* Main Header */}
      <header className="project-header container">
        <div className="project-meta">
          <span className="project-category">{getCategoryLabel(project.category)}</span>
          {project.location && (
            <>
              <span className="dot">•</span>
              <span className="project-location-meta">📍 {project.location}</span>
            </>
          )}
          <span className="dot">•</span>
          <span className="project-date-meta">Completed: {project.date}</span>
        </div>
      </header>

      {/* Project Hero Image */}
      <div className="project-cover-container container">
        <img src={project.img} alt={project.title} className="project-cover-img" />
      </div>

      {/* Details Grid layout */}
      <div className="project-layout container">
        <div className="project-main-content">
          <section className="project-description">
            <h2>About the Project</h2>
            {project.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        </div>

        <aside className="project-sidebar">
          <div className="project-facts-card">
            <h3>Project Overview</h3>
            <ul className="facts-list">
              <li>
                <span className="fact-label">Category</span>
                <span className="fact-value">{getCategoryLabel(project.category)}</span>
              </li>
              {project.location && (
                <li>
                  <span className="fact-label">Location</span>
                  <span className="fact-value">{project.location}</span>
                </li>
              )}
              <li>
                <span className="fact-label">Completion Date</span>
                <span className="fact-value">{project.date}</span>
              </li>
              <li>
                <span className="fact-label">Status</span>
                <span className="fact-value status-completed">Completed</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ProjectDetail;
