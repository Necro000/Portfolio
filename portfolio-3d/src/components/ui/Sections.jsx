// The 6 full-screen HTML sections corresponding to the 6 3D scenes.
// Synchronized with scroll position: 100vh height per section.

import SystemWindow from './SystemWindow'
import { skills } from '../../data/skills'
import { projects } from '../../data/projects'
import { experience } from '../../data/experience'
import { socials } from '../../data/socials'

function Sections({ onSelectProject }) {
  return (
    <div className="sections-container">
      {/* ========================================================
          SCENE 0: HERO SECTION
          ======================================================== */}
      <section className="section" id="hero">
        <SystemWindow title="HUNTER STATUS: AWAKENED">
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                margin: '0 0 8px 0',
                fontSize: '36px',
                letterSpacing: '0.12em',
                color: '#e9e7f5',
              }}
            >
              ARISE
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
                    style={{ width: `${skill.level * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SystemWindow>
      </section>

      {/* ========================================================
          SCENE 3: PROJECTS SECTION (Wanted Posters Teaser)
          ======================================================== */}
      {/* ========================================================
          SCENE 3: PROJECTS SECTION (Wanted Posters in 3D)
          ======================================================== */}
      <section
        className="section"
        id="projects"
        style={{ justifyContent: 'space-between', padding: '90px 20px 40px 20px' }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(14, 12, 26, 0.75)',
            border: '1px solid rgba(232, 217, 181, 0.4)',
            padding: '6px 18px',
            borderRadius: '2px',
            color: '#e8d9b5',
            fontSize: '13px',
            letterSpacing: '0.12em',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          [ WANTED: GRAND LINE BOUNTIES ]
        </div>

        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(7, 6, 13, 0.65)',
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(58, 183, 255, 0.3)',
            fontSize: '12px',
            color: '#3ab7ff',
            letterSpacing: '0.08em',
          }}
        >
          ✦ Hover over any poster to tilt • Click for details
        </div>
      </section>

      {/* ========================================================
          SCENE 4: JOURNEY SECTION (Sea Route Milestones)
          ======================================================== */}
      <section className="section" id="journey">
        <SystemWindow title="LOG POSE: LOGGED VOYAGES">
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
                rel="noreferrer"
                className="btn-cta btn-cta-outline"
              >
                GitHub
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
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
