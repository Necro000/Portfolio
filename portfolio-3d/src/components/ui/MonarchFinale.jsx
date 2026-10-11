// MonarchFinale.jsx
// The Grand Finale Climax and Cinematic Footer at the end of the portfolio.
// Features Awakened Sung Jin-Woo (/media/jinwoo-awakening.webp),
// floating seamlessly over the dark void with radiant crimson/cyan/purple mana aura,
// monumental unclipped ARISE typography, bold high-contrast Engineer's Manifesto,
// non-wrapping cyber climax buttons, and high-impact HUD Telemetry.

import { useState } from 'react'

function MonarchFinale() {
  const [isSummoned, setIsSummoned] = useState(false)

  function handleAriseSummon() {
    setIsSummoned(true)
    setTimeout(() => setIsSummoned(false), 2400)
  }

  function handleTeleportTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="monarch-finale-section" aria-label="Grand Finale Climax and Footer">
      {/* Dynamic Mana Blast pulse */}
      <div className={`finale-aura-pulse ${isSummoned ? 'active' : ''}`} />

      {/* 1. Tactical Broadcast Status Pill */}
      <div className="finale-quest-badge">
        <span className="quest-dot" />
        <span className="quest-text">[ ⚡ SYSTEM BROADCAST: ALL QUESTS CLEARED • LEVEL MAX ]</span>
      </div>

      {/* 2. Awakened Sung Jin-Woo (Fiery Mana Centerpiece) */}
      <div className="throne-stage-single">
        <div className={`throne-ambient-glow ${isSummoned ? 'summoned' : ''}`} />
        <img
          src="/media/jinwoo-awakening.webp"
          alt="Awakened Sung Jin-Woo - Mana Surge Active"
          className={`finale-throne-clean-img ${isSummoned ? 'summoned' : ''}`}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* 3. Responsive Monumental Typography (100% Unclipped) */}
      <div className="finale-arise-banner">
        <span className="finale-sub-callout">// SHADOW MONARCH AWAKENING • QUEST COMPLETE //</span>
        <h2 className="finale-arise-word">A R I S E</h2>
        <span className="finale-sub-kanji">覚醒 • LEVEL MAX • ALL SYSTEMS CLEARED</span>
      </div>

      {/* 4. The Engineer's Manifesto (Bold High-Contrast Context Formatting) */}
      <div className="finale-manifesto-container">
        <p className="finale-manifesto">
          From writing my first line of code to architecting <strong>scalable production platforms at Innovexis</strong> and mastering <strong>Autonomous Agentic Systems (IIT Roorkee / iHUB)</strong> — every challenge cleared, every system mastered. Armed with <strong>React 19</strong>, <strong>Three.js</strong>, and <strong>high-performance full-stack engineering</strong>, I am ready to engineer world-class platforms. <span className="manifesto-highlight">Let&apos;s build something legendary together.</span>
        </p>
      </div>

      {/* 5. Climax Action Buttons (Non-wrapping, Bold Cybernetic) */}
      <div className="finale-actions">
        <button
          type="button"
          className="finale-btn btn-arise-summon"
          onClick={handleAriseSummon}
          aria-label="Trigger Shadow Monarch Awakening Pulse"
        >
          <span className="btn-icon">⚡</span>
          <span>{isSummoned ? 'SHADOW ARMY SUMMONED!' : 'ARISE: TRIGGER MONARCH PULSE'}</span>
        </button>

        <button
          type="button"
          className="finale-btn btn-teleport-top"
          onClick={handleTeleportTop}
          aria-label="Teleport back to the surface"
        >
          <span className="btn-icon">🚀</span>
          <span>TELEPORT TO SURFACE [TOP ↑]</span>
        </button>
      </div>

      {/* 6. Cyberpunk System Telemetry & Bold Signature Footer */}
      <div className="finale-telemetry-bar">
        <div className="telemetry-item">
          <span className="tel-label">SYSTEM KERNEL //</span>
          <strong className="tel-val white">REACT 19 • THREE.JS • VITE 8</strong>
        </div>
        <div className="telemetry-item">
          <span className="tel-label">HUNTER ARCHITECT //</span>
          <strong className="tel-val cyan">SOHIT KUMAR (NECRO)</strong>
        </div>
        <div className="telemetry-item">
          <span className="tel-label">DEPLOYMENT STATUS //</span>
          <strong className="tel-val green">● AVAILABLE [MCA • INNOVEXIS • IITR iHUB]</strong>
        </div>
        <div className="telemetry-copy">
          <strong>© 2026 SOHIT KUMAR. ALL RIGHTS RESERVED.</strong>
        </div>
      </div>
    </footer>
  )
}

export default MonarchFinale
