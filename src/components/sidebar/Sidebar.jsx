import React, { useState, useEffect } from 'react';
import WeatherClock from './WeatherClock';

const Sidebar = ({ collapsed, mobileOpen, activeSection, setActiveSection, onClose }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleItemClick = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) {
      onClose();
    }
  };

  const getSidebarClasses = () => {
    let classes = 'sidebar';
    if (collapsed && !isMobile) classes += ' collapsed';
    if (isMobile && !mobileOpen) classes += ' mobile-hidden';
    if (isMobile && mobileOpen) classes += ' mobile-open';
    return classes;
  };

  return (
    <aside className={getSidebarClasses()}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          {(!collapsed || isMobile) && <span className="brand-text">Portfolio</span>}
          <span className="brand-icon">👨‍💻</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {(!collapsed || isMobile) && <span className="nav-text">{item.label}</span>}
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <WeatherClock collapsed={collapsed && !isMobile} />
      </div>
    </aside>
  );
};

export default Sidebar;