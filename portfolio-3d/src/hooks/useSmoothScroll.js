// Phase 2, Task 2: turns on Lenis smooth scrolling for the whole page.

import { useEffect } from 'react'
import Lenis from 'lenis'

function useSmoothScroll() {
  // useEffect runs AFTER the page is on screen. Lenis needs the real page (the DOM) to exist,
  // so it can't be created while React is still drawing.
  useEffect(() => {
    // Create Lenis. It takes over the wheel/touch input and eases the scroll.
    const lenis = new Lenis()

    // Lenis only moves when we tell it time has passed, so we call lenis.raf()
    // on every animation frame (like useFrame does for 3D).
    let frameId
    function loop(time) {
      lenis.raf(time)
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)

    // Cleanup: runs when the component goes away (and in dev, React StrictMode runs
    // everything twice on purpose). Without it we'd end up with two Lenis instances fighting.
    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, []) // [] = run once, when the component first appears
}

export default useSmoothScroll
