// The 6 full-screen HTML sections corresponding to the 6 3D scenes.
// Synchronized with scroll position: 100vh height per section.

import { useEffect, useState, useRef } from 'react'
import SystemWindow from './SystemWindow'
import ProjectSpotlight from './ProjectSpotlight'
import { skills } from '../../data/skills'
import { experience } from '../../data/experience'
import useReducedMotion from '../../hooks/useReducedMotion'
// GSAP Timelines for ARISE reveal (Phase 5, Task 5).
import { animateAriseReveal } from '../../utils/animations'
import MonarchFinale from './MonarchFinale'
import { socials } from '../../data/socials'

function Sections({ onSelectProject }) {
  // Dual-mode view for Scene 3 (#projects):
  // '3d': 100% unobstructed view of the 3D Obsidian Monoliths on the ocean horizon
  // 'deck': Interactive multi-slide browser walkthrough showing login, dashboard, and scanner
  const [projectMode, setProjectMode] = useState('3d')
  const [copied, setCopied] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef(null)

  function handleCopyEmail() {
    const rawEmail = socials.email.replace('mailto:', '')
    navigator.clipboard.writeText(rawEmail).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

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
              // SOHIT KUMAR • FULL-STACK & AGENTIC AI DEVELOPER //
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
              Full-Stack Web Developer & Agentic Systems Engineer
            </p>
            <p
              className="hero-bio-desc"
              style={{
                margin: '0 auto 22px auto',
                color: '#9b97b3',
                fontSize: '13px',
                maxWidth: '480px',
                lineHeight: 1.55,
              }}
            >
              <strong>MCA Scholar</strong> & <strong>Agentic Systems Engineer (IIT Roorkee / iHUB)</strong> with hands-on internship experience at <strong>Innovexis Pvt. Ltd.</strong> Specialized in building modern <strong>React 19 & Next.js 15 platforms</strong>, verified <strong>REST APIs</strong>, and interactive <strong>3D WebGL experiences</strong>.
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
          {/* Sung Jin-Woo S-Rank Shadow Monarch Armor Portrait */}
          <div className="hunter-portrait-showcase">
            <div className="hunter-portrait-glow" />
            <img
              src="/media/jinwoo-monarch-armor.png"
              alt="Sung Jin-Woo S-Rank Shadow Monarch Armor"
              className="hunter-portrait-img"
              loading="lazy"
            />
            <span className="hunter-avatar-badge">⚡ S-RANK SHADOW MONARCH</span>
          </div>

          <div className="status-grid">
            <div className="status-item">
              <span className="status-label">Hunter Name</span>
              <span className="status-val">Sohit Kumar (Necro)</span>
            </div>
            <div className="status-item">
              <span className="status-label">Role Focus</span>
              <span className="status-val">Full-Stack & Agentic AI</span>
            </div>
            <div className="status-item">
              <span className="status-label">Education</span>
              <span className="status-val">MCA (8.67) & IITR iHUB</span>
            </div>
            <div className="status-item">
              <span className="status-label">Availability</span>
              <span className="status-val" style={{ color: '#4ade80' }}>● Open for Roles</span>
            </div>
          </div>
          <p className="status-bio">
            <strong>Full-Stack Web Developer</strong> and <strong>MCA postgraduate</strong> certified in <strong>Agentic Systems & Design (iHUB Divyasampark, IIT Roorkee)</strong> with hands-on internship experience at <strong>Innovexis Pvt. Ltd.</strong> Specialized in architecting high-performance <strong>React 19 & Next.js 15 platforms</strong>, <strong>autonomous agentic workflows</strong>, <strong>Python APIs</strong>, and interactive <strong>Three.js/WebGL applications</strong> with <strong>clean, production-ready code</strong>.
          </p>
        </SystemWindow>
      </section>

      {/* ========================================================
          SCENE 2: SKILLS SECTION (Hunter Abilities & Levels)
          ======================================================== */}
      <section className="section" id="skills">
        <SystemWindow
          title="SYSTEM STATS: HUNTER SKILL MATRIX"
          style={{ maxWidth: '640px', width: '100%' }}
        >
          {/* 1. Solo Leveling Shadow Monarch Awakening Status */}
          <div className="skills-awakening-card">
            <div className="skills-awakening-avatar-wrap">
              <div className="skills-awakening-glow" />
              <img
                src="/media/jinwoo-awakening.webp"
                alt="Awakened Shadow Monarch Mana"
                className="skills-awakening-avatar-img"
                loading="lazy"
              />
            </div>
            <div className="skills-awakening-meta">
              <span className="skills-awakening-tag">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                S-RANK SHADOW MONARCH // LEVEL MAX
              </span>
              <span className="skills-awakening-title">HUNTER: SOHIT KUMAR (NECRO)</span>
              <span className="skills-awakening-desc">Mana Surge Active • 6 Verified Engineering Masteries</span>
            </div>
          </div>

          {/* 2. Full-Width 6-Tier Core Skill Mastery List */}
          <div className="skills-list">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`skill-row theme-${skill.theme} ${skill.highlight ? 'skill-highlight-row' : ''}`}
              >
                <div className="skill-meta">
                  <div className="skill-name-group">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-category">[{skill.category}]</span>
                  </div>
                  <div className="skill-badge-group">
                    <span className="skill-badge-pill">{skill.badge}</span>
                    <span className="skill-level-text">Lv. {skill.level} / 10</span>
                  </div>
                </div>
                <div className="skill-track">
                  <div
                    className={`skill-fill-bar bar-${skill.theme}`}
                    data-target-width={`${skill.level * 10}%`}
                    style={{ width: `${skill.level * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 3. Solo Leveling Quest HUD */}
          <div className="daily-quest-card">
            <div className="daily-quest-header">
              <div className="quest-header-title">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
                  <line x1="13" y1="19" x2="19" y2="13" />
                  <line x1="16" y1="16" x2="20" y2="20" />
                  <line x1="19" y1="21" x2="21" y2="19" />
                </svg>
                <span className="daily-quest-title">OBJECTIVES: ENGINEERING SPECIALIZATION</span>
              </div>
              <span className="daily-quest-status">ACTIVE</span>
            </div>

            <ul className="daily-quest-tasks">
              <li>
                <span className="task-name">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="quest-svg-check" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  Architect Scalable React 19 & Next.js Platforms
                </span>
                <span className="task-pill verified">[Verified]</span>
              </li>
              <li>
                <span className="task-name">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="quest-svg-check" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  Engineer Production APIs, Databases & Cloud
                </span>
                <span className="task-pill verified">[Verified]</span>
              </li>
              <li>
                <span className="task-name">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="quest-svg-check" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  Autonomous Agentic AI (IIT Roorkee / iHUB)
                </span>
                <span className="task-pill certified">[Certified]</span>
              </li>
            </ul>

            <div className="daily-quest-reward">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
              <span>TITLE: Full-Stack & Agentic Engineer</span>
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
          overflow: 'hidden',
          position: 'relative',
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
        <SystemWindow
          title="LOG POSE: CAREER & ACADEMIC VOYAGE"
          style={{ maxWidth: '880px', width: '100%' }}
        >
          <div className="journey-navigator-layout">
            {/* Left Column (~65%): All 4 Career & Academic Milestones */}
            <div className="journey-milestones-col">
              <div className="journey-milestones-header">
                <span className="journey-milestones-pulse" />
                <span className="journey-milestones-tag">
                  ● EXPEDITION ARCHIVE // 4 MILESTONES RECORDED
                </span>
              </div>

              <div className="journey-milestones-list">
                {experience.map((item) => (
                  <div
                    key={item.period}
                    className={`journey-milestone-item ${item.isCurrent ? 'active-protocol' : ''}`}
                  >
                    <div className="journey-milestone-meta">
                      <span className="journey-milestone-period">{item.period}</span>
                      <span className="journey-milestone-role">— {item.role}</span>
                      {item.isCurrent && (
                        <span className="journey-active-badge">
                          <span className="journey-active-dot" />
                          ACTIVE PROTOCOL
                        </span>
                      )}
                    </div>
                    <div className="journey-milestone-title">{item.title}</div>
                    <div
                      className="journey-milestone-desc"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (~35%): Going Merry Portrait Hologram */}
            <div className="journey-poster-col">
              <div className="journey-holo-frame">
                {/* Holographic Ambient Glow */}
                <div className="journey-holo-glow" />

                {/* Corner HUD Bracket Accents */}
                <span className="holo-corner top-left" />
                <span className="holo-corner top-right" />
                <span className="holo-corner bottom-left" />
                <span className="holo-corner bottom-right" />

                <img
                  src="/media/merry.jpg"
                  alt="Going Merry — Freedom on the Grand Line"
                  className="journey-portrait-img"
                  loading="lazy"
                />

                {/* Bottom Navigator Status Tag */}
                <div className="journey-holo-caption">
                  <span className="journey-holo-icon">🧭</span>
                  <span className="journey-holo-text">LOG POSE // GRAND LINE VOYAGE</span>
                </div>
              </div>
            </div>
          </div>
        </SystemWindow>
      </section>

      {/* ========================================================
          SCENE 5: CONTACT SECTION (Tactical Dispatch Hub)
          ======================================================== */}
      <section className="section section-contact" id="contact">
        <SystemWindow
          title="SYSTEM TRANSMISSION // HUNTER DISPATCH"
          style={{ maxWidth: '880px', width: '100%' }}
        >
          <div className="contact-dispatch-hub">
            {/* Split Layout: Left Column (Throne Hologram), Right Column (Dispatch Console) */}
            <div className="contact-split-layout">
              {/* Left Column: Sung Jin-Woo on the Throne Showcase */}
              <div className="contact-throne-col">
                <div className="contact-throne-stage">
                  <div className="contact-throne-glow" />
                  <img
                    src="/media/jinwoo-throne.webp"
                    alt="Sung Jin-Woo on the Throne - System Dispatch"
                    className="contact-throne-img"
                    loading="lazy"
                  />
                  <div className="contact-throne-badge">
                    <span>⚡ S-RANK DISPATCH ONLINE</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Transmission Details & Cyber Action Cards */}
              <div className="contact-info-col">
                {/* Status Header */}
                <div className="contact-status-header">
                  <span className="contact-status-pulse" />
                  <span className="contact-status-tag">
                    ● STATUS: READY FOR DISPATCH • FULL-STACK & AI
                  </span>
                </div>

                <p className="contact-dispatch-desc">
                  <strong>MCA Scholar</strong> & <strong>Agentic Systems Certified (IIT Roorkee / iHUB)</strong> with hands-on internship experience at <strong>Innovexis Pvt. Ltd.</strong> Specialized in architecting high-performance <strong>React 19 & Next.js</strong> platforms, <strong>Autonomous Agentic Workflows</strong>, <strong>Python APIs</strong>, and interactive <strong>3D WebGL</strong> experiences. <span className="contact-dispatch-kicker">Let&apos;s build something exceptional together.</span>
                </p>

                {/* Tactical 4-Card Dispatch Grid */}
                <div className="contact-cards-grid">
                  {/* Card 1: Direct Email with 1-Click Copy */}
                  <button
                    type="button"
                    className="contact-card email-card"
                    onClick={handleCopyEmail}
                    title="Click to copy direct email address"
                  >
                    <div className="contact-card-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L1 7" />
                      </svg>
                    </div>
                    <div className="contact-card-info">
                      <span className="contact-card-label">DIRECT EMAIL [1-CLICK COPY]</span>
                      <span className="contact-card-val">sohit8844@gmail.com</span>
                    </div>
                    <span className={`contact-card-badge ${copied ? 'copied' : ''}`}>
                      {copied ? '✓ COPIED!' : 'COPY'}
                    </span>
                  </button>

                  {/* Card 2: LinkedIn Profile */}
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card linkedin-card"
                  >
                    <div className="contact-card-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                    <div className="contact-card-info">
                      <span className="contact-card-label">PROFESSIONAL NETWORK</span>
                      <span className="contact-card-val">LinkedIn // Sohit Kumar</span>
                    </div>
                    <span className="contact-card-badge">CONNECT ↗</span>
                  </a>

                  {/* Card 3: GitHub Repositories */}
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card github-card"
                  >
                    <div className="contact-card-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </div>
                    <div className="contact-card-info">
                      <span className="contact-card-label">OPEN SOURCE & REPOS</span>
                      <span className="contact-card-val">GitHub // @Necro000</span>
                    </div>
                    <span className="contact-card-badge">EXPLORE ↗</span>
                  </a>

                  {/* Card 4: Official Resume */}
                  <a
                    href={socials.resume}
                    download="Sohit-Kumar-Resume.pdf"
                    className="contact-card resume-card"
                  >
                    <div className="contact-card-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <polyline points="9 15 12 18 15 15" />
                      </svg>
                    </div>
                    <div className="contact-card-info">
                      <span className="contact-card-label">CURRICULUM VITAE</span>
                      <span className="contact-card-val">Official Resume PDF</span>
                    </div>
                    <span className="contact-card-badge">DOWNLOAD ↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SystemWindow>
      </section>

      {/* ========================================================
          THE GRAND FINALE FOOTER (The Shadow Monarch Throne Climax)
          At the absolute end of scrolling — natural height & unclipped!
          ======================================================== */}
      <MonarchFinale />
    </div>
  )
}

export default Sections
