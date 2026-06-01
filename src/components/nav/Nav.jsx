import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Layers, Cpu, Send, FileText, Link2, Code2 } from 'lucide-react';
import { PERSON } from '../../data/content.js';
import './Nav.css';

const links = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'experience', icon: Briefcase, label: 'Experience' },
  { id: 'projects', icon: Layers, label: 'Projects' },
  { id: 'skills', icon: Cpu, label: 'Skills' },
  { id: 'contact', icon: Send, label: 'Contact' },
];

export default function Nav({ activeSection, setActiveSection }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(l => l.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop side nav — expands on hover */}
      <nav
        className={`nav-rail ${hovered ? 'expanded' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Main navigation"
      >
        <div className="nav-logo" data-cursor>
          <span className="nav-logo-letter">J</span>
          <span className="nav-logo-text">Jugal</span>
        </div>

        <div className="nav-links">
          {links.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={`nav-link ${activeSection === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
              aria-label={label}
              data-cursor
            >
              <Icon size={18} strokeWidth={1.5} className="nav-link-icon" />
              <span className="nav-link-label">{label}</span>
              {activeSection === id && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="nav-bottom">
          <a href={PERSON.resume} target="_blank" rel="noopener noreferrer" className="nav-social" data-cursor aria-label="Resume">
            <FileText size={16} strokeWidth={1.5} />
            <span className="nav-social-label">Resume</span>
          </a>
          <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className="nav-social" data-cursor aria-label="LinkedIn">
            <Link2 size={16} strokeWidth={1.5} />
            <span className="nav-social-label">LinkedIn</span>
          </a>
          <a href={PERSON.github} target="_blank" rel="noopener noreferrer" className="nav-social" data-cursor aria-label="GitHub">
            <Code2 size={16} strokeWidth={1.5} />
            <span className="nav-social-label">GitHub</span>
          </a>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="nav-mobile" aria-label="Mobile navigation">
        {links.map(({ id, icon: Icon }) => (
          <button
            key={id}
            className={`nav-mobile-link ${activeSection === id ? 'active' : ''}`}
            onClick={() => scrollTo(id)}
          >
            <Icon size={20} strokeWidth={activeSection === id ? 2 : 1.5} />
          </button>
        ))}
      </nav>
    </>
  );
}
