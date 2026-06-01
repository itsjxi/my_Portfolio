import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCE } from '../../data/content.js';
import { useReveal } from '../../hooks/useReveal.js';
import './Experience.css';

export default function Experience() {
  const [active, setActive] = useState(0);
  const ref = useReveal();
  const current = EXPERIENCE[active];

  return (
    <section id="experience" className="section exp-section">
      <div ref={ref} className="reveal-up">
        <p className="section-eyebrow">Experience</p>
        <h2 className="section-title">Where I've shipped</h2>
        <p className="section-subtitle">
          Building performant, accessible, and scalable frontend systems that power real product value.
        </p>
      </div>

      <div className="exp-layout">
        {/* Tabs */}
        <div className="exp-tabs">
          {EXPERIENCE.map((exp, i) => (
            <button
              key={exp.id}
              className={`exp-tab ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
              data-cursor
            >
              <img src={exp.logo} alt={exp.company} className="exp-tab-logo" />
              <div className="exp-tab-text">
                <span className="exp-tab-company">{exp.company}</span>
                <span className="exp-tab-role">{exp.role}</span>
                <span className="exp-tab-period">{exp.period}</span>
              </div>
              {active === i && (
                <motion.div className="exp-tab-bar" layoutId="exp-bar" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="exp-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <div className="exp-content-header">
              <div>
                <h3 className="exp-role">{current.role}</h3>
                <p className="exp-summary">{current.summary}</p>
              </div>
              <div className="exp-stack">
                {current.stack.map((t, i) => (
                  <span key={i} className="chip">{t}</span>
                ))}
              </div>
            </div>

            <div className="exp-grid">
              {current.work.map((item, i) => (
                <div key={i} className="work-card">
                  <span className="work-index">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="work-title">{item.title}</h4>
                  <p className="work-desc">{item.desc}</p>
                  <div className="work-footer">
                    <span className="work-metric">{item.metric}</span>
                    <div className="work-tags">
                      {item.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
