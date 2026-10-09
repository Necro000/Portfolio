// Manga Speed Lines / Impact Frames.
// Activates on rapid scroll velocity or section jumps, simulating anime warp momentum.
// Tuned for high readability: pauses during modal inspection and respects reduced-motion.

import { useEffect, useRef } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

function SpeedLines({ isModalOpen = false }) {
  const canvasRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // If reduced motion is requested or modal is open, do not run speed lines
    if (prefersReducedMotion || isModalOpen) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    function handleResize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    let lastScrollY = window.scrollY
    let intensity = 0
    let isRunning = false

    function startLoop() {
      if (!isRunning) {
        isRunning = true
        animationFrameId = requestAnimationFrame(loop)
      }
    }

    function handleScroll() {
      const currentScrollY = window.scrollY
      const scrollDelta = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      // Accelerate intensity when scrolling fast, capped conservatively
      if (scrollDelta > 4) {
        intensity = Math.min(intensity + scrollDelta * 0.015, 0.7)
        startLoop()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation render loop
    function loop() {
      intensity *= 0.82 // Smooth decay

      ctx.clearRect(0, 0, width, height)

      // Only draw when there is active momentum
      if (intensity > 0.04) {
        const cx = width / 2
        const cy = height / 2
        // Subdued line count so text readability is never compromised
        const lineCount = Math.floor(24 * Math.min(intensity, 1))

        ctx.lineWidth = 1.2

        for (let i = 0; i < lineCount; i++) {
          const angle = Math.random() * Math.PI * 2
          // Keep center clear for content reading (45% radius)
          const innerDist = Math.min(width, height) * 0.44
          const outerDist = Math.max(width, height) * 0.95

          const x1 = cx + Math.cos(angle) * (innerDist + Math.random() * 60)
          const y1 = cy + Math.sin(angle) * (innerDist + Math.random() * 60)
          const x2 = cx + Math.cos(angle) * outerDist
          const y2 = cy + Math.sin(angle) * outerDist

          // Gentle alpha values (max ~0.3)
          const isCyan = Math.random() > 0.45
          const alpha = (Math.random() * 0.2 + 0.1) * Math.min(intensity, 1)

          ctx.strokeStyle = isCyan
            ? `rgba(58, 183, 255, ${alpha})`
            : `rgba(255, 255, 255, ${alpha * 0.7})`

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }

        animationFrameId = requestAnimationFrame(loop)
      } else {
        // Stopped decaying, clear and sleep until next scroll event
        ctx.clearRect(0, 0, width, height)
        isRunning = false
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prefersReducedMotion, isModalOpen])

  if (prefersReducedMotion || isModalOpen) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3, // Placed behind UI system cards and modals
      }}
    />
  )
}

export default SpeedLines
