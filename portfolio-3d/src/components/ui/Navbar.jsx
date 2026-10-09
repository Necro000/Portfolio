// Fixed navigation bar with One Piece inspired Log Pose / compass.
// The compass needle rotates as the user journeys through the 6 sections.

import { useState, useEffect } from 'react'
import { SCENES } from '../../utils/constants'
import useReducedMotion from '../../hooks/useReducedMotion'

function Navbar() {
  const [activeSection, setActiveSection] = useState(0)
  const [isImpactActive, setIsImpactActive] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Listen to window scroll to determine which scene is currently in view
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY
      const sceneHeight = window.innerHeight
      // Calculate current scene index (0 to 5)
      const currentIndex = Math.min(
        Math.floor((scrollY + sceneHeight * 0.3) / sceneHeight),
        SCENES.length - 1
      )
      setActiveSection(currentIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smoothly scroll to a selected section with anime impact frame
  function scrollToSection(index) {
    if (index !== activeSection && !prefersReducedMotion) {
      setIsImpactActive(true)
      setTimeout(() => setIsImpactActive(false), 220)
    }

    const targetY = index * window.innerHeight
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })
  }

  // Calculate rotation angle for the compass needle (60 degrees per section: 0 to 300)
  const needleAngle = activeSection * (360 / SCENES.length)

  return (
    <>
    {isImpactActive && <div className="manga-impact-overlay" />}
    <nav className="navbar" aria-label="Main Portfolio Navigation">
      {/* Brand logo + One Piece inspired compass */}
      <div className="navbar-brand">
        {/* Animated Compass SVG */}
        <svg
          className="navbar-compass"
          viewBox="0 0 100 100"
          style={{ transform: `rotate(${needleAngle}deg)` }}
          aria-hidden="true"
        >
          {/* Compass outer ring */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#3ab7ff" strokeWidth="4" />
          <circle cx="50" cy="50" r="3" fill="#e9e7f5" />
          {/* Compass needle: Red north pointer, Light south pointer */}
          <polygon points="50,12 44,50 56,50" fill="#e5383b" />
          <polygon points="50,88 44,50 56,50" fill="#e9e7f5" opacity="0.6" />
        </svg>
        <span>ARISE</span>
      </div>

      {/* Nav items for the 6 scenes */}
      <ul className="navbar-links">
        {SCENES.map((scene, index) => (
          <li key={scene.id}>
            <button
              type="button"
              className={activeSection === index ? 'active' : ''}
              onClick={() => scrollToSection(index)}
              aria-label={`Jump to ${scene.name} section`}
            >
              {scene.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    </>
  )
}

export default Navbar
