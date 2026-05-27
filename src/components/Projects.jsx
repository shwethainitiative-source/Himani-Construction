import React, { useState, useRef, useEffect } from 'react';
import { db } from '../utils/db';
import './Projects.css';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const data = db.getProjects();
    setProjectsData(data);
    if (data.length > 0) {
      // Set center active index
      setActiveIndex(Math.min(2, Math.floor(data.length / 2)));
    }
  }, []);

  const handleDragStart = (e) => {
    if (e.type === 'touchstart') {
      setDragStartX(e.touches[0].clientX);
    } else {
      setDragStartX(e.clientX);
    }
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
  };

  const handleCardClick = (index) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };

  const getTransform = (offset) => {
    const direction = Math.sign(offset);
    const absOffset = Math.abs(offset);
    
    // Scale goes down by 0.15 each step
    const scale = 1 - (absOffset * 0.15);
    
    // Translate X to create stacked effect
    let translateX = 0;
    if (absOffset === 1) translateX = 60;
    else if (absOffset === 2) translateX = 110;
    else if (absOffset > 2) translateX = 110 + (absOffset - 2) * 40;
    
    return `translateX(${direction * translateX}%) scale(${scale})`;
  };

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
    <section className="projects">
      <div className="container">
        <h4 className="projects-subtitle">OUR PROJECTS</h4>
        <h2 className="projects-title">Our latest construction<br/>and design work</h2>
      </div>
      
      <div 
        className="coverflow-wrapper"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        ref={trackRef}
      >
        <div className="coverflow-track">
          {projectsData.map((project, index) => {
            const N = projectsData.length;
            let offset = (index - activeIndex) % N;
            if (offset < 0) offset += N;
            if (offset > Math.floor(N / 2)) offset -= N;
            
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);
            
            return (
              <div 
                className={`coverflow-card ${isCenter ? 'active' : ''}`}
                key={project.id}
                onClick={() => handleCardClick(index)}
                style={{
                  transform: getTransform(offset),
                  zIndex: 10 - absOffset,
                  opacity: absOffset > 2 ? 0 : 1, // Hide items too far away
                  pointerEvents: absOffset > 2 ? 'none' : 'auto',
                }}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="container" style={{ marginTop: '30px' }}>
        <p style={{ color: 'var(--color-dark-brown)', opacity: 0.6, fontSize: '0.9rem' }}>
          ← Swipe or click cards to explore →
        </p>
      </div>
    </section>
  );
};

export default Projects;
