import React, { useEffect, useState } from 'react';
import { initScrollAnimations } from '../../utils/scrollAnimations';
import './home.css';

const Home = () => {
  const [showContactPanel, setShowContactPanel] = useState(false);
  
  useEffect(() => {
    initScrollAnimations();
  }, []);
  
  const handleGetInTouch = (e) => {
    e.preventDefault();
    setShowContactPanel(true);
  };
  return (
    <div className="home-section scroll-reveal">
      <div className="hero-content">
        <div className="hero-text scroll-reveal">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Jugal Rajput</span>
          </h1>
          <h2 className="hero-subtitle">Frontend Developer</h2>
          <p className="hero-description">
            Passionate about creating exceptional user experiences with modern web technologies. 
            Currently working at WebEngage, building innovative solutions for digital marketing.
          </p>
          <div className="hero-actions">
            <button onClick={handleGetInTouch} className="btn btn-primary">Get In Touch</button>
            <a href="/images/resumeJugal.pdf" target="_blank" className="btn btn-outline">
              View Resume
            </a>
          </div>
        </div>
        <div className="hero-showcase">
          <div className="skills-animation">
            <div className="code-window">
              <div className="window-header">
                <div className="window-controls">
                  <span className="control close"></span>
                  <span className="control minimize"></span>
                  <span className="control maximize"></span>
                </div>
                <span className="window-title">frontend-skills.js</span>
              </div>
              <div className="code-content">
                <div className="code-line">
                  <span className="line-number">1</span>
                  <span className="code-text">
                    <span className="keyword">const</span> <span className="variable">developer</span> = {'{'}  
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">2</span>
                  <span className="code-text">
                    &nbsp;&nbsp;<span className="property">name</span>: <span className="string">'Jugal Rajput'</span>,
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">3</span>
                  <span className="code-text">
                    &nbsp;&nbsp;<span className="property">skills</span>: [<span className="string">'React'</span>, <span className="string">'Node.js'</span>],
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">4</span>
                  <span className="code-text">
                    &nbsp;&nbsp;<span className="property">experience</span>: <span className="string">'4+ years'</span>,
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">5</span>
                  <span className="code-text">
                    &nbsp;&nbsp;<span className="property">passion</span>: <span className="string">'Frontend'</span>
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">6</span>
                  <span className="code-text">{'};'}</span>
                </div>
              </div>
            </div>
            
            <div className="floating-elements">
              <div className="tech-orb react">⚛️</div>
              <div className="tech-orb vue">💚</div>
              <div className="tech-orb js">🟨</div>
              <div className="tech-orb css">🎨</div>
              <div className="tech-orb node">🟢</div>
              <div className="tech-orb git">🔧</div>
            </div>
            
            <div className="pulse-rings">
              <div className="pulse-ring ring-1"></div>
              <div className="pulse-ring ring-2"></div>
              <div className="pulse-ring ring-3"></div>
            </div>
            
            <div className="geometric-shapes">
              <div className="shape triangle"></div>
              <div className="shape circle"></div>
              <div className="shape square"></div>
            </div>
          </div>
        </div>
      </div>
      
      {showContactPanel && (
        <div className="contact-panel-overlay">
          <div className="contact-info-panel-slide">
            <button 
              className="close-panel-btn"
              onClick={() => setShowContactPanel(false)}
            >
              ✕
            </button>
            
            <div className="info-header">
              <h3 className="info-title">Let's Work Together</h3>
              <p className="info-description">
                Ready to bring your ideas to life? I'm here to help you build amazing digital experiences.
              </p>
            </div>
            
            <div className="contact-methods">
              <a href="mailto:jugalrajput10@gmail.com" className="contact-method">
                <div className="method-icon">📧</div>
                <div className="method-content">
                  <h4 className="method-title">Email</h4>
                  <p className="method-value">jugalrajput10@gmail.com</p>
                  <span className="method-description">Send me an email</span>
                </div>
                <div className="method-arrow">→</div>
              </a>
              
              <a href="https://www.linkedin.com/in/jugal-rajput-39bbbb144/" className="contact-method" target="_blank" rel="noopener noreferrer">
                <div className="method-icon">💼</div>
                <div className="method-content">
                  <h4 className="method-title">LinkedIn</h4>
                  <p className="method-value">linkedin.com/in/jugal-rajput-39bbbb144</p>
                  <span className="method-description">Connect professionally</span>
                </div>
                <div className="method-arrow">→</div>
              </a>
              
              <a href="https://github.com/itsjxi" className="contact-method" target="_blank" rel="noopener noreferrer">
                <div className="method-icon">🐙</div>
                <div className="method-content">
                  <h4 className="method-title">GitHub</h4>
                  <p className="method-value">github.com/itsjxi</p>
                  <span className="method-description">Check out my code</span>
                </div>
                <div className="method-arrow">→</div>
              </a>
              
              <a href="tel:+919897256740" className="contact-method">
                <div className="method-icon">📱</div>
                <div className="method-content">
                  <h4 className="method-title">Phone</h4>
                  <p className="method-value">+91 98972 56740</p>
                  <span className="method-description">Call me directly</span>
                </div>
                <div className="method-arrow">→</div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;