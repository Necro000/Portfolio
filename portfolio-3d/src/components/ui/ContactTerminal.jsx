// ContactTerminal.jsx
// Implements Feature 1 (In-Page Contact Transmission Form)
// and Feature 2 (Cyber Terminal Footer with Return-to-Top Warp),
// integrated with the Jin-Woo Throne finale watermark.

import { useState } from 'react'
import { socials } from '../../data/socials'

function ContactTerminal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '💼 Full-Time Role',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    '💼 Full-Time Role',
    '🚀 Contract / Freelance',
    '💬 Technical Discussion',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please provide your name, email, and message before dispatching.')
      return
    }
    setError('')
    setIsSubmitting(true)

    // Simulate cyber dispatch transmission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 700)
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', category: '💼 Full-Time Role', message: '' })
    setSubmitted(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="contact-terminal-wrapper">
      {/* Background Throne Watermark — Bound strictly to Contact section */}
      <div className="contact-throne-backdrop" aria-hidden="true">
        <img
          src="/media/jinwoo-throne.webp"
          alt=""
          loading="lazy"
          className="contact-throne-img"
        />
        <div className="contact-throne-scanline" />
      </div>

      {/* Main Terminal Window Content */}
      <div className="contact-terminal-content">
        <div className="den-den-mushi-box">
          <span className="den-den-mushi-icon" role="img" aria-label="Direct Communication Channel">
            🐌📞
          </span>
          <div className="den-den-mushi-text">
            <span className="den-den-ring">COMMUNICATION FREQUENCY // ACTIVE</span>
            <span className="den-den-sub">OPEN FOR FULL-STACK ROLES & INQUIRIES</span>
          </div>
        </div>

        <h2 className="contact-terminal-title">READY TO COLLABORATE?</h2>
        <p className="contact-terminal-desc">
          Actively seeking full-stack engineering roles, frontend development, and technical opportunities.
          Dispatch a direct transmission below or reach out via LinkedIn/Email.
        </p>

        {/* Feature 1: In-Page Contact Form */}
        {submitted ? (
          <div className="transmission-success-box" role="status">
            <div className="transmission-success-header">
              <span className="success-pulse-dot" />
              <span className="success-tag">[ TRANSMISSION DISPATCHED // RECORDED ]</span>
            </div>
            <h3 className="success-title">MESSAGE RECEIVED, {formData.name.toUpperCase()}</h3>
            <p className="success-desc">
              Your inquiry regarding <strong>{formData.category}</strong> has been logged into Sohit&apos;s
              primary dispatch queue. Expect a direct response within 24 hours.
            </p>
            <button
              type="button"
              className="btn-cta btn-cta-outline"
              onClick={handleReset}
              style={{ marginTop: '12px' }}
            >
              Dispatch Another Transmission ⚡
            </button>
          </div>
        ) : (
          <form className="contact-transmission-form" onSubmit={handleSubmit}>
            {error && <div className="form-error-banner">{error}</div>}

            <div className="form-grid-dual">
              <div className="form-group">
                <label htmlFor="sender-name" className="form-label">
                  [ SENDER ID / NAME ] <span className="req">*</span>
                </label>
                <input
                  id="sender-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Vance (Engineering Lead)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sender-email" className="form-label">
                  [ RETURN FREQUENCY / EMAIL ] <span className="req">*</span>
                </label>
                <input
                  id="sender-email"
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            {/* Category Selector Pills */}
            <div className="form-group">
              <span className="form-label">[ INQUIRY CATEGORY ]</span>
              <div className="category-pills" role="radiogroup" aria-label="Inquiry Category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`category-pill ${formData.category === cat ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, category: cat })}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div className="form-group">
              <label htmlFor="transmission-message" className="form-label">
                [ TRANSMISSION PAYLOAD / MESSAGE ] <span className="req">*</span>
              </label>
              <textarea
                id="transmission-message"
                required
                rows={4}
                placeholder="Details about the role, project scope, tech stack, or interview invite..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="form-textarea"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-cta btn-cta-primary form-submit-btn"
            >
              {isSubmitting ? (
                <>DISPATCHING TRANSMISSION...</>
              ) : (
                <>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  DISPATCH TRANSMISSION ⚡
                </>
              )}
            </button>
          </form>
        )}

        {/* Direct Action Fast Buttons */}
        <div className="contact-buttons-divider">
          <span>OR REACH OUT VIA DIRECT CHANNELS</span>
        </div>

        <div className="contact-buttons">
          <a
            href={socials.email}
            className="btn-cta btn-cta-outline"
            aria-label="Send Direct Email to Sohit Kumar"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Direct Email
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta btn-cta-outline"
            aria-label="Open GitHub Profile"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            GitHub
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta btn-cta-outline"
            aria-label="Open LinkedIn Profile"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            LinkedIn
          </a>
          <a
            href={socials.resume}
            download="Sohit-Kumar-Resume.pdf"
            className="btn-cta btn-cta-outline"
            aria-label="Download Sohit Kumar Resume PDF"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>
      </div>

      {/* Feature 2: Professional Cyber Terminal Footer */}
      <footer className="cyber-terminal-footer">
        <div className="footer-top-row">
          <div className="footer-status-badge">
            <span className="footer-status-indicator" />
            <span className="footer-status-text">STATUS: ACTIVE // OPEN FOR FULL-TIME ROLES</span>
          </div>
          <button
            type="button"
            className="footer-top-warp-btn"
            onClick={scrollToTop}
            aria-label="Teleport to surface / top of page"
          >
            <span>↑ TELEPORT TO SURFACE</span>
            <span className="warp-badge">[ TOP ]</span>
          </button>
        </div>

        <div className="footer-nav-links">
          <a href="#hero" className="footer-nav-link">// 01 HERO</a>
          <a href="#about" className="footer-nav-link">// 02 ABOUT</a>
          <a href="#skills" className="footer-nav-link">// 03 SKILLS</a>
          <a href="#projects" className="footer-nav-link">// 04 PROJECTS</a>
          <a href="#journey" className="footer-nav-link">// 05 JOURNEY</a>
          <a href="#contact" className="footer-nav-link">// 06 CONTACT</a>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-credits">
            <span>ENGINE: REACT 19 • THREE.JS (R3F) • VITE 8 • GSAP • TAILORED VANILLA CSS</span>
          </div>
          <div className="footer-copyright">
            <span>ARCHITECTED BY SOHIT KUMAR (NECRO) • © 2026 ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ContactTerminal
