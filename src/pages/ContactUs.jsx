import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // slight delay ensures the page layout has settled before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <main className="contact-page">
      {/* Main Contact Area */}
      <section className="contact-main" id="contact-form">
        <div className="container">

          <div className="contact-page-intro">
            <h1>Contact Us</h1>
            <p>We're here to help and answer any question you might have. We look forward to hearing from you.</p>
          </div>

          <div className="contact-wrapper">

            {/* Info */}
            <div className="contact-info-container">
              <h2>Get in touch</h2>
              <p className="contact-subtext">Fill in the form to start a conversation, or use the contact information below.</p>

              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-details">
                  <h4>Head Office</h4>
                  <p>123 Construction Avenue<br />Tech Park Phase 2<br />Bengaluru, Karnataka 560001</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📞</div>
                <div className="info-details">
                  <h4>Phone</h4>
                  <p>+91 70192 45628<br />+91 86604 59395</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div className="info-details">
                  <h4>Email</h4>
                  <p>himaniconstructionsandinterior@gmail.com<br /></p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-container">
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" className="form-control" placeholder="John" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" className="form-control" placeholder="Doe" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" className="form-control" placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" className="form-control">
                    <option>Residential Construction</option>
                    <option>Commercial Project</option>
                    <option>Interior Design</option>
                    <option>Renovation</option>
                    <option>Other Inquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" className="form-control" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="submit-btn">Send Message</button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <h4>Do you provide free estimates?</h4>
              <p>Yes, we offer complimentary initial consultations and detailed project estimates for all our services before any commitment is made.</p>
            </div>
            <div className="faq-card">
              <h4>Are you licensed and insured?</h4>
              <p>Absolutely. Himani Construction is fully licensed to operate, and we carry comprehensive liability and worker's compensation insurance.</p>
            </div>
            <div className="faq-card">
              <h4>Do you handle building permits?</h4>
              <p>Yes, our team handles the entire permitting process from start to finish, ensuring all work complies with local building codes and regulations.</p>
            </div>
            <div className="faq-card">
              <h4>What is your typical project timeline?</h4>
              <p>Timelines vary greatly depending on the scope of work. A kitchen remodel may take 4-6 weeks, while a custom home build can take 6-12 months. We provide detailed schedules during the planning phase.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
