import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import './ContactCards.css';

const ContactCards = () => {
  return (
    <section className="contact-cards">
      <div className="container cards-container">
        <div className="contact-card">
          <Phone className="contact-icon" size={40} />
          <h3 className="contact-title">Call us</h3>
          <p className="contact-detail">+91 70192 45628 / +91 86604 59395</p>
        </div>

        <div className="contact-card">
          <MapPin className="contact-icon" size={40} />
          <h3 className="contact-title">Address</h3>
          <p className="contact-detail" style={{ fontSize: '14px', lineHeight: '1.5' }}>
            106, 4th Cross, 6th Main,<br />
            Balaji Layout / Bhadrappa Layout,<br />
            Bangalore - 560094
          </p>
        </div>

        <div className="contact-card">
          <Mail className="contact-icon" size={40} />
          <h3 className="contact-title">Email</h3>
          <p className="contact-detail">himaniconstruction<br />@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default ContactCards;
