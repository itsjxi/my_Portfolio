import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Link2, Code2, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PERSON } from '../../data/content.js';
import { useReveal } from '../../hooks/useReveal.js';
import './Contact.css';

const links = [
  { icon: Mail, label: 'Email', value: PERSON.email, href: `mailto:${PERSON.email}` },
  { icon: Link2, label: 'LinkedIn', value: 'jugal-rajput', href: PERSON.linkedin },
  { icon: Code2, label: 'GitHub', value: 'itsjxi', href: PERSON.github },
  { icon: Phone, label: 'Phone', value: PERSON.phone, href: `tel:${PERSON.phone.replace(/\s/g, '')}` },
];

export default function Contact() {
  const ref = useReveal();
  const form = useRef();
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return 'Email is required';
    if (!re.test(email)) return 'Enter a valid email address';
    const disposable = ['tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com', 'yopmail.com', 'sharklasers.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    if (disposable.includes(domain)) return 'Disposable emails not allowed';
    return '';
  };

  const validateForm = () => {
    const formData = new FormData(form.current);
    const name = formData.get('user_name')?.trim();
    const email = formData.get('user_email')?.trim();
    const message = formData.get('message')?.trim();
    const newErrors = {};

    if (!name || name.length < 2) newErrors.user_name = 'Name must be at least 2 characters';
    const emailErr = validateEmail(email);
    if (emailErr) newErrors.user_email = emailErr;
    if (!message || message.length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSending(true);
    try {
      await emailjs.sendForm(
        'service_7qkf3z2',
        'template_bw4bwam',
        form.current,
        'XiDzE6XN55t3B9YUd'
      );
      setStatus('success');
      setErrors({});
      form.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
    setSending(false);
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <section id="contact" className="section contact-section">
      <div ref={ref} className="reveal-up">
        <p className="section-eyebrow">Contact</p>
        <h2 className="section-title">Let's build together</h2>
        <p className="section-subtitle">
          Have a project in mind? Let's engineer something meaningful.
        </p>
      </div>

      <div className="contact-grid">
        {/* Links */}
        <div className="contact-links">
          {links.map(({ icon: Icon, label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="contact-link"
              data-cursor
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="contact-link-icon"><Icon size={18} /></div>
              <div className="contact-link-body">
                <span className="contact-link-label">{label}</span>
                <span className="contact-link-value">{value}</span>
              </div>
              <span className="contact-link-arrow">→</span>
            </motion.a>
          ))}

          <a href={PERSON.resume} target="_blank" rel="noopener noreferrer" className="resume-btn" data-cursor>
            ↓ Download Resume
          </a>
        </div>

        {/* Form */}
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="contact-form"
          noValidate
        >
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="user_name"
                required
                className={`form-input ${errors.user_name ? 'input-error' : ''}`}
                placeholder="Your name"
                onChange={() => setErrors(prev => ({ ...prev, user_name: '' }))}
              />
              {errors.user_name && <span className="field-error">{errors.user_name}</span>}
            </div>
            <div className="form-field">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="user_email"
                required
                className={`form-input ${errors.user_email ? 'input-error' : ''}`}
                placeholder="you@email.com"
                onChange={() => setErrors(prev => ({ ...prev, user_email: '' }))}
              />
              {errors.user_email && <span className="field-error">{errors.user_email}</span>}
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              required
              className={`form-textarea ${errors.message ? 'input-error' : ''}`}
              rows="5"
              placeholder="Tell me about your project..."
              onChange={() => setErrors(prev => ({ ...prev, message: '' }))}
            />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </div>
          <button type="submit" disabled={sending} className="submit-btn" data-cursor>
            <Send size={14} />
            {sending ? 'Sending...' : 'Send message'}
          </button>
          {status === 'success' && <p className="form-toast success">Message sent successfully!</p>}
          {status === 'error' && <p className="form-toast error">Failed to send. Try again.</p>}
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <span className="footer-brand">Jugal Rajput</span>
          <span className="footer-sub">Built with precision. Designed for impact.</span>
        </div>
      </footer>
    </section>
  );
}
