// Kinetic HUD Rail Typography in Parallax Motion.
// Seamless mathematical looping ticker that glides continuously with scroll velocity.
// Zero jumps, zero modulo stutter, respects reduced motion, and hides on compact mobile.

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

      // Smooth ambient crawl + dampened scroll velocity
      leftOffset += 0.25 + delta * 0.2
      rightOffset -= 0.25 + delta * 0.2

      if (leftRailRef.current) {
        // Half the scrollHeight represents one exact duplicated set
        const halfHeight = leftRailRef.current.scrollHeight / 2 || 600
        let normLeft = leftOffset % halfHeight
        if (normLeft < 0) normLeft += halfHeight
        leftRailRef.current.style.transform = `translate3d(0, ${-normLeft}px, 0)`
      }

      if (rightRailRef.current) {
        const halfHeight = rightRailRef.current.scrollHeight / 2 || 600
        let normRight = rightOffset % halfHeight
        if (normRight < 0) normRight += halfHeight
        rightRailRef.current.style.transform = `translate3d(0, ${-normRight}px, 0)`
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(animationFrameId)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  const baseLeftPhrases = [
    'SYSTEM AWAKENING',
    'SHADOW MONARCH PROTOCOL',
    'ARISE // 覚醒',
    'HUNTER STATUS: LEVEL MAX',
    'MONARCH DOMAIN ACTIVE',
  ]

  const baseRightPhrases = [
    'SECTOR TELEMETRY // 03',
    'GRAND LINE LOG POSE // 航海',
    'ELEVATION 1440m // VECTOR 3D',
    'AUTONOMOUS ENGINE ACTIVE',
    'CHRONO RECORD // VOYAGE',
  ]

  // Duplicate arrays to guarantee mathematically seamless infinite wrapping
  const leftPhrases = [...baseLeftPhrases, ...baseLeftPhrases]
  const rightPhrases = [...baseRightPhrases, ...baseRightPhrases]

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
