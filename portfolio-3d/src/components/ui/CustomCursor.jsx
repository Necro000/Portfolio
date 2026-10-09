// Cyberpunk HUD Crosshair Cursor with Solo Leveling Shadow Mist & Mana Embers.
// Replaces default browser cursor on desktop with an interactive targeting reticle
// and a fluid particle trail of shadow mist and cyan mana wisps.
// Automatically disables on touch screens and prefers-reduced-motion.

import { useEffect, useRef, useState } from 'react'
import useIsMobile from '../../hooks/useIsMobile'
import useReducedMotion from '../../hooks/useReducedMotion'

function CustomCursor() {
  const cursorRef = useRef(null)
  const canvasRef = useRef(null)
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on desktop mouse pointers when animations are permitted
    if (isMobile || prefersReducedMotion) return

    const cursor = cursorRef.current
    const canvas = canvasRef.current
    if (!cursor || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions to viewport
    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let mouseX = -100
    let mouseY = -100
    let currentX = -100
    let currentY = -100
    let lastX = -100
    let lastY = -100
    let animationFrameId

    // Array to store active shadow mist and mana ember particles
    const particles = []
    const colors = ['#00f0ff', '#8b5cf6', '#6366f1', '#38bdf8', '#c084fc']

    function spawnParticles(x, y, count) {
      for (let i = 0; i < count; i++) {
        // Random velocity drifting outward
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 1.5 + 0.5
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.3, // Slight upward draft like burning mist
          size: Math.random() * 3.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.85,
          decay: Math.random() * 0.025 + 0.015,
        })
      }
    }

    function handleMouseMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      // Calculate distance moved to spawn particles based on speed
      const dist = Math.hypot(mouseX - lastX, mouseY - lastY)
      if (dist > 3) {
        spawnParticles(mouseX, mouseY, Math.min(Math.floor(dist / 6) + 1, 4))
        lastX = mouseX
        lastY = mouseY
      }

      // Check if mouse is hovering over an interactive element
      const target = e.target
      const isInteractive = target.closest('button, a, .btn-cta, .project-button, .system-window-header, .navbar-brand, .poster-container, .interactive-card')
      setIsHovering(Boolean(isInteractive))
    }

    function handleMouseLeave() {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Render loop: updates both cursor reticle and canvas particles
    function loop() {
      // 1. Lerp cursor targeting reticle
      currentX += (mouseX - currentX) * 0.24
      currentY += (mouseY - currentY) * 0.24
      if (cursor) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      // 2. Clear canvas for next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 3. Update and draw shadow mist particles
      if (particles.length > 0) {
        ctx.save()
        // Additive blending creates intense glowing energy where particles overlap
        ctx.globalCompositeOperation = 'lighter'

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.vx
          p.y += p.vy
          p.alpha -= p.decay
          p.size *= 0.96

          if (p.alpha <= 0 || p.size <= 0.4) {
            particles.splice(i, 1)
            continue
          }

          ctx.fillStyle = p.color
          ctx.globalAlpha = Math.max(0, p.alpha)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile, prefersReducedMotion, isVisible])

  // Don't render on touch screens or if reduced motion is requested
  if (isMobile || prefersReducedMotion) return null

  return (
    <>
      {/* Canvas for shadow mist & mana particle trail */}
      <canvas
        ref={canvasRef}
        className="hud-cursor-canvas"
        aria-hidden="true"
      />

      {/* Cyberpunk HUD Targeting Reticle */}
      <div
        ref={cursorRef}
        className={`hud-cursor ${isHovering ? 'hovering' : ''} ${isVisible ? 'visible' : ''}`}
        aria-hidden="true"
      >
        {/* Center Mana Aim Dot */}
        <div className="hud-cursor-dot" />
        {/* 4 Corner Targeting Reticle Brackets */}
        <div className="hud-cursor-bracket tl" />
        <div className="hud-cursor-bracket tr" />
        <div className="hud-cursor-bracket bl" />
        <div className="hud-cursor-bracket br" />
      </div>
    </>
  )
}

export default CustomCursor
