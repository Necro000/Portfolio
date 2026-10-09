// Option B: Kinetic HUD Rail Typography in Parallax Motion.
// Renders dual futuristic vertical kinetic ticker rails along the viewport margins.
// Left and right rails glide in opposing directions based on scroll velocity and ambient crawl.
// Automatically respects reduced-motion and hides on compact mobile screens.

import { useEffect, useRef } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

function KineticRails() {
  const prefersReducedMotion = useReducedMotion()
  const leftRailRef = useRef(null)
  const rightRailRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    let lastScrollY = window.scrollY
    let leftOffset = 0
    let rightOffset = 0
    let animationFrameId

    function loop() {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      // Ambient baseline crawl + dynamic scroll velocity multiplier
      // Left rail drifts downward on scroll down
      leftOffset += 0.35 + delta * 0.4
      // Right rail flows upward on scroll down (opposing velocity creates 3D depth)
      rightOffset -= 0.35 + delta * 0.4

      // Keep offset within looping bounds (-1000 to 1000)
      if (leftOffset > 1000) leftOffset -= 1000
      if (leftOffset < -1000) leftOffset += 1000
      if (rightOffset > 1000) rightOffset -= 1000
      if (rightOffset < -1000) rightOffset += 1000

      if (leftRailRef.current) {
        leftRailRef.current.style.transform = `translate3d(0, ${leftOffset % 320}px, 0)`
      }
      if (rightRailRef.current) {
        rightRailRef.current.style.transform = `translate3d(0, ${rightOffset % 320}px, 0)`
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(animationFrameId)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  const leftPhrases = [
    'SYSTEM AWAKENING',
    'SHADOW MONARCH PROTOCOL',
    'ARISE // 覚醒',
    'HUNTER STATUS: LEVEL MAX',
    'MONARCH DOMAIN ACTIVE',
    'SYSTEM AWAKENING',
    'SHADOW MONARCH PROTOCOL',
    'ARISE // 覚醒',
  ]

  const rightPhrases = [
    'SECTOR TELEMETRY // 03',
    'GRAND LINE LOG POSE // 航海',
    'ELEVATION 1440m // VECTOR 3D',
    'AUTONOMOUS ENGINE ACTIVE',
    'CHRONO RECORD // VOYAGE',
    'SECTOR TELEMETRY // 03',
    'GRAND LINE LOG POSE // 航海',
  ]

  return (
    <div className="kinetic-hud-rails" aria-hidden="true">
      {/* Left Vertical Kinetic Ticker Rail */}
      <div className="hud-rail hud-rail-left">
        <div className="hud-rail-marker top">◆ SYS_L</div>
        <div className="hud-rail-track" ref={leftRailRef}>
          {leftPhrases.map((phrase, i) => (
            <span key={i} className="hud-rail-text">
              <span className="hud-rail-bullet">⚡</span> {phrase}
            </span>
          ))}
        </div>
        <div className="hud-rail-marker bottom">SYS_01 // ACTIVE</div>
      </div>

      {/* Right Vertical Kinetic Ticker Rail */}
      <div className="hud-rail hud-rail-right">
        <div className="hud-rail-marker top">◆ LOG_R</div>
        <div className="hud-rail-track" ref={rightRailRef}>
          {rightPhrases.map((phrase, i) => (
            <span key={i} className="hud-rail-text">
              <span className="hud-rail-bullet">⚓</span> {phrase}
            </span>
          ))}
        </div>
        <div className="hud-rail-marker bottom">POSE_06 // SYNC</div>
      </div>
    </div>
  )
}

export default KineticRails
