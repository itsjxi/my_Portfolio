import React, { useState, useEffect } from 'react';
import Nav from './components/nav/Nav.jsx';
import Hero from './components/sections/Hero.jsx';
import Experience from './components/sections/Experience.jsx';
import Projects from './components/sections/Projects.jsx';
import Skills from './components/sections/Skills.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('a, button, [data-cursor]');
    const on = () => setCursorHover(true);
    const off = () => setCursorHover(false);
    els.forEach(el => { el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off); });
    return () => els.forEach(el => { el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off); });
  });

  return (
    <>
      {/* Custom cursor — desktop only */}
      <div
        className="cursor-dot"
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
      />
      <div
        className={`cursor-ring ${cursorHover ? 'cursor-ring--hover' : ''}`}
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
      />

      <Nav activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="main-content">
        <Hero setActiveSection={setActiveSection} />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}
