import React from 'react';
import { Target, Eye } from 'lucide-react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <main className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>About Himani Construction</h1>
          <p>Building Trust, Delivering Excellence Since 1998</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <div className="container about-story-container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Since first opened in 1998, Himani Construction and Interiors has earned a reputation for integrity, quality, service and attention. Our growth from local builder into one of the most reputed construction company, is a reflection of the strong relationships we have forged over the years and our personalized approach to client service.            </p>
            <p>
              With more than 22 years of serving Industrial, Commercial, Institutional and Residential buildings, We are also engaged in providing various construction services like Interior work, rain water harvesting, water proofing etc. we are proud that much of our business continues to come from repeat customers and client referrals. Regardless of the size or nature of each construction project, Himani Construction is committed to generating personalized, innovative, quality-driven solutions that reflect customer expectations and deliver superior outcome to them. At Himani Construction, our approach is simple, we aim to build and develop more than just great properties. We want to create lasting relationships. To us, every new project is an opportunity to build new bonds and reinforce relationships. We may work most often with concrete, steel and glass, yet our best work is derived of confidence, quality and pride in the work we do and those we work with.            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container mv-container">
          <div className="mv-card">
            <div className="mv-icon-wrapper">
              <Target size={28} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To provide quality workmanship and customer service and maintain the highest level of professionalism, honesty and fairness in our relationships with our customers, employees and vendors.
            </p>
          </div>
          <div className="mv-card">
            <div className="mv-icon-wrapper">
              <Eye size={28} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To become most trusted in construction by providing our services in the maximum and proper Environmental, health and safety and Quality level to gain our customer satisfaction. A company that our customers want to work with and our employees are proud to work for.
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
              <img src="/images/leadership.jpg" alt="Mr. Ravindra T." className="team-profile-img-lg" />
              <div className="team-info">
                <h4>Mr. Ravindra T.</h4>
                <p style={{ color: 'var(--color-sky-blue)', fontWeight: '600', fontSize: '1.1rem' }}>Founder & CEO</p>
              </div>
            </div>
            <div className="team-card">
              <img src="/images/ashok.png" alt="Ashok L.T" className="team-profile-img-lg" />
              <div className="team-info">
                <h4>Ashok L.T</h4>
                <p style={{ color: 'var(--color-sky-blue)', fontWeight: '600', fontSize: '1.1rem' }}>Head of Construction</p>
              </div>
            </div>
            <div className="team-card">
              <img src="/images/anup.jpg" alt="Anup P S" className="team-profile-img-lg" />
              <div className="team-info">
                <h4>Anup P S</h4>
                <p style={{ color: 'var(--color-sky-blue)', fontWeight: '600', fontSize: '1.1rem' }}>Interior Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
