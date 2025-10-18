import React, { useState, useEffect } from 'react';
import { projectsData } from '../Projects/projectsData.js';
import TechIcon from '../shared/TechIcon.jsx';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [filter, setFilter] = useState('all');
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const categories = ['all', 'Web App', 'Dashboard', 'Full Stack', 'Tool', 'Mobile App'];
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  useEffect(() => {
    if (isAutoPlay && filteredProjects.length > 1) {
      const interval = setInterval(() => {
        setSelectedProject(prev => (prev + 1) % filteredProjects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, filteredProjects.length]);

  const handleProjectSelect = (index) => {
    setSelectedProject(index);
    setIsAutoPlay(false);
  };

  const currentProject = filteredProjects[selectedProject];

  return (
    <div className="projects-section">
      <div className="projects-showcase">
        <div className="projects-sidebar">
          <div className="sidebar-header">
            <h4>All Projects</h4>
            <button 
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`autoplay-btn ${isAutoPlay ? 'active' : ''}`}
            >
              {isAutoPlay ? '⏸️' : '▶️'}
            </button>
          </div>
          
          <div className="projects-list">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => handleProjectSelect(index)}
                className={`project-item ${selectedProject === index ? 'active' : ''}`}
              >
                <div className="item-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="item-content">
                  <h5 className="item-title">{project.title}</h5>
                  <p className="item-category">{project.category}</p>
                  <div className="item-tech">
                    {project.tech.slice(0, 2).map((tech, techIndex) => (
                      <span key={techIndex} className="tech-pill">{tech}</span>
                    ))}
                    {project.tech.length > 2 && (
                      <span className="tech-more">+{project.tech.length - 2}</span>
                    )}
                  </div>
                </div>
                <div className="item-indicator"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="project-preview">
          {currentProject && (
            <>
              <div className="project-top">
                <div className="project-image-container">
                  <img 
                    src={currentProject.image} 
                    alt={currentProject.title}
                    className="project-preview-image"
                  />
                  <div className="image-overlay">
                    <div className="project-badges">
                      <span className="category-badge">{currentProject.category}</span>
                      {currentProject.featured && (
                        <span className="featured-badge">⭐ Featured</span>
                      )}
                    </div>
                    <div className="project-actions">
                      <a 
                        href={currentProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn github-btn"
                      >
                        <span>📂</span> Code
                      </a>
                      <a 
                        href={currentProject.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn demo-btn"
                      >
                        <span>🚀</span> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="project-details">
                  <div className="project-header">
                    <h3 className="project-title">{currentProject.title}</h3>
                    <div className="project-meta">
                      <span className="project-id">#{String(selectedProject + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <p className="project-description">{currentProject.longDescription || currentProject.description}</p>
                </div>
              </div>
              
              <div className="tech-showcase">
                <h4 className="tech-title">Technologies</h4>
                <div className="tech-grid">
                  {currentProject.tech.map((tech, index) => (
                    <div key={index} className="tech-item">
                      <TechIcon tech={tech} size={16} />
                      <span className="tech-name">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="project-navigation">
                <button 
                  onClick={() => setSelectedProject(prev => prev > 0 ? prev - 1 : filteredProjects.length - 1)}
                  className="nav-btn-compact"
                >
                  ← Prev
                </button>
                
                <div className="nav-dots-compact">
                  {filteredProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleProjectSelect(index)}
                      className={`nav-dot-compact ${selectedProject === index ? 'active' : ''}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={() => setSelectedProject(prev => (prev + 1) % filteredProjects.length)}
                  className="nav-btn-compact"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;