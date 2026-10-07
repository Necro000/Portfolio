// Phase 4, Task 2: Project Detail Modal.
// Opens when a user clicks any 3D Wanted Poster or teaser card.

import { useEffect } from 'react'

function ProjectModal({ project, onClose }) {
  // Close the modal when the user presses the 'Escape' key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  return (
    <div
      className="modal-backdrop"
      onClick={onClose} // Clicking the backdrop closes the modal
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside dialog from closing it
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">{project.title}</h2>
            <span className="modal-bounty-badge">{project.bounty}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Screenshot Preview (Optimized .webp loaded from public/projects/) */}
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
                alt={`${project.title} screenshot`}
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

          <p className="modal-description">{project.description}</p>

          {/* Tech stack badges */}
          <div className="tech-tags">
            {project.tech.map((tag) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links (Live demo & GitHub repository) */}
          <div className="modal-actions">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="btn-cta btn-cta-primary"
              >
                Launch Live Demo ↗
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
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
