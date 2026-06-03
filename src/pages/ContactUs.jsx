import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = () => {
  const { hash } = useLocation();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    subject: 'Residential Construction',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // basic validation
    if (!formData.fname.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({
        type: 'danger',
        message: 'Please fill in all required fields (First Name, Email, and Message).'
      });
      return;
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus({
        type: 'danger',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://formsubmit.co/ajax/himaniconstruction@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `${formData.fname} ${formData.lname}`.trim(),
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Himani Construction Enquiry: ${formData.subject}`
        })
      });

      const data = await response.json();

      if (response.ok && data.success === 'true') {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. We will get back to you shortly.'
        });
        setFormData({
          fname: '',
          lname: '',
          email: '',
          subject: 'Residential Construction',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        type: 'danger',
        message: err.message || 'Failed to send message. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <p>106, 4th Cross, 6th Main,<br />Balaji Layout / Bhadrappa Layout,<br />Bangalore - 560094</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">🏢</div>
                <div className="info-details">
                  <h4>Branches</h4>
                  <p style={{ margin: 0, padding: 0 }}>
                    <strong>Sagar:</strong><br />
                    First Floor, New Private Bus Stand Complex, Sagar, Shimoga District.
                  </p>
                  <p style={{ marginTop: '15px' }}>
                    <strong>Sorab:</strong><br />
                    Main Road, Bhushan Jeweller Complex, Sorab.
                  </p>
                  <p style={{ marginTop: '15px' }}>
                    <strong>Mangalore:</strong><br />
                    A.A. Pais Building, 1st Floor, Next to Kavita Residency, Urva Store, Mangalore.
                  </p>
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
                  <p>himaniconstruction@gmail.com<br /></p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-container">
              {submitStatus.message && (
                <div className={`alert alert-${submitStatus.type}`}>
                  {submitStatus.type === 'success' ? '✅' : '❌'} {submitStatus.message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fname">First Name *</label>
                    <input
                      type="text"
                      id="fname"
                      className="form-control"
                      placeholder="John"
                      value={formData.fname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input
                      type="text"
                      id="lname"
                      className="form-control"
                      placeholder="Doe"
                      value={formData.lname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option>Residential Construction</option>
                    <option>Commercial Project</option>
                    <option>Interior Design</option>
                    <option>Renovation</option>
                    <option>Other Inquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    className="form-control"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
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
