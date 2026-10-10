// The 6 full-screen HTML sections corresponding to the 6 3D scenes.
// Synchronized with scroll position: 100vh height per section.

import { useEffect, useState, useRef } from 'react'
import SystemWindow from './SystemWindow'
import ProjectSpotlight from './ProjectSpotlight'
import { skills } from '../../data/skills'
import { experience } from '../../data/experience'
import { socials } from '../../data/socials'
import useReducedMotion from '../../hooks/useReducedMotion'
// GSAP Timelines for ARISE reveal and LEVEL UP flash (Phase 5, Task 5).
import { animateAriseReveal, triggerLevelUpAnimation } from '../../utils/animations'
import MonarchFinale from './MonarchFinale'

function Sections({ onSelectProject }) {
  // Dual-mode view for Scene 3 (#projects):
  // '3d': 100% unobstructed view of the 3D Obsidian Monoliths on the ocean horizon
  // 'deck': Interactive multi-slide browser walkthrough showing login, dashboard, and scanner
  const [projectMode, setProjectMode] = useState('3d')
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef(null)

  // Trigger cinematic letter-by-letter reveal on mount
  useEffect(() => {
    animateAriseReveal('.arise-letter')
  }, [])

  // Respect reduced motion on background video
  useEffect(() => {
    if (videoRef.current) {
      if (prefersReducedMotion) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(() => {})
      }
    }
  }, [prefersReducedMotion])

  function scrollToSection(id) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    }
  }

  return (
    <div className="sections-container">
      {/* Full-screen Solo Leveling level-up blue flash */}
      <div className="level-up-flash-overlay" />

      {/* ========================================================
          SCENE 0: HERO SECTION
          ======================================================== */}
      <section className="section" id="hero">
        <SystemWindow title="HUNTER STATUS: AWAKENED">
          <div style={{ textAlign: 'center' }}>
            {/* Candidate Identity Eyebrow */}
            <div className="hero-identity-tag" style={{ color: '#00f0ff', fontSize: '11px', letterSpacing: '0.14em', fontWeight: 700, marginBottom: '6px' }}>
              // SOHIT KUMAR • FULL-STACK & REACT DEVELOPER //
            </div>

            {/* GSAP letter-by-letter animated title */}
            <h1 className="arise-title">
              {'ARISE'.split('').map((char, index) => (
                <span key={index} className="arise-letter">
                  {char}
                </span>
              ))}
            </h1>
            <p
              style={{
                margin: '0 0 10px 0',
                color: '#38bdf8',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              Full-Stack Web Developer & React Engineer
            </p>
            <p
              style={{
                margin: '0 auto 22px auto',
                color: '#9b97b3',
                fontSize: '13px',
                maxWidth: '480px',
                lineHeight: 1.55,
              }}
            >
              MCA Graduate with hands-on internship experience at Innovexis Pvt. Ltd. Specialized in building modern React 19 & Next.js platforms, verified REST APIs, and interactive 3D WebGL experiences.
            </p>

            <div className="contact-buttons">
              <button
                type="button"
                className="btn-cta btn-cta-primary"
                onClick={() => scrollToSection('projects')}
              >
                View Projects ⚡
              </button>
              <button
                type="button"
                className="btn-cta btn-cta-outline"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch →
              </button>
            </div>
          </div>
        </SystemWindow>
      </section>

      {/* ========================================================
          SCENE 1: ABOUT SECTION (Hunter Status Window)
          ======================================================== */}
      <section className="section" id="about">
        <SystemWindow title="HUNTER PROFILE & STATS">
          {/* Animated Sung Jin-Woo Live Wallpaper Holographic Banner */}
          <div className="hunter-avatar-frame">
            <video
              ref={videoRef}
              src="/media/jinwoo-live.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="hunter-avatar-video"
            />
            <div className="hunter-avatar-overlay" />
            <span className="hunter-avatar-badge">⚡ SHADOW MONARCH SYSTEM</span>
          </div>

          <div className="status-grid">
            <div className="status-item">
              <span className="status-label">Hunter Name</span>
              <span className="status-val">Sohit Kumar (Necro)</span>
            </div>
            <div className="status-item">
              <span className="status-label">Role Focus</span>
              <span className="status-val">Full-Stack & AI</span>
            </div>
            <div className="status-item">
              <span className="status-label">Education</span>
              <span className="status-val">MCA (8.67 CGPA)</span>
            </div>
            <div className="status-item">
              <span className="status-label">Availability</span>
              <span className="status-val" style={{ color: '#4ade80' }}>● Open for Roles</span>
            </div>
          </div>
          <p className="status-bio">
            Full-Stack Web Developer and MCA postgraduate with hands-on internship experience at Innovexis Pvt. Ltd.
            Specialized in architecting high-performance React 19 & Next.js 15 platforms, Python APIs, and interactive Three.js/WebGL applications with clean, production-ready code.
          </p>
        </SystemWindow>
      </section>

      {/* ========================================================
          SCENE 2: SKILLS SECTION (Hunter Abilities & Levels)
          ======================================================== */}
      <section className="section" id="skills">
        <SystemWindow title="SYSTEM STATS: SKILL MATRIX">
          {/* Solo Leveling Shadow Monarch Awakening Burst Notification */}
          <div className="level-up-burst-badge">
            ⚡ VERIFIED TECHNICAL COMPETENCIES & PROFICIENCY ⚡
          </div>

          <div className="skills-list">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-row">
                <div className="skill-meta">
                  <span>
                    {skill.name}
                    <span className="skill-category">[{skill.category}]</span>
                  </span>
                  <span className="skill-level-text">Lv. {skill.level} / 10</span>
                </div>
                <div className="skill-track">
                  <div
                    className="skill-fill-bar"
                    data-target-width={`${skill.level * 10}%`}
                    style={{ width: `${skill.level * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Solo Leveling LEVEL UP trigger */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              className="btn-cta btn-cta-primary"
              onClick={triggerLevelUpAnimation}
              style={{ fontSize: '11px', padding: '6px 14px' }}
            >
              ⚡ TRIGGER LEVEL UP
            </button>
          </div>

          {/* Solo Leveling Quest HUD */}
          <div className="daily-quest-card">
            <div className="daily-quest-header">
              <span className="daily-quest-title">⚔️ OBJECTIVES: ENGINEERING SPECIALIZATION</span>
              <span className="daily-quest-status" style={{ color: '#38bdf8' }}>ACTIVE</span>
            </div>
            <ul className="daily-quest-tasks">
              <li><span><span className="quest-check">✓</span> Architect Scalable React 19 & Next.js 15 Platforms</span> <span>[Verified]</span></li>
              <li><span><span className="quest-check">✓</span> Engineer Production APIs, Databases & Cloud Systems</span> <span>[Verified]</span></li>
              <li><span><span className="quest-check">✓</span> Agentic AI & 3D WebGL (IIT Roorkee / Three.js)</span> <span>[In Progress]</span></li>
            </ul>
            <div className="daily-quest-reward">
              🏆 TITLE: Production Full-Stack Engineer
            </div>
          </div>
        </SystemWindow>
      </section>

      {/* ========================================================
          SCENE 3: PROJECTS SECTION (Dual-Mode: 3D Stage & Walkthrough Deck)
          ======================================================== */}
      <section
        className="section"
        id="projects"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: projectMode === '3d' ? 'space-between' : 'flex-start',
          alignItems: 'center',
          padding: '70px 20px 30px 20px',
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Tactical HUD Header Bar */}
        <div className="project-hud-header">
          <span className="project-sector-tag">
            // SECTOR 03: FEATURED ENGINEERING CASE STUDIES //
          </span>

          {/* Interactive Mode Switcher */}
          <div className="project-mode-toggle" role="tablist" aria-label="Projects view mode">
            <button
              type="button"
              role="tab"
              aria-selected={projectMode === '3d'}
              className={`project-mode-btn ${projectMode === '3d' ? 'active' : ''}`}
              onClick={() => setProjectMode('3d')}
            >
              🌌 3D STAGE
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={projectMode === 'deck'}
              className={`project-mode-btn ${projectMode === 'deck' ? 'active' : ''}`}
              onClick={() => setProjectMode('deck')}
            >
              🔍 ARCHITECTURE DECK
            </button>
            {projectMode === 'deck' && (
              <button
                type="button"
                className="project-mode-btn"
                onClick={() => setProjectMode('3d')}
                style={{ color: '#f87171' }}
                title="Return to 3D stage"
              >
                ✕ BACK TO 3D
              </button>
            )}
          </div>
        </div>

        {/* --------------------------------------------------------
            MODE A: 3D STAGE (Default View)
            Keeps the screen completely clear so the 3D Obsidian Monoliths
            floating on the ocean horizon are fully visible & tiltable!
            -------------------------------------------------------- */}
        {projectMode === '3d' && (
          <>
            {/* Transparent Spacer: Allows mouse events to reach 3D Canvas */}
            <div className="project-stage-spacer" />

            {/* Bottom Cyber HUD Banner */}
            <div className="project-stage-footer-hud">
              <div className="stage-hud-meta">
                <span className="stage-hud-icon">⚡</span>
                <span>
                  <strong>3D WANTED MONOLITHS:</strong> Hover to tilt obsidian glass • Click any monolith for deep case study
                </span>
              </div>
              <button
                type="button"
                className="stage-hud-btn"
                onClick={() => setProjectMode('deck')}
              >
                📂 OPEN CASE STUDY DECK ↗
              </button>
            </div>
          </>
        )}

        {/* --------------------------------------------------------
            MODE B: ARCHITECTURE DECK
            Interactive browser walkthrough showing real login, dashboard & scanner
            -------------------------------------------------------- */}
        {projectMode === 'deck' && (
          <ProjectSpotlight
            onSelectProject={onSelectProject}
            onClose={() => setProjectMode('3d')}
          />
        )}
      </section>

      {/* ========================================================
          SCENE 4: JOURNEY SECTION (Sea Route Milestones)
          ======================================================== */}
      <section className="section" id="journey">
        <SystemWindow title="LOG POSE: CAREER & ACADEMIC VOYAGE">
          {/* One Piece Going Merry Expedition Banner */}
          <div className="journey-ship-banner">
            <img src="/media/merry.jpg" alt="Going Merry Voyage" className="journey-ship-img" />
            <div className="journey-ship-overlay" />
            <span className="journey-ship-badge">⚓ LOG POSE EXPEDITION MILESTONES</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {experience.map((item) => (
              <div
                key={item.period}
                style={{
                  borderLeft: '2px solid #0e7c86',
                  paddingLeft: '14px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 'bold' }}>
                  {item.period} — <span style={{ color: '#0e7c86' }}>{item.role}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#e9e7f5', marginTop: '2px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '12px', color: '#9b97b3', marginTop: '3px', lineHeight: 1.4 }}>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </SystemWindow>
      </section>

      {/* ========================================================
          SCENE 5: CONTACT SECTION (Final Summons)
          ======================================================== */}
      <section className="section" id="contact">
        <SystemWindow title="SYSTEM TRANSMISSION: CONTACT">
          <div style={{ textAlign: 'center' }}>
            {/* One Piece Animated Transponder Snail Communicator */}
            <div className="den-den-mushi-box">
              <span className="den-den-mushi-icon" role="img" aria-label="Direct Communication Channel">🐌📞</span>
              <div className="den-den-mushi-text">
                <span className="den-den-ring">COMMUNICATION FREQUENCY // ACTIVE</span>
                <span className="den-den-sub">OPEN FOR FULL-STACK ROLES & INQUIRIES</span>
              </div>
            </div>

            <h2
              style={{
                margin: '0 0 8px 0',
                fontSize: '22px',
                color: '#e9e7f5',
                letterSpacing: '0.08em',
              }}
            >
              READY TO COLLABORATE?
            </h2>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#9b97b3', maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55 }}>
              Actively seeking full-stack engineering roles, frontend development, and technical opportunities. Fast response via direct email or LinkedIn.
            </p>

            <div className="contact-buttons">
              <a
                href={socials.email}
                className="btn-cta btn-cta-primary"
                aria-label="Send Email to Sohit Kumar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Send Email
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta-outline"
                aria-label="Open GitHub Profile"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </a>
            </div>
          </div>
        </SystemWindow>
      </section>

      {/* ========================================================
          GRAND FINALE: THE MONARCH THRONE & TELEPORT TO TOP
          ======================================================== */}
      <MonarchFinale />
    </div>
  )
}

export default Sections
