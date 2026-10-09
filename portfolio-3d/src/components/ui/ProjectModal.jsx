import { useState, useEffect } from 'react'

function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('walkthrough')
  const [slideIndex, setSlideIndex] = useState(0)

  // Close the modal when the user presses the 'Escape' key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  const slides = project.slides || [
    {
      label: 'OVERVIEW',
      title: project.title,
      url: project.links?.live || '',
      image: project.thumbnail,
      caption: project.description,
    },
  ]
  const currentSlide = slides[slideIndex] || slides[0]

  function handlePrevSlide() {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
  }

  function handleNextSlide() {
    setSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose} // Clicking the backdrop closes the modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside dialog from closing it
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="project-modal-title" className="modal-title">{project.title}</h2>
            <span className="modal-bounty-badge">{project.bounty}</span>
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
          <div className="modal-tab-bar" role="tablist">
            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'walkthrough' ? 'active' : ''}`}
              onClick={() => setActiveTab('walkthrough')}
            >
              [ 1. LIVE USER JOURNEY ]
            </button>
            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              [ 2. SPECS & HIGHLIGHTS ]
            </button>
            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              [ 3. SYSTEM OVERVIEW ]
            </button>
          </div>

          {/* TAB 1: LIVE USER JOURNEY (Browser frame with real screenshots) */}
          {activeTab === 'walkthrough' && (
            <div className="spotlight-media-frame" style={{ border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '4px' }}>
              {/* Cybernetic Browser Topbar */}
              <div className="spotlight-browser-bar">
                <div className="browser-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="browser-url-pill">
                  <span className="url-lock">🔒</span>
                  <span className="url-text">{currentSlide.url}</span>
                </div>
                <span className="live-status-pill">● LIVE</span>
              </div>

              {/* Interactive Slide Selector Pills */}
              <div className="spotlight-slide-pills">
                {slides.map((s, sIdx) => (
                  <button
                    key={s.label}
                    type="button"
                    className={`slide-pill-btn ${slideIndex === sIdx ? 'active' : ''}`}
                    onClick={() => setSlideIndex(sIdx)}
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
                />

                {/* Slider Arrow Controls */}
                {slides.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="slide-nav-arrow prev"
                      onClick={handlePrevSlide}
                      aria-label="Previous view"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="slide-nav-arrow next"
                      onClick={handleNextSlide}
                      aria-label="Next view"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Floating Context Caption */}
                <div className="slide-floating-caption">
                  <span className="caption-tag">STAGE {slideIndex + 1}/{slides.length}:</span>
                  <span className="caption-text">{currentSlide.caption}</span>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="spotlight-telemetry-bar">
                <span>STAGE: {currentSlide.title.toUpperCase()}</span>
                <span>BOUNTY: {project.bounty}</span>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE & SPECS */}
          {activeTab === 'architecture' && (
            <div style={{ padding: '8px 0' }}>
              <div style={{ fontSize: '13px', color: '#38bdf8', marginBottom: '8px', fontWeight: 'bold' }}>
                HUNTER ROLE: {project.role || 'Full-Stack Developer'}
              </div>

              {/* Key Architecture Milestones */}
              {project.highlights && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '6px' }}>
                    ENGINEERING HIGHLIGHTS:
                  </div>
                  <ul className="dossier-highlights-list">
                    {project.highlights.map((item, i) => (
                      <li key={i}>
                        <span className="highlight-icon">⚡</span>
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
            </div>
          )}

          {/* TAB 3: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {project.thumbnail && (
                <div
                  style={{
                    width: '100%',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    border: '1px solid rgba(58, 183, 255, 0.35)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} cover`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      aspectRatio: '16 / 9',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}
              <p className="modal-description" style={{ marginTop: '14px' }}>{project.description}</p>
            </>
          )}

          {/* Action Links (Live demo & GitHub repository) */}
          <div className="modal-actions">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta-primary"
              >
                Launch Live Demo ↗
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta-outline"
              >
                View Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
