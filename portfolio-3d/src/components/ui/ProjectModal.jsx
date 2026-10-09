import { useState, useEffect, useRef } from 'react'

function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('walkthrough')
  const [slideIndex, setSlideIndex] = useState(0)
  const modalContentRef = useRef(null)
  const previousActiveElement = useRef(null)

  // Save previously active element for focus restoration
  useEffect(() => {
    previousActiveElement.current = document.activeElement

    // Prevent body scrolling while modal is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus close button or first focusable element inside modal
    if (modalContentRef.current) {
      const focusable = modalContentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length > 0) {
        focusable[0].focus()
      }
    }

    return () => {
      document.body.style.overflow = prevOverflow
      if (previousActiveElement.current && previousActiveElement.current.focus) {
        previousActiveElement.current.focus()
      }
    }
  }, [])

  const slides = project?.slides || [
    {
      label: 'OVERVIEW',
      title: project?.title || 'Project Overview',
      url: project?.links?.live || '',
      image: project?.thumbnail || '',
      caption: project?.description || '',
      isLive: Boolean(project?.links?.live),
    },
  ]
  const currentSlide = slides[slideIndex] || slides[0]

  // Keyboard navigation: Escape to close, ArrowLeft/Right for slides, Tab focus trap
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowLeft') {
        setSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
      } else if (e.key === 'ArrowRight') {
        setSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'Tab') {
        // Focus trap inside modal
        if (!modalContentRef.current) return
        const focusable = modalContentRef.current.querySelectorAll(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return

        const firstElement = focusable[0]
        const lastElement = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, slides.length])

  if (!project) return null

  function handlePrevSlide() {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
  }

  function handleNextSlide() {
    setSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose} // Clicking backdrop closes modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        ref={modalContentRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent bubbling
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="project-modal-title" className="modal-title">
              {project.title}
            </h2>
            <span className="modal-category-badge">{project.badge || project.category}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close project modal dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Interactive Inspection Tab Navigation */}
          <div className="modal-tab-bar" role="tablist" aria-label="Project details inspection tabs">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'walkthrough'}
              id="tab-walkthrough"
              aria-controls="panel-walkthrough"
              className={`modal-tab-btn ${activeTab === 'walkthrough' ? 'active' : ''}`}
              onClick={() => setActiveTab('walkthrough')}
            >
              [ 1. LIVE USER JOURNEY ]
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'casestudy'}
              id="tab-casestudy"
              aria-controls="panel-casestudy"
              className={`modal-tab-btn ${activeTab === 'casestudy' ? 'active' : ''}`}
              onClick={() => setActiveTab('casestudy')}
            >
              [ 2. CASE STUDY DOSSIER ]
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'architecture'}
              id="tab-architecture"
              aria-controls="panel-architecture"
              className={`modal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              [ 3. SPECS & HIGHLIGHTS ]
            </button>
          </div>

          {/* TAB 1: LIVE USER JOURNEY (Browser frame with real screenshots) */}
          {activeTab === 'walkthrough' && (
            <div
              id="panel-walkthrough"
              role="tabpanel"
              aria-labelledby="tab-walkthrough"
              className="spotlight-media-frame"
              style={{ border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '4px' }}
            >
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

              {/* Interactive Slide Selector Pills */}
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

              {/* High-Resolution Screenshot Display */}
              <div className="spotlight-image-container">
                <img
                  key={currentSlide.image}
                  src={currentSlide.image}
                  alt={`${project.title} - ${currentSlide.title}`}
                  className="spotlight-screenshot"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = '/projects/sample.jpg'
                  }}
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
                  <span className="caption-tag">STAGE {slideIndex + 1}/{slides.length}:</span>
                  <span className="caption-text">{currentSlide.caption}</span>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="spotlight-telemetry-bar">
                <span>STAGE: {currentSlide.title.toUpperCase()}</span>
                <span>STATUS: {project.status}</span>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED CASE STUDY DOSSIER */}
          {activeTab === 'casestudy' && (
            <div
              id="panel-casestudy"
              role="tabpanel"
              aria-labelledby="tab-casestudy"
              style={{ padding: '8px 0' }}
            >
              {project.tagline && (
                <div style={{ fontSize: '13px', color: '#38bdf8', marginBottom: '14px', fontWeight: 600 }}>
                  ⚡ {project.tagline}
                </div>
              )}

              {/* Problem Statement */}
              {project.problem && (
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#f87171', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '4px' }}>
                    [ PROBLEM IDENTIFIED ]
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#4ade80', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '4px' }}>
                    [ ARCHITECTURAL SOLUTION ]
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Developer Contribution */}
              {project.contribution && (
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#38bdf8', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '4px' }}>
                    [ MY ENGINEERING CONTRIBUTION ]
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {project.contribution}
                  </p>
                </div>
              )}

              {/* Challenges & Outcomes */}
              {(project.challenges || project.outcomes) && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {project.challenges && (
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                      <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '4px' }}>
                        TECHNICAL CHALLENGE:
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 }}>
                        {project.challenges}
                      </p>
                    </div>
                  )}
                  {project.outcomes && (
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '4px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                      <div style={{ fontSize: '11px', color: '#4ade80', fontWeight: 'bold', marginBottom: '4px' }}>
                        VERIFIED OUTCOME:
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 }}>
                        {project.outcomes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ARCHITECTURE & SPECS */}
          {activeTab === 'architecture' && (
            <div
              id="panel-architecture"
              role="tabpanel"
              aria-labelledby="tab-architecture"
              style={{ padding: '8px 0' }}
            >
              <div style={{ fontSize: '13px', color: '#38bdf8', marginBottom: '12px', fontWeight: 'bold' }}>
                ENGINEERING ROLE: {project.role || 'Full-Stack Developer'}
              </div>

              {/* Key Architecture Milestones */}
              {project.highlights && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '6px' }}>
                    KEY HIGHLIGHTS:
                  </div>
                  <ul className="dossier-highlights-list">
                    {project.highlights.map((item, i) => (
                      <li key={i}>
                        <span className="highlight-icon" aria-hidden="true">⚡</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ fontSize: '11px', color: '#e9e7f5', marginBottom: '6px', letterSpacing: '0.1em' }}>
                EQUIPPED TECH STACK:
              </div>
              <div className="tech-tags">
                {project.tech.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '16px', fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>
                {project.description}
              </div>
            </div>
          )}

          {/* Action Links (Live demo & GitHub repository) */}
          <div className="modal-actions">
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta-primary"
              >
                Launch Live App ↗
              </a>
            ) : (
              <span
                style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  padding: '8px 12px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  borderRadius: '4px',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                }}
              >
                📍 Experience: Interactive 3D Canvas Active
              </span>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta-outline"
              >
                View Source Code ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
