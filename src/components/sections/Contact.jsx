import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await emailjs.sendForm(
        'service_nld2dpm', 
        'template_bw4bwam', 
        form.current, 
        {
          publicKey: 'GSpf5-RciM723EsF-'
        }
      );
      
      console.log('Email sent successfully:', result.text);
      setFormData({ user_name: '', user_email: '', message: '' });
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'jugalrajput10@gmail.com',
      link: 'mailto:jugalrajput10@gmail.com',
      description: 'Send me an email'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/jugal-rajput-39bbbb144',
      link: 'https://www.linkedin.com/in/jugal-rajput-39bbbb144/',
      description: 'Connect professionally'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: 'github.com/itsjxi',
      link: 'https://github.com/itsjxi',
      description: 'Check out my code'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+91 98972 56740',
      link: 'tel:+919897256740',
      description: 'Call me directly'
    }
  ];

  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-info-panel">
          <div className="info-header">
            <h3 className="info-title">Let's Work Together</h3>
            <p className="info-description">
              Ready to bring your ideas to life? I'm here to help you build amazing digital experiences.
            </p>
          </div>
          
          <div className="contact-methods">
            {contactMethods.map((method, index) => (
              <a 
                key={index}
                href={method.link}
                className="contact-method"
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                <div className="method-icon">
                  <span>{method.icon}</span>
                </div>
                <div className="method-content">
                  <h4 className="method-title">{method.title}</h4>
                  <p className="method-value">{method.value}</p>
                  <span className="method-description">{method.description}</span>
                </div>
                <div className="method-arrow">
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
          

        </div>
        
        <div className="contact-form-panel">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="user_name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="user_email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Project Details</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows="6"
                placeholder="Tell me about your project, timeline, and requirements..."
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending Message...
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <span className="btn-icon">✈️</span>
                </>
              )}
            </button>
            

          </form>
        </div>
      </div>
      
      {submitStatus === 'success' && (
        <div className="status-popup success">
          <span className="status-icon">✅</span>
          <span>Message sent successfully!</span>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="status-popup error">
          <span className="status-icon">❌</span>
          <span>Failed to send message. Please try again.</span>
        </div>
      )}
    </div>
  );
};

export default Contact;