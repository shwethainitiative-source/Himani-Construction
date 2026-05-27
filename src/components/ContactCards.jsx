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
          <p className="contact-detail">Bengaluru Himanai</p>
        </div>

        <div className="contact-card">
          <Mail className="contact-icon" size={40} />
          <h3 className="contact-title">Email</h3>
          <p className="contact-detail">himaniconstructionsandinterior@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default ContactCards;
