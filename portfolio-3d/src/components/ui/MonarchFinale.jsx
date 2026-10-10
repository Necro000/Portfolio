// MonarchFinale.jsx
// The Grand Finale climax at the end of the portfolio.
// Features Sung Jin-Woo on the Throne ("Quest Complete // Level Max"),
// monumental ARISE typography, shadow army summoning pulse, and smooth Teleport to Top.

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
    <footer className="monarch-finale-section" aria-label="Grand Finale">
      <div className={`finale-aura-pulse ${isSummoned ? 'active' : ''}`} />

      {/* Quest Complete System Dispatch */}
      <div className="finale-quest-badge">
        <span className="quest-dot" />
        <span className="quest-text">[ SYSTEM BROADCAST: ALL DUNGEONS CLEARED • LEVEL MAX ]</span>
      </div>

      {/* Centerpiece: The Monarch on the Throne */}
      <div className="finale-throne-stage">
        <div className="throne-glow-backdrop" />
        <img
          src="/media/jinwoo-throne.webp"
          alt="Sung Jin-Woo on the Monarch Throne - Quest Complete"
          className={`finale-throne-img ${isSummoned ? 'summoned' : ''}`}
          loading="lazy"
          decoding="async"
        />

        {/* Monumental Neon Typography */}
        <div className="finale-arise-banner">
          <span className="finale-sub-callout">// THE SHADOW MONARCH CONQUERS THE GRAND LINE //</span>
          <h2 className="finale-arise-word">A R I S E</h2>
          <span className="finale-sub-kanji">覚醒 • LEVEL MAX</span>
        </div>
      </div>

      {/* Narrative Closing Manifesto */}
      <p className="finale-manifesto">
        From E-Rank Hunter to Shadow Monarch — every line of code architected with precision,
        resilience, and an uncompromising obsession for performance. Ready to engineer the next world-class platform.
      </p>

      {/* Interactive Finale Actions */}
      <div className="finale-actions">
        <button
          type="button"
          className="finale-btn btn-arise-summon"
          onClick={handleAriseSummon}
          aria-label="Re-summon Shadow Army"
        >
          <span className="btn-icon">⚡</span>
          <span>{isSummoned ? 'SHADOW ARMY SUMMONED!' : 'ARISE: SUMMON SHADOW ARMY'}</span>
        </button>

        <button
          type="button"
          className="finale-btn btn-teleport-top"
          onClick={handleTeleportTop}
          aria-label="Teleport back to the top of the portfolio"
        >
          <span className="btn-icon">🚀</span>
          <span>TELEPORT TO SURFACE [TOP ↑]</span>
        </button>
      </div>

      {/* Cyberpunk System Telemetry & Copyright */}
      <div className="finale-telemetry-bar">
        <div className="telemetry-item">
          <span className="tel-label">SYSTEM KERNEL:</span>
          <span className="tel-val">REACT 19 • THREE.JS • VITE 8</span>
        </div>
        <div className="telemetry-item">
          <span className="tel-label">HUNTER ARCHITECT:</span>
          <span className="tel-val cyan">SOHIT KUMAR (NECRO)</span>
        </div>
        <div className="telemetry-item">
          <span className="tel-label">DEPLOYMENT:</span>
          <span className="tel-val green">VERCEL // PRODUCTION LIVE</span>
        </div>
        <div className="telemetry-copy">
          © 2026 SOHIT KUMAR. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}

export default MonarchFinale
