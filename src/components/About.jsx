import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about">
      <div className="container about-container">
        <div className="about-image-wrapper">
          <div className="blob-shape"></div>
          <img src="/images/about_house.png" alt="Modern House" className="about-image" />
        </div>
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
      </div>
    </section>
  );
};

export default About;
