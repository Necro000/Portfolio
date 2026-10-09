// Phase 6, Task 2: Accessibility hook for prefers-reduced-motion.
// Detects whether the user has requested the system to minimize animations/motion.
// Complies with WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions).

import { useState, useEffect } from 'react'

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    function handleChange(event) {
      setPrefersReducedMotion(event.matches)
    }

    // Modern standard event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Legacy fallback
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return prefersReducedMotion
}

export default useReducedMotion
