// Approach 3: Minimalist Interactive Hunter Dossier.
// Provides a sleek, high-tech HUD trigger that expands into a rich Solo Leveling
// System Window modal. Gives recruiters and fans an interactive experience
// without permanently cluttering or obstructing the reading path.

import { useState, useEffect } from 'react'

function HunterDossier() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('jinwoo') // 'jinwoo' | 'igris'

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <>
      {/* 1. Floating Cyberpunk HUD Trigger */}
      <button
        type="button"
        className="hunter-dossier-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open Hunter System Dossier"
        title="Open System Dossier (Solo Leveling)"
      >
        <span className="trigger-pulse" />
        <span className="trigger-icon">⚡</span>
        <span className="trigger-text">SYSTEM DOSSIER</span>
        <span className="trigger-badge">LVL MAX</span>
      </button>

      {/* 2. System Window Dossier Modal */}
      {isOpen && (
        <div
          className="dossier-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false)
          }}
        >
          <div className="dossier-window">
            {/* Header / Title Bar */}
            <div className="dossier-header">
              <div className="dossier-title-group">
                <span className="dossier-status-dot" />
                <h2 id="dossier-title" className="dossier-title">
                  [ SYSTEM STATUS // HUNTER DOSSIER ]
                </h2>
              </div>
              <button
                type="button"
                className="dossier-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close Dossier"
              >
                ✕ [ESC]
              </button>
            </div>

            {/* Character Selector Tabs */}
            <div className="dossier-tabs">
              <button
                type="button"
                className={`dossier-tab ${activeTab === 'jinwoo' ? 'active' : ''}`}
                onClick={() => setActiveTab('jinwoo')}
              >
                ◆ SUNG JIN-WOO // MONARCH
              </button>
              <button
                type="button"
                className={`dossier-tab ${activeTab === 'igris' ? 'active' : ''}`}
                onClick={() => setActiveTab('igris')}
              >
                ◆ COMMANDER IGRIS // KNIGHT
              </button>
            </div>

            {/* Main Content Body */}
            <div className="dossier-body">
              {/* Left Column: Holographic Character Projection */}
              <div className="dossier-character-col">
                <div className="dossier-hologram-stage">
                  <div className="stage-glow-ambient" />
                  <img
                    src={
                      activeTab === 'jinwoo'
                        ? '/media/jinwoo-daggers.webp'
                        : '/media/igris-shadow.webp'
                    }
                    alt={
                      activeTab === 'jinwoo'
                        ? 'Sung Jin-Woo Dual Daggers'
                        : 'Blood-Red Commander Igris'
                    }
                    className="stage-char-img"
                  />
                  <div className="stage-scanline" />
                </div>
                <div className="stage-caption">
                  {activeTab === 'jinwoo' ? (
                    <>
                      <span className="caption-tag cyan">CLASS: SHADOW MONARCH</span>
                      <span className="caption-sub">TITLES: THE ONE WHO OVERCOMES ADVERSITY</span>
                    </>
                  ) : (
                    <>
                      <span className="caption-tag red">COMMANDER: BLOOD-RED IGRIS</span>
                      <span className="caption-sub">GUARDIAN OF THE SHADOW THRONE</span>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column: Full-Stack Developer Telemetry & Stats */}
              <div className="dossier-stats-col">
                <div className="stats-box">
                  <div className="stats-row">
                    <span className="stats-label">HUNTER NAME</span>
                    <span className="stats-val cyan">SOHIT KUMAR (NECRO)</span>
                  </div>
                  <div className="stats-row">
                    <span className="stats-label">CLASS / ROLE</span>
                    <span className="stats-val">FULL-STACK REACT & WEBGL DEVELOPER</span>
                  </div>
                  <div className="stats-row">
                    <span className="stats-label">GUILD / TRAINING</span>
                    <span className="stats-val">INNOVEXIS PVT. LTD. (INTERNSHIP)</span>
                  </div>
                  <div className="stats-row">
                    <span className="stats-label">ACADEMIC RANK</span>
                    <span className="stats-val green">MCA // 8.67 CGPA</span>
                  </div>
                  <div className="stats-row">
                    <span className="stats-label">CURRENT STATUS</span>
                    <span className="stats-val pulse">READY FOR FULL-TIME / CONTRACT</span>
                  </div>
                </div>

                {/* Stat Parameter Bars */}
                <div className="stat-bars-container">
                  <div className="bar-unit">
                    <div className="bar-header">
                      <span>FRONTEND ARCHITECTURE (REACT 19 / VITE)</span>
                      <span className="bar-pct">95%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: '95%' }} />
                    </div>
                  </div>

                  <div className="bar-unit">
                    <div className="bar-header">
                      <span>BACKEND & VERIFIED REST APIS (NODE / PYTHON)</span>
                      <span className="bar-pct">88%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill cyan" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div className="bar-unit">
                    <div className="bar-header">
                      <span>3D WEBGL GRAPHICS (THREE.JS / R3F)</span>
                      <span className="bar-pct">82%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill purple" style={{ width: '82%' }} />
                    </div>
                  </div>
                </div>

                {/* Hunter Equipment & Inventory */}
                <div className="inventory-section">
                  <span className="inventory-title">ACTIVE ARSENAL & WEAPONRY</span>
                  <div className="inventory-grid">
                    <div className="inv-badge">🗡️ KASAKA'S FANG // Next.js & TypeScript</div>
                    <div className="inv-badge">⚡ KNIGHT KILLER // Tailwind & Custom CSS</div>
                    <div className="inv-badge">🔮 ORB OF DOMAIN // Three.js & Fiber</div>
                    <div className="inv-badge">🛡️ SHADOW ARMOR // Secure Auth & JWT</div>
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div className="dossier-actions">
                  <a
                    href="#projects"
                    className="dossier-btn primary"
                    onClick={() => setIsOpen(false)}
                  >
                    VIEW DUNGEON PROJECTS →
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Sohit_Kumar_Resume.pdf"
                    className="dossier-btn secondary"
                  >
                    DOWNLOAD HUNTER RESUME
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HunterDossier
