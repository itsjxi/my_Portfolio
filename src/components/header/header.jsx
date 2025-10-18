import React, { useState } from 'react';

const Header = ({ onToggleSidebar, onToggleMobileMenu, activeSection }) => {
  const [theme, setTheme] = useState('light');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [selectedWeatherTheme, setSelectedWeatherTheme] = useState('auto');

  const themeOptions = [
    { value: 'auto', label: 'Auto (Weather)', icon: '🌤️' },
    { value: 'sunny', label: 'Sunny', icon: '☀️' },
    { value: 'cloudy', label: 'Cloudy', icon: '☁️' },
    { value: 'rainy', label: 'Rainy', icon: '🌧️' },
    { value: 'snowy', label: 'Snowy', icon: '❄️' },
    { value: 'stormy', label: 'Stormy', icon: '⛈️' },
    { value: 'misty', label: 'Misty', icon: '🌫️' },
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' }
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const applyTheme = (themeType) => {
    const body = document.body;
    body.classList.remove('theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-snowy', 'theme-stormy', 'theme-misty');
    
    if (themeType === 'light' || themeType === 'dark') {
      document.documentElement.setAttribute('data-theme', themeType);
      setTheme(themeType);
    } else if (themeType !== 'auto') {
      body.classList.add(`theme-${themeType}`);
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleThemeSelect = (selectedTheme) => {
    setSelectedWeatherTheme(selectedTheme);
    setShowThemeDropdown(false);
    applyTheme(selectedTheme);
  };

  return (
    <header className="header">
      <div className="unified-header">
        <div className="header-left">
          <button 
            className="btn-icon mobile-menu-btn"
            onClick={onToggleMobileMenu}
          >
            ☰
          </button>
          <button 
            className="btn-icon sidebar-toggle"
            onClick={onToggleSidebar}
          >
            ⟷
          </button>
          <h1 className="portfolio-title desktop-title">
            <span className="title-full">Jugal Rajput - Portfolio</span>
            <span className="title-short">Portfolio</span>
          </h1>
        </div>
        
        <div className="mobile-header">
          <button 
            className="btn-icon mobile-menu-btn"
            onClick={onToggleMobileMenu}
          >
            ☰
          </button>
          <h1 className="portfolio-title mobile-title">
            Portfolio
          </h1>
          <div className="theme-dropdown-container">
            <button 
              className="btn-icon theme-toggle"
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              title="Select theme"
            >
              {themeOptions.find(t => t.value === selectedWeatherTheme)?.icon || (theme === 'light' ? '🌙' : '☀️')}
            </button>
            {showThemeDropdown && (
              <div className="theme-dropdown">
                {themeOptions.map((themeOption) => (
                  <button
                    key={themeOption.value}
                    className={`theme-option ${selectedWeatherTheme === themeOption.value ? 'active' : ''}`}
                    onClick={() => handleThemeSelect(themeOption.value)}
                  >
                    <span className="theme-icon">{themeOption.icon}</span>
                    <span className="theme-label">{themeOption.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="section-headers">
          {activeSection === 'experience' && (
            <div className="header-section active">
              <span className="header-badge">Journey</span>
              <h3 className="header-title">Experience</h3>
              <span className="header-years">4+ yrs</span>
              <div className="header-underline"></div>
            </div>
          )}
          
          {activeSection === 'projects' && (
            <div className="header-section active">
              <span className="header-badge">Showcase</span>
              <h3 className="header-title">Projects</h3>
              <div className="header-underline"></div>
            </div>
          )}
          
          {activeSection === 'skills' && (
            <div className="header-section active">
              <span className="header-badge">Tech Stack</span>
              <h3 className="header-title">Skills</h3>
              <div className="header-underline"></div>
            </div>
          )}
          
          {activeSection === 'contact' && (
            <div className="header-section active">
              <span className="header-badge">Let's Connect</span>
              <h3 className="header-title">Contact</h3>
              <div className="header-underline"></div>
            </div>
          )}
        </div>
        
        <div className="header-right">
          <div className="theme-dropdown-container desktop-only">
            <button 
              className="btn-icon theme-toggle"
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              title="Select theme"
            >
              {themeOptions.find(t => t.value === selectedWeatherTheme)?.icon || (theme === 'light' ? '🌙' : '☀️')}
            </button>
            {showThemeDropdown && (
              <div className="theme-dropdown">
                {themeOptions.map((themeOption) => (
                  <button
                    key={themeOption.value}
                    className={`theme-option ${selectedWeatherTheme === themeOption.value ? 'active' : ''}`}
                    onClick={() => handleThemeSelect(themeOption.value)}
                  >
                    <span className="theme-icon">{themeOption.icon}</span>
                    <span className="theme-label">{themeOption.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <a 
            href="/images/resumeJugal.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary desktop-only"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;