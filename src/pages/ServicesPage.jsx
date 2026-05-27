import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <main className="services-page">
      {/* Header */}
      <section className="services-header">
        <div className="container">
          <h1>Our Expert Services</h1>
          <p>Comprehensive construction and design solutions tailored to meet your unique needs with precision and creativity.</p>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="services-detail-section">
        <div className="container">
          
          {/* Residential */}
          <div className="service-row" id="residential">
            <div className="service-image-col">
              <img src="/images/residential_construction.jpg" alt="Residential Construction" />
            </div>
            <div className="service-text-col">
              <h2>Residential Construction</h2>
              <p>We build homes that resonate with your lifestyle. From contemporary urban villas to traditional family homes, our residential construction services cover every aspect from foundation to finishing touches. We focus on structural integrity, aesthetic appeal, and energy efficiency.</p>
              <ul className="service-features">
                <li>Custom Home Building</li>
                <li>Sustainable & Eco-friendly Designs</li>
                <li>Smart Home Integrations</li>
                <li>Premium Finishing & Detailing</li>
              </ul>
            </div>
          </div>

          {/* Commercial */}
          <div className="service-row reverse" id="commercial">
            <div className="service-image-col">
              <img src="/images/service-img-placeholder.png" alt="Commercial Construction" />
            </div>
            <div className="service-text-col">
              <h2>Commercial Construction</h2>
              <p>Elevate your business with our state-of-transform commercial spaces. We understand the unique demands of commercial construction, ensuring projects are delivered on time and within budget, without disrupting your business operations.</p>
              <ul className="service-features">
                <li>Office Buildings & Corporate Spaces</li>
                <li>Retail Outlets & Malls</li>
                <li>Industrial Facilities</li>
                <li>Strict Safety & Compliance Adherence</li>
              </ul>
            </div>
          </div>

          {/* Interior Design */}
          <div className="service-row" id="interior">
            <div className="service-image-col">
              <img src="/images/service-img-placeholder.png" alt="Interior Design" />
            </div>
            <div className="service-text-col">
              <h2>Interior Design</h2>
              <p>Our award-winning interior design team transforms empty spaces into living masterpieces. We blend functionality with aesthetics to create environments that inspire and comfort, tailored perfectly to your taste and brand identity.</p>
              <ul className="service-features">
                <li>Space Planning & Optimization</li>
                <li>Custom Furniture & Styling</li>
                <li>Lighting & Acoustic Design</li>
                <li>Material Selection & Sourcing</li>
              </ul>
            </div>
          </div>

          {/* Renovation */}
          <div className="service-row reverse" id="renovation">
            <div className="service-image-col">
              <img src="/images/service-img-placeholder.png" alt="Renovation & Remodeling" />
            </div>
            <div className="service-text-col">
              <h2>Renovation & Remodeling</h2>
              <p>Breathe new life into your existing structures. Whether it's a historic restoration or a modern kitchen upgrade, our remodeling experts handle structural changes and aesthetic updates seamlessly, increasing your property's value.</p>
              <ul className="service-features">
                <li>Kitchen & Bathroom Remodeling</li>
                <li>Structural Extensions & Additions</li>
                <li>Exterior Facelifts</li>
                <li>Heritage Property Restoration</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <h2>Why Choose Himani Construction?</h2>
          <div className="wcu-grid">
            <div className="wcu-card">
              <div className="wcu-number">15+</div>
              <h3>Years of Experience</h3>
              <p>Over a decade and a half of industry leadership, successfully completing complex projects across various sectors.</p>
            </div>
            <div className="wcu-card">
              <div className="wcu-number">100%</div>
              <h3>Client Satisfaction</h3>
              <p>Our commitment to transparent communication and exceeding expectations has resulted in a flawless track record.</p>
            </div>
            <div className="wcu-card">
              <div className="wcu-number">500+</div>
              <h3>Projects Delivered</h3>
              <p>From small interior renovations to massive commercial structures, our portfolio showcases unmatched versatility.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
