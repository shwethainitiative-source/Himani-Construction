import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';
import './Projects.css';

const Projects = () => {
  const navigate = useNavigate();
  const [projectsData, setProjectsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dragStartX, setDragStartX] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [entranceFinished, setEntranceFinished] = useState(false);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  // Mark entrance animation as finished after 2.2s to clean up transition-delays
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setEntranceFinished(true);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await supabaseService.getProjects();
        
        // Filter by featured/selected flag, limit to 10. Fallback to first 10 projects if no selection
        const featured = data.filter(p => p.featured).slice(0, 10);
        const finalProjects = featured.length > 0 ? featured : data.slice(0, 10);
        
        setProjectsData(finalProjects);
        if (finalProjects.length > 0) {
          // Set center active index
          setActiveIndex(Math.min(2, Math.floor(finalProjects.length / 2)));
        }
      } catch (err) {
        console.error("Error fetching projects from Supabase:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // IntersectionObserver to trigger smooth entrance animation when projects come into view
  useEffect(() => {
    if (loading || projectsData.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [loading, projectsData.length]);

  // Automatic transition every 2 seconds (resets timer if activeIndex or pause state changes)
  useEffect(() => {
    if (projectsData.length <= 1 || isPaused || lightboxIndex !== null) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [projectsData.length, isPaused, activeIndex]);

  const handlePrev = () => {
    if (projectsData.length === 0) return;
    setActiveIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length);
  };

  const handleNext = () => {
    if (projectsData.length === 0) return;
    setActiveIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };

  const handleDragStart = (e) => {
    if (e.type === 'touchstart') {
      setDragStartX(e.touches[0].clientX);
    } else {
      setDragStartX(e.clientX);
    }
    setIsPaused(true);
  };

  const handleDragEnd = (e) => {
    if (dragStartX === null || projectsData.length === 0) return;
    
    let endX;
    if (e.type === 'touchend' || e.type === 'touchcancel') {
      endX = e.changedTouches[0].clientX;
    } else {
      endX = e.clientX;
    }
    
    const diff = dragStartX - endX;
    const N = projectsData.length;
    
    if (diff > 50) {
      setActiveIndex((activeIndex + 1) % N); // swiped left -> show next
    } else if (diff < -50) {
      setActiveIndex((activeIndex - 1 + N) % N); // swiped right -> show prev
    }
    setDragStartX(null);
    setIsPaused(false);
  };

  const handleCardClick = (index) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    } else {
      // Navigate to the project details page
      navigate(`/project/${projectsData[index].id}`);
    }
  };

  const getTransform = (offset) => {
    const direction = Math.sign(offset);
    const absOffset = Math.abs(offset);
    
    // Center card highlighted and slightly zoomed, side cards progressively smaller
    const scale = absOffset === 0 ? 1.05 : 1 - (absOffset * 0.15);
    
    // Translate X to create stacked effect
    let translateX = 0;
    if (absOffset === 1) translateX = 60;
    else if (absOffset === 2) translateX = 110;
    else if (absOffset > 2) translateX = 110 + (absOffset - 2) * 40;
    
    return `translateX(${direction * translateX}%) scale(${scale})`;
  };

  if (loading) {
    return (
      <section className="projects">
        <div className="container">
          <h4 className="projects-subtitle">OUR PROJECTS</h4>
          <h2 className="projects-title">Our latest construction<br/>and design work</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
            flexDirection: 'column',
            gap: '15px'
          }}>
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
        </div>
      </section>
    );
  }

  if (projectsData.length === 0) {
    return (
      <section className="projects">
        <div className="container">
          <h4 className="projects-subtitle">OUR PROJECTS</h4>
          <h2 className="projects-title">Our latest construction<br/>and design work</h2>
          <p style={{ marginTop: '30px', color: 'var(--color-dark-brown)', opacity: 0.6 }}>
            No projects published yet. Please check back later!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="projects" ref={sectionRef}>
      <div className="container">
        <h4 className="projects-subtitle">OUR PROJECTS</h4>
        <h2 className="projects-title">Our latest construction<br/>and design work</h2>
      </div>
      
      <div 
        className="projects-carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ position: 'relative', width: '100%' }}
      >
        <div 
          className="coverflow-wrapper"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          ref={trackRef}
        >
          {/* Elegant Left Navigation Arrow */}
          <button 
            className="coverflow-nav-btn prev" 
            onClick={handlePrev}
            aria-label="Previous Project"
          >
            ‹
          </button>

          <div className={`coverflow-track ${isInView ? 'in-view' : ''} ${entranceFinished ? 'entrance-finished' : ''}`}>
            {projectsData.map((project, index) => {
              const N = projectsData.length;
              let offset = (index - activeIndex) % N;
              if (offset < 0) offset += N;
              if (offset > Math.floor(N / 2)) offset -= N;
              
              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);
              
              return (
                <div 
                  className="coverflow-card-entrance"
                  key={project.id}
                  data-offset={offset}
                  style={{
                    transform: getTransform(offset),
                    zIndex: 10 - absOffset,
                    opacity: absOffset > 2 ? 0 : 1, // Hide items too far away
                    pointerEvents: absOffset > 2 ? 'none' : 'auto',
                  }}
                >
                  <div 
                    className={`coverflow-card ${isCenter ? 'active' : ''}`}
                    onClick={() => handleCardClick(index)}
                  >
                    <img src={project.img} alt={project.title} className="coverflow-image" />
                    
                    {/* Dynamic blur/dark overlay for side images */}
                    <div 
                      className="coverflow-blur-overlay"
                      style={{ opacity: isCenter ? 0 : absOffset * 0.4 }}
                    />
                    
                    {/* Text overlay only fully visible on active center card */}
                    <div className="coverflow-text-overlay" style={{ opacity: isCenter ? 1 : 0 }}>
                      <h3>{project.title}</h3>
                      {project.description && (
                        <p className="coverflow-card-desc">{project.description}</p>
                      )}
                      <span className="coverflow-card-cta">View Details →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Elegant Right Navigation Arrow */}
          <button 
            className="coverflow-nav-btn next" 
            onClick={handleNext}
            aria-label="Next Project"
          >
            ›
          </button>
        </div>

        {/* Premium Pagination Dots */}
        <ul className="coverflow-dots">
          {projectsData.map((_, index) => (
            <li 
              key={index}
              className={`coverflow-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to project slide ${index + 1}`}
            />
          ))}
        </ul>
      </div>
      
      <div className="container" style={{ marginTop: '30px' }}>
        <p style={{ color: 'var(--color-dark-brown)', opacity: 0.6, fontSize: '0.9rem' }}>
          ← Swipe, use arrows, or click dots to explore (click center card to view details) →
        </p>
      </div>
    </section>
  );
};

export default Projects;
