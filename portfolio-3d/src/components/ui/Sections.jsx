// The 6 full-screen HTML sections corresponding to the 6 3D scenes.
// Synchronized with scroll position: 100vh height per section.

import { useEffect, useState } from 'react'
import SystemWindow from './SystemWindow'
import ProjectSpotlight from './ProjectSpotlight'
import { skills } from '../../data/skills'
import { projects } from '../../data/projects'
import { experience } from '../../data/experience'
import { socials } from '../../data/socials'
// GSAP Timelines for ARISE reveal and LEVEL UP flash (Phase 5, Task 5).
import { animateAriseReveal, triggerLevelUpAnimation } from '../../utils/animations'

function Sections({ onSelectProject }) {
  // Dual-mode view for Scene 3 (#projects):
  // '3d': 100% unobstructed view of the 3D Obsidian Monoliths on the ocean horizon
  // 'deck': Interactive multi-slide browser walkthrough showing login, dashboard, and scanner
  const [projectMode, setProjectMode] = useState('3d')

  // Trigger cinematic letter-by-letter reveal on mount
  useEffect(() => {
    animateAriseReveal('.arise-letter')
  }, [])

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
                margin: '0 0 20px 0',
                color: '#9b97b3',
                fontSize: '14px',
              }}
            >
              Full-Stack & Creative 3D Web Developer
            </p>

            <div className="contact-buttons">
              <button
                type="button"
                className="btn-cta btn-cta-primary"
                onClick={() =>
                  window.scrollTo({ top: 3 * window.innerHeight, behavior: 'smooth' })
                }
              >
                View Wanted Projects
              </button>
              <a
                href={socials.resume}
                download
                className="btn-cta btn-cta-outline"
              >
                Resume
              </a>
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
              src="/media/jinwoo-live.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="hunter-avatar-video"
            />
            <div className="hunter-avatar-overlay" />
            <span className="hunter-avatar-badge">⚡ AWAKENED SHADOW MONARCH</span>
          </div>

          <div className="status-grid">
            <div className="status-item">
              <span className="status-label">Hunter Name</span>
              <span className="status-val">Necro</span>
            </div>
            <div className="status-item">
              <span className="status-label">Class</span>
              <span className="status-val">Full-Stack Dev</span>
            </div>
            <div className="status-item">
              <span className="status-label">Rank</span>
              <span className="status-val">S-Rank Builder</span>
            </div>
            <div className="status-item">
              <span className="status-label">Guild</span>
              <span className="status-val">Open for Hire</span>
            </div>
          </div>
          <p className="status-bio">
            Developer crafting high-performance full-stack web applications and interactive 3D worlds.
            Passionate about smooth motion, creative storytelling, and shipping clean, robust code.
          </p>
        </SystemWindow>
      </section>

      {/* ========================================================
          SCENE 2: SKILLS SECTION (Hunter Abilities & Levels)
          ======================================================== */}
      <section className="section" id="skills">
        <SystemWindow title="SYSTEM STATS: SKILL LEVELS">
          {/* Solo Leveling Shadow Monarch Awakening Burst Notification */}
          <div className="level-up-burst-badge">
            ⚡ SHADOW MONARCH AWAKENING: ALL STATS MAXED! ⚡
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

          {/* Solo Leveling Daily Quest HUD */}
          <div className="daily-quest-card">
            <div className="daily-quest-header">
              <span className="daily-quest-title">⚔️ DAILY QUEST: PREPARATION FOR MONARCH</span>
              <span className="daily-quest-status">COMPLETED</span>
            </div>
            <ul className="daily-quest-tasks">
              <li><span><span className="quest-check">✓</span> Master Three.js & WebGL Shaders</span> <span>[100/100]</span></li>
              <li><span><span className="quest-check">✓</span> Architect Scalable React Systems</span> <span>[100/100]</span></li>
              <li><span><span className="quest-check">✓</span> Conquer Full-Stack APIs & Databases</span> <span>[100/100]</span></li>
            </ul>
            <div className="daily-quest-reward">
              🏆 REWARD: S-Rank Developer Title Unlocked
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
            // SECTOR 03: LIVE PRODUCTION ARCHITECTURES //
          </span>

          {/* Interactive Mode Switcher */}
          <div className="project-mode-toggle" role="tablist" aria-label="Projects view mode">
            <button
              type="button"
              className={`project-mode-btn ${projectMode === '3d' ? 'active' : ''}`}
              onClick={() => setProjectMode('3d')}
            >
              🌌 3D STAGE
            </button>
            <button
              type="button"
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
                  <strong>3D MONOLITHS ACTIVE:</strong> Hover to tilt obsidian glass • Click any card for forensic UI slides
                </span>
              </div>
              <button
                type="button"
                className="stage-hud-btn"
                onClick={() => setProjectMode('deck')}
              >
                📂 OPEN SLIDE DECK ↗
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
        <SystemWindow title="LOG POSE: LOGGED VOYAGES">
          {/* One Piece Going Merry Expedition Banner */}
          <div className="journey-ship-banner">
            <img src="/media/merry.jpg" alt="Going Merry Voyage" className="journey-ship-img" />
            <div className="journey-ship-overlay" />
            <span className="journey-ship-badge">⚓ STRAW HAT EXPEDITION ROUTE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {experience.map((item) => (
              <div
                key={item.period}
                style={{
                  borderLeft: '2px solid #0e7c86',
                  paddingLeft: '12px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#0e7c86', fontWeight: 'bold' }}>
                  {item.period} — {item.role}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#e9e7f5' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '12px', color: '#9b97b3', marginTop: '2px' }}>
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
            {/* One Piece Animated Transponder Snail (Den Den Mushi) Communicator */}
            <div className="den-den-mushi-box">
              <span className="den-den-mushi-icon" role="img" aria-label="Transponder Snail">🐌📞</span>
              <div className="den-den-mushi-text">
                <span className="den-den-ring">PURU PURU PURU... GACHA!</span>
                <span className="den-den-sub">DEN DEN MUSHI READY FOR TRANSMISSION</span>
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
              READY TO JOIN THE CREW?
            </h2>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#9b97b3' }}>
              Have an opening, internship, or freelance project? Let's connect.
            </p>

            <div className="contact-buttons">
              <a
                href={socials.email}
                className="btn-cta btn-cta-primary"
              >
                Send Email
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta-outline"
              >
                GitHub
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta-outline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </SystemWindow>
      </section>
    </div>
  )
}

export default Sections
