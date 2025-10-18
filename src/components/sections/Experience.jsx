import React, { useState, useEffect } from 'react';
import { experienceData } from '../experience/experienceData.js';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="experience-section">

      <div className="experience-container">
        <div className="experience-tabs">
          {experienceData.map((exp, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
            >
              <div className="tab-content">
                <img src={exp.image} alt={exp.company} className="company-avatar" />
                <div className="tab-info">
                  <span className="company-name">{exp.company}</span>
                  <span className="tab-duration">{exp.duration}</span>
                </div>
              </div>
              <div className="tab-indicator"></div>
            </button>
          ))}
        </div>

        <div className="experience-content">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className={`experience-panel ${activeTab === index ? 'active' : ''}`}
            >
              <div className="panel-header">
                <div className="role-info">
                  <h3 className="role-title">{exp.role}</h3>
                  <div className="company-details">
                    <span className="company-name">{exp.company}</span>
                    <span className="duration">{exp.duration}</span>
                  </div>
                </div>
                <div className="tech-stack-preview">
                  {exp.techStack.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-pill">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="achievements-grid">
                {exp.highlights.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="achievement-card">
                    <div className="achievement-header">
                      <div className="achievement-icon">
                        <span>🚀</span>
                      </div>
                      <h4 className="achievement-title">{highlight.title}</h4>
                    </div>
                    <p className="achievement-description">{highlight.description}</p>
                    <div className="achievement-impact">
                      <span className="impact-badge">{highlight.impact}</span>
                    </div>
                    <div className="achievement-tech">
                      {highlight.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;