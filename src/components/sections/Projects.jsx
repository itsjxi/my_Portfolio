import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { ExternalLink, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../../data/content.js';
import { useReveal } from '../../hooks/useReveal.js';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './Projects.css';

export default function Projects() {
  const ref = useReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const active = PROJECTS[activeIndex];

  return (
    <section id="projects" className="section projects-section">
      <div ref={ref} className="reveal-up">
        <p className="section-eyebrow">Projects</p>
        <h2 className="section-title">Selected work</h2>
        <p className="section-subtitle">
          Side projects and experiments — each one a lesson in architecture, performance, and craft.
        </p>
      </div>

      {/* 3D Carousel */}
      <div className="carousel-container">
        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop
          speed={800}
          autoplay={{ delay: 4000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2,
            slideShadows: false,
          }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="projects-swiper"
        >
          {PROJECTS.map((project, i) => (
            <SwiperSlide key={project.id} className="project-slide">
              <div className="slide-card">
                <div className="slide-image-wrap">
                  <img src={project.image} alt={project.title} className="slide-image" />
                  <div className="slide-overlay">
                    <span className="slide-number">{String(i + 1).padStart(2, '0')}</span>
                    <div className="slide-actions">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="slide-action-btn" data-cursor>
                        <ExternalLink size={14} />
                        <span>Live</span>
                      </a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="slide-action-btn ghost" data-cursor>
                        <Code2 size={14} />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                  {project.featured && <span className="slide-badge">Featured</span>}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation arrows */}
        <button
          className="carousel-nav prev"
          onClick={() => swiperRef.current?.slidePrev()}
          data-cursor
          aria-label="Previous project"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="carousel-nav next"
          onClick={() => swiperRef.current?.slideNext()}
          data-cursor
          aria-label="Next project"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="carousel-dots">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${activeIndex === i ? 'active' : ''}`}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Active project detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="project-detail"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="detail-left">
            <div className="detail-meta">
              <span className="detail-year">{active.year}</span>
              <span className="detail-divider">·</span>
              <span className="detail-type">{active.subtitle}</span>
            </div>
            <h3 className="detail-title">{active.title}</h3>
            <p className="detail-desc">{active.desc}</p>
            <div className="detail-tags">
              {active.tags.map((t, i) => (
                <span key={i} className="tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="detail-right">
            <a href={active.demo} target="_blank" rel="noopener noreferrer" className="detail-btn primary" data-cursor>
              <ExternalLink size={14} />
              Live Demo
            </a>
            <a href={active.github} target="_blank" rel="noopener noreferrer" className="detail-btn ghost" data-cursor>
              <Code2 size={14} />
              Source Code
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
