import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <main className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>About Himani Construction</h1>
          <p>Building Trust, Delivering Excellence Since 2010</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <div className="container about-story-container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Founded on the principles of integrity, quality, and innovation, Himani Construction & Interiors has grown from a modest firm into one of the region's most trusted names in the construction industry.
            </p>
            <p>
              Over the years, we have successfully delivered countless residential and commercial projects, each standing as a testament to our commitment to excellence. We believe in building not just structures, but lasting relationships with our clients based on transparency and mutual respect.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container mv-container">
          <div className="mv-card mission-card">
            <h3>Our Mission</h3>
            <p>
              To provide unparalleled construction and interior design services that exceed client expectations through innovative solutions, superior craftsmanship, and a relentless dedication to quality and safety.
            </p>
          </div>
          <div className="mv-card vision-card">
            <h3>Our Vision</h3>
            <p>
              To be the premier construction and interior design company recognized for transforming dreams into enduring realities, setting new standards of excellence in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🏆</div>
              <h4>Quality</h4>
              <p>We never compromise on the quality of our materials or workmanship.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Integrity</h4>
              <p>Honesty and transparency are the foundations of every project we undertake.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h4>Innovation</h4>
              <p>We embrace modern technologies and sustainable building practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h4>Safety</h4>
              <p>The safety of our team and clients is our absolute highest priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="team">
        <div className="container">
          <h2 className="section-title">Meet Our Leadership</h2>
          <div className="team-grid">
            <div className="team-card">
              <img src="/images/service-img-placeholder.png" alt="Jane Doe" className="team-profile-img" />
              <div className="team-info">
                <h4>Jane Doe</h4>
                <p>Founder & CEO</p>
              </div>
            </div>
            <div className="team-card">
              <img src="/images/service-img-placeholder.png" alt="John Smith" className="team-profile-img" />
              <div className="team-info">
                <h4>John Smith</h4>
                <p>Head of Construction</p>
              </div>
            </div>
            <div className="team-card">
              <img src="/images/service-img-placeholder.png" alt="Sarah Jenkins" className="team-profile-img" />
              <div className="team-info">
                <h4>Sarah Jenkins</h4>
                <p>Lead Interior Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
