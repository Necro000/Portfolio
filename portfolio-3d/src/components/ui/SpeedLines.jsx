// Phase 5, Task 6: Manga Speed Lines / Impact Frames.
// Activates on rapid scroll velocity or section jumps, simulating anime warp momentum.

import { useEffect, useRef } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

function SpeedLines() {
  const canvasRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // If user prefers reduced motion, disable the speed lines canvas loop completely
    if (prefersReducedMotion) return

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

    // Animation render loop
    function loop() {
      const currentScrollY = window.scrollY
      const scrollDelta = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      // Accelerate intensity when scrolling fast
      if (scrollDelta > 3) {
        intensity = Math.min(intensity + scrollDelta * 0.03, 1.2)
      } else {
        // Smoothly decay intensity when scroll slows down
        intensity *= 0.88
      }

      ctx.clearRect(0, 0, width, height)

      // Only draw when there is enough momentum
      if (intensity > 0.06) {
        const cx = width / 2
        const cy = height / 2
        const lineCount = Math.floor(45 * Math.min(intensity, 1))

        ctx.lineWidth = 1.5

        for (let i = 0; i < lineCount; i++) {
          const angle = Math.random() * Math.PI * 2
          const innerDist = Math.min(width, height) * 0.28 // Keep center clear for content
          const outerDist = Math.max(width, height) * 0.9

          const x1 = cx + Math.cos(angle) * (innerDist + Math.random() * 80)
          const y1 = cy + Math.sin(angle) * (innerDist + Math.random() * 80)
          const x2 = cx + Math.cos(angle) * outerDist
          const y2 = cy + Math.sin(angle) * outerDist

          // Randomize between cyan and white speed lines
          const isCyan = Math.random() > 0.4
          const alpha = (Math.random() * 0.5 + 0.3) * Math.min(intensity, 1)

          ctx.strokeStyle = isCyan
            ? `rgba(58, 183, 255, ${alpha})`
            : `rgba(255, 255, 255, ${alpha * 0.8})`

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 90,
      }}
    />
  )
}

export default SpeedLines
