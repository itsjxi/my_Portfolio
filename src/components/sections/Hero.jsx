import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, Link2 } from 'lucide-react';
import { PERSON, METRICS } from '../../data/content.js';
import './Hero.css';

export default function Hero({ setActiveSection }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-grid">
        {/* Left content */}
        <div className="hero-left">
          <motion.div
            className="hero-status"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="status-dot" />
            <span>Available for opportunities</span>
          </motion.div>

          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {PERSON.tagline}
          </motion.h1>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {PERSON.bio}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <button
              className="btn-primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              data-cursor
            >
              Let's talk
              <ArrowDown size={14} />
            </button>
            <a href={PERSON.github} target="_blank" rel="noopener noreferrer" className="btn-icon" data-cursor>
              <Code2 size={18} />
            </a>
            <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" data-cursor>
              <Link2 size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right — code artifact */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="code-artifact">
            <div className="code-header">
              <div className="code-dots">
                <span /><span /><span />
              </div>
              <span className="code-filename">engineer.ts</span>
            </div>
            <pre className="code-body">
{`interface Engineer {
  name: "${PERSON.name}";
  role: "${PERSON.title}";
  company: "${PERSON.company}";
  skills: [
    "React", "JavaScript",
    "Redux", "Design"
  ];
  focus: [
    "AI-powered tools",
    "Design systems",
    "Performance"
  ];
  status: "shipping";
}`}
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Metrics bar */}
      <motion.div
        className="hero-metrics"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        {METRICS.map((m, i) => (
          <div key={i} className="metric">
            <span className="metric-value">{m.value}</span>
            <span className="metric-label">{m.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="scroll-line"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
