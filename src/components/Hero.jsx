import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';
import './Hero.css';

// Premium default fallback slides
const DEFAULT_SLIDES = [
  {
    id: 'default-1',
    slot_number: 1,
    media_url: '/images/hero_bg.png',
    media_type: 'image',
    title: 'WE BUILD YOUR DREAMS',
    subtitle: 'Residential | Commercial | Interior Design',
    link_text: 'Get In Touch',
    link_url: '/contact#contact-form'
  },
  {
    id: 'default-2',
    slot_number: 2,
    media_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80',
    media_type: 'image',
    title: 'PREMIUM INTERIOR DESIGN',
    subtitle: 'Crafting beautiful, functional living spaces tailored for you.',
    link_text: 'View Interior Projects',
    link_url: '/projects/interior'
  },
  {
    id: 'default-3',
    slot_number: 3,
    media_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    media_type: 'image',
    title: 'COMMERCIAL CONSTRUCTION',
    subtitle: 'Building high-performance corporate workspaces with structural integrity.',
    link_text: 'View Commercial Portfolios',
    link_url: '/projects/commercial'
  }
];

const Hero = () => {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch slides from database
  useEffect(() => {
    const loadHeroSlides = async () => {
      try {
        const dbSlides = await supabaseService.getHeroSlides();
        if (dbSlides && dbSlides.length > 0) {
          const mergedSlides = [...DEFAULT_SLIDES];
          dbSlides.forEach((slide) => {
            const slotIdx = slide.slot_number - 1;
            if (slotIdx >= 0 && slotIdx < 3) {
              mergedSlides[slotIdx] = {
                ...slide,
                id: slide.id || `db-${slide.slot_number}`
              };
            }
          });
          setSlides(mergedSlides);
        }
      } catch (err) {
        console.error("Error reading hero slides database:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHeroSlides();
  }, []);

  // Autoplay slideshow timer
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds per slide for a premium look & readability

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (idx) => {
    setCurrentIndex(idx);
  };

  return (
    <section className="hero-slider-section">
      <div className="hero-slider-container">
        
        {/* Slides Track */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div 
              key={slide.id || idx} 
              className={`hero-slide ${isActive ? 'active' : ''}`}
            >
              {/* Media Loader */}
              <div className="hero-slide-media-container">
                {slide.media_type === 'video' ? (
                  <video 
                    src={slide.media_url} 
                    className="hero-slide-media"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={slide.media_url} 
                    alt={slide.title || 'Himani Construction slide'} 
                    className="hero-slide-media"
                  />
                )}
                {/* Beautiful overlay for contrast & premium branding */}
                <div className="hero-slide-overlay"></div>
              </div>

              {/* Dynamic Text Captions */}
              <div className="hero-slide-content-container">
                <div className="hero-slide-content">
                  {slide.title && (
                    <h1 className="hero-slide-title">
                      {slide.title.split('\n').map((line, lIdx) => (
                        <React.Fragment key={lIdx}>
                          {line}
                          {lIdx < slide.title.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h1>
                  )}
                  {slide.subtitle && <p className="hero-slide-subtitle">{slide.subtitle}</p>}
                  {slide.link_url && (
                    <div className="hero-slide-action">
                      <Link 
                        to={slide.link_url} 
                        className="btn-primary-slider"
                      >
                        {slide.link_text || 'Get In Touch'}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button 
              className="hero-arrow-btn prev-arrow" 
              onClick={handlePrev} 
              aria-label="Previous Slide"
            >
              &#10094;
            </button>
            <button 
              className="hero-arrow-btn next-arrow" 
              onClick={handleNext} 
              aria-label="Next Slide"
            >
              &#10095;
            </button>
          </>
        )}

        {/* Navigation Indicator Dots */}
        {slides.length > 1 && (
          <div className="hero-indicator-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Hero;
