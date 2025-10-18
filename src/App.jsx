import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import Home from './components/sections/Home.jsx';
import Projects from './components/sections/Projects.jsx';
import Skills from './components/sections/Skills.jsx';
import Experience from './components/sections/Experience.jsx';
import Contact from './components/sections/Contact.jsx';
import './styles/index.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Set initial theme to light
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'experience':
        return <Experience />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;