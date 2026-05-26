import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, Paintbrush, Wrench } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    title: 'Residential Construction',
    description: 'We build high-quality, customized homes designed for comfort and durability.',
    icon: <Home size={32} />,
    hash: '#residential'
  },
  {
    title: 'Commercial Construction',
    description: 'We deliver efficient and modern commercial spaces tailored to your business needs.',
    icon: <Building2 size={32} />,
    hash: '#commercial'
  },
  {
    title: 'Interior Design',
    description: 'We create elegant, functional interiors tailored to your style and needs.',
    icon: <Paintbrush size={32} />,
    hash: '#interior'
  },
  {
    title: 'Renovation & Remodeling',
    description: 'We transform existing spaces with smart upgrades and modern design solutions.',
    icon: <Wrench size={32} />,
    hash: '#renovation'
  }
];

const Services = () => {
  return (
    <section className="services">
      <div className="container services-container">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon-wrapper">
              <div className="service-icon">{service.icon}</div>
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <Link to={`/services${service.hash}`} className="service-btn" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Learn more</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
