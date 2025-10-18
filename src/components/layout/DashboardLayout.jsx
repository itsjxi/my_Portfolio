import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const DashboardLayout = ({ children, activeSection, setActiveSection }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar 
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onClose={() => setMobileMenuOpen(false)}
      />
      
      <div className={`main-wrapper ${
        sidebarCollapsed && !isMobile ? 'sidebar-collapsed' : ''
      } ${
        isMobile ? 'sidebar-hidden' : ''
      }`}>
        <Header 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          activeSection={activeSection}
        />
        
        <main className="main-content">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;