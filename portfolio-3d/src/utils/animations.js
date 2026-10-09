// Phase 5, Task 5: Reusable GSAP Timelines and Anime Animations.
// Industry-standard choreography using GSAP (stagger, expo easing, and timelines).

import gsap from 'gsap'

/**
 * Helper to check if user prefers reduced motion (WCAG accessibility).
 */
function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Animates the "ARISE" title letter-by-letter with cinematic Solo Leveling impact.
 * Falls back to an immediate subtle fade-in if the user prefers reduced motion.
 * @param {string | Element} targetSelector - CSS selector or element for the letters
 */
export function animateAriseReveal(targetSelector = '.arise-letter') {
  const tl = gsap.timeline({ delay: 0.2 })

  // If user prefers reduced motion, reveal text immediately without scale/blur/stagger
  if (prefersReducedMotion()) {
    tl.to(targetSelector, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'none',
      duration: 0.3,
    })
    return tl
  }

  tl.fromTo(
    targetSelector,
    {
      opacity: 0,
      y: 40,
      scale: 1.8,
      filter: 'blur(8px)',
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.0,
      ease: 'expo.out',
      stagger: 0.12, // 120ms delay between each consecutive letter reveal
    }
  )

  return tl
}

/**
 * Triggers a Solo Leveling "LEVEL UP" flash and counts up all skill stat bars.
 * Skips the bright flash and fast movements when reduced motion is requested.
 */
export function triggerLevelUpAnimation() {
  const tl = gsap.timeline()
  const reduced = prefersReducedMotion()

  // 1. Fullscreen blue flash overlay (SKIPPED if reduced motion to prevent seizures/discomfort)
  if (!reduced) {
    tl.fromTo(
      '.level-up-flash-overlay',
      { opacity: 0.8, display: 'block' },
      { opacity: 0, display: 'none', duration: 0.5, ease: 'power2.out' }
    )
  }

  // 2. Animate the Solo Leveling Awakening Mana Burst Badge
  tl.fromTo(
    '.level-up-burst-badge',
    { opacity: 0, scale: 0.8, y: -10, display: 'none' },
    { opacity: 1, scale: 1, y: 0, display: 'block', duration: 0.4, ease: 'back.out(2)' },
    '<'
  ).to('.level-up-burst-badge', {
    opacity: 0,
    display: 'none',
    delay: 2.8,
    duration: 0.5,
  })

  // 3. Animate all skill progress bars from 0 to full width
  tl.fromTo(
    '.skill-fill-bar',
    { width: '0%' },
    {
      width: (index, target) => target.getAttribute('data-target-width') || '100%',
      duration: reduced ? 0.3 : 1.2,
      ease: reduced ? 'linear' : 'power3.out',
      stagger: reduced ? 0 : 0.08,
    },
    reduced ? '+=0' : '-=3.0' // Overlap concurrently with the badge and flash
  )

  return tl
}
