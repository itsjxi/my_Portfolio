import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './components/sections/Home';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
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