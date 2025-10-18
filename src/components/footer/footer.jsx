import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          © 2024 Jugal Rajput. Built with React & ❤️
        </p>
        <div className="footer-links">
          <a 
            href="https://github.com/itsjxi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/jugal-rajput-39bbbb144/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;