import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../../data/content.js';
import { useReveal } from '../../hooks/useReveal.js';
import './Skills.css';

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="section skills-section">
      <div ref={ref} className="reveal-up">
        <p className="section-eyebrow">Skills</p>
        <h2 className="section-title">Technical arsenal</h2>
        <p className="section-subtitle">
          Every tool chosen with intent. Every pattern a conscious architectural decision.
        </p>
      </div>

      <div className="skills-grid">
        {Object.entries(SKILLS).map(([category, items], i) => (
          <motion.div
            key={category}
            className="skill-module"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <h3 className="skill-category">{category}</h3>
            <div className="skill-items">
              {items.map((skill, j) => (
                <span key={j} className="skill-pill">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Philosophy quote */}
      <motion.blockquote
        className="philosophy"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="philosophy-mark">"</span>
        <p className="philosophy-text">
          Simplicity is not the goal. <em>Impact</em> is. But simplicity is the only way to achieve impact at scale.
        </p>
        <footer className="philosophy-cite">— Engineering Philosophy</footer>
      </motion.blockquote>
    </section>
  );
}
