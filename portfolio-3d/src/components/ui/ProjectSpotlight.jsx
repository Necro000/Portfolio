// Phase 4 & Awwwards Spotlight: Crystal-Clear Project Engineering Showcase.
// Features an interactive multi-slide browser walkthrough showing the complete user journey:
// From Gateway Authentication -> Logged-In User Dashboard -> Deep Inspection Workspace.

import { useState, useEffect } from 'react'
import { projects } from '../../data/projects'

function ProjectSpotlight({ onSelectProject, onClose }) {
  const [projectIndex, setProjectIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)

  const project = projects[projectIndex] || projects[0]
  const slides = project.slides || [
    {
      label: 'OVERVIEW',
      title: project.title,
      url: project.links.live || 'https://production-app.vercel.app',
      image: project.thumbnail,
      caption: project.description,
      isLive: Boolean(project.links.live),
    },
  ]

  const currentSlide = slides[slideIndex] || slides[0]

  function handleProjectChange(newIndex) {
    setProjectIndex(newIndex)
    setSlideIndex(0) // Reset slide to first when switching projects
  }

  function handlePrevSlide() {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
  }

  function handleNextSlide() {
    setSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
  }

  // Keyboard controls for slides when in spotlight mode
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft') {
        setSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
      } else if (e.key === 'ArrowRight') {
        setSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [slides.length])

  return (
    <div className="project-spotlight-deck">
      {/* 1. Tactical Project Selector Tabs & Close Button */}
      <div className="spotlight-tabs-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '8px' }}>
        <div className="spotlight-tabs" role="tablist" aria-label="Project Selection">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={projectIndex === idx}
              className={`spotlight-tab-btn ${projectIndex === idx ? 'active' : ''}`}
              onClick={() => handleProjectChange(idx)}
            >
              <span className="tab-idx">0{idx + 1} //</span>
              <span className="tab-title">{p.title}</span>
            </button>
          ))}
        </div>
        {onClose && (
          <button
            type="button"
            className="btn-spotlight-outline"
            onClick={onClose}
            style={{ fontSize: '11px', padding: '6px 12px', whiteSpace: 'nowrap' }}
            title="Return to 3D monolith stage"
          >
            ✕ Close Deck
          </button>
        )}
      </div>

      {/* 2. Main Dual-Column Showcase */}
      <div className="spotlight-display-card">
        {/* LEFT COLUMN: Large, Razor-Sharp Interactive Browser Walkthrough Slider */}
        <div className="spotlight-media-frame">
          {/* Cybernetic Browser Topbar */}
          <div className="spotlight-browser-bar">
            <div className="browser-dots" aria-hidden="true">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="browser-url-pill">
              <span className="url-lock" aria-hidden="true">🔒</span>
              <span className="url-text">{currentSlide.url}</span>
            </div>
            <span
              className="live-status-pill"
              style={{
                color: currentSlide.isLive ? '#4ade80' : '#38bdf8',
                borderColor: currentSlide.isLive ? 'rgba(74, 222, 128, 0.4)' : 'rgba(56, 189, 248, 0.4)',
              }}
            >
              {currentSlide.isLive ? '● LIVE APP' : '● SCREENSHOT'}
            </span>
          </div>

          {/* Interactive Slide Selector Pills (User Journey Stages) */}
          <div className="spotlight-slide-pills" role="group" aria-label="Slide view selector">
            {slides.map((s, sIdx) => (
              <button
                key={s.label}
                type="button"
                className={`slide-pill-btn ${slideIndex === sIdx ? 'active' : ''}`}
                onClick={() => setSlideIndex(sIdx)}
                aria-label={`View slide ${sIdx + 1}: ${s.label}`}
              >
                <span className="slide-pill-num">0{sIdx + 1}</span> {s.label}
              </button>
            ))}
          </div>

          {/* High-Resolution Screenshot Display with Slider Controls */}
          <div className="spotlight-image-container">
            <img
              key={currentSlide.image}
              src={currentSlide.image}
              alt={`${project.title} - ${currentSlide.title}`}
              className="spotlight-screenshot"
              loading="eager"
            />

            {/* Slider Arrow Controls */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  className="slide-nav-arrow prev"
                  onClick={handlePrevSlide}
                  aria-label="Previous view (Left arrow)"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="slide-nav-arrow next"
                  onClick={handleNextSlide}
                  aria-label="Next view (Right arrow)"
                >
                  ›
                </button>
              </>
            )}

            {/* Floating Context Caption */}
            <div className="slide-floating-caption" aria-live="polite">
              <span className="caption-tag">VIEW {slideIndex + 1}/{slides.length}:</span>
              <span className="caption-text">{currentSlide.caption}</span>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="spotlight-telemetry-bar">
            <span>STAGE: {currentSlide.title.toUpperCase()}</span>
            <span>STATUS: {project.status}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Engineering Dossier */}
        <div className="spotlight-dossier">
          <div className="dossier-category">{project.category}</div>
          <h3 className="dossier-title">{project.title}</h3>

          <p className="dossier-description">{project.description}</p>

          {/* Problem / Solution overview snippet if present */}
          {project.problem && (
            <div style={{ marginBottom: '12px', fontSize: '11px', color: '#cbd5e1', lineHeight: 1.4 }}>
              <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>SOLUTION: </span>
              {project.solution}
            </div>
          )}

          {/* Key Architecture Milestones */}
          <div className="dossier-highlights-block">
            <div className="highlights-header">ENGINEERING HIGHLIGHTS:</div>
            <ul className="dossier-highlights-list">
              {project.highlights &&
                project.highlights.map((item, i) => (
                  <li key={i}>
                    <span className="highlight-icon" aria-hidden="true">⚡</span>
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Equipped Tech Stack Badges */}
          <div className="dossier-tech-row">
            {project.tech.map((t) => (
              <span key={t} className="dossier-tech-pill">
                {t}
              </span>
            ))}
          </div>

          {/* Direct Action Buttons */}
          <div className="dossier-actions">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-spotlight-primary"
              >
                🚀 Launch Live App ↗
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-spotlight-secondary"
              >
                💻 View Source Code ↗
              </a>
            )}
            {onSelectProject && (
              <button
                type="button"
                className="btn-spotlight-outline"
                onClick={() => onSelectProject(project)}
              >
                🔍 Full Case Study
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectSpotlight
