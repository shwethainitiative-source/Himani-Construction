import React, { useState, useEffect, useRef } from 'react';
import './About.css';

const AnimatedCounter = ({ endValue, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const numericEnd = parseFloat(endValue);
    if (isNaN(numericEnd)) return;

    const totalSteps = 60;
    const stepTime = duration / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const easeProgress = progress * (2 - progress); // easeOutQuad
      const currentVal = numericEnd * easeProgress;

      if (currentStep >= totalSteps) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        if (numericEnd % 1 !== 0) {
          setCount(parseFloat(currentVal.toFixed(1)));
        } else {
          setCount(Math.floor(currentVal));
        }
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, endValue, duration]);

  return (
    <span ref={elementRef} className="stat-value">
      {count}
      <span className="stat-suffix">{suffix}</span>
    </span>
  );
};

const About = () => {
  return (
    <section className="about">
      <div className="container about-container">

        {/* Left Side: Text Content */}
        <div className="about-content">
          <h2 className="section-title">WHY CHOOSE US ?</h2>
          <p className="about-text">
            Himani Construction & Interiors is a trusted name in delivering high-quality
            construction and interior design solutions. We specialize in creating modern,
            functional, and aesthetically pleasing spaces that reflect our clients' vision
            and lifestyle.
          </p>
          <p className="about-text">
            With a strong commitment to quality, innovation, and timely delivery, we handle
            every project with precision—from initial planning and design to final execution.
            Whether it's residential homes, commercial spaces, or interior transformations,
            our team ensures attention to detail at every step.
          </p>
        </div>

        {/* Right Side: Premium Statistics Section */}
        <div className="about-stats-container">

          {/* Circular SVG Badge */}
          <div className="badge-wrapper">
            <svg viewBox="0 0 160 160" width="160" height="160" className="badge-svg">
              <path id="curve-top" d="M 20,80 A 60,60 0 0,1 140,80" fill="transparent" />
              <path id="curve-bottom" d="M 140,80 A 60,60 0 0,1 20,80" fill="transparent" />

              <circle cx="80" cy="80" r="54" fill="#025981" />
              <circle cx="80" cy="80" r="58" fill="none" stroke="#b89561" stroke-width="1.5" stroke-dasharray="4 3" />

              <text fontSize="7" fontWeight="700" fill="var(--color-dark-brown)" letterSpacing="1.2">
                <textPath href="#curve-top" startOffset="50%" textAnchor="middle">
                  ENVIRONMENTAL HEALTH & SAFETY
                </textPath>
              </text>

              <text fontSize="7" fontWeight="700" fill="var(--color-dark-brown)" letterSpacing="1.2">
                <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">
                  ★ ISO 9001:2015 CERTIFIED ★
                </textPath>
              </text>

              <text x="80" y="65" fontSize="8" fontWeight="700" fill="#e5c158" textAnchor="middle" letterSpacing="1.2">
                HIMANI
              </text>
              <text x="80" y="90" fontSize="22" fontWeight="800" fill="var(--color-white)" textAnchor="middle" letterSpacing="0.5">
                EHS-Q
              </text>
              <text x="80" y="105" fontSize="7" fontWeight="700" fill="rgba(255,255,255,0.8)" text-anchor="middle" letterSpacing="1">
                CLASS A GRADING
              </text>
            </svg>
          </div>

          {/* Stats Grid */}
          <div className="about-stats-grid">
            <div className="stat-item">
              <div className="stat-number">
                <AnimatedCounter endValue="95" suffix="+" />
              </div>
              <div className="stat-label">Residential Construction</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">
                <AnimatedCounter endValue="70" suffix="+" />
              </div>
              <div className="stat-label">Commercial Construction</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">
                <AnimatedCounter endValue="72" suffix="+" />
              </div>
              <div className="stat-label">Interior Design</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">
                <AnimatedCounter endValue="12" suffix="+" />
              </div>
              <div className="stat-label">Renovation & Remodeling</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
