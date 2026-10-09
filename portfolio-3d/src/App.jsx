// Phase 1, Task 4: mouse parallax (cube from Task 1 and lantern from Task 3 stay).

import { useState, Suspense } from 'react'
// Canvas = the 3D world. useFrame = code that runs on every rendered frame.
import { Canvas, useFrame } from '@react-three/fiber'

// MathUtils has small math helpers; we use damp() for smooth easing.
import { MathUtils } from 'three'
// Import anime-inspired UI design styles (Solo Leveling & One Piece).
import './styles/ui.css'
// The 6 full-page HTML sections for the 6 scenes (Phase 3, Task 3).
import Sections from './components/ui/Sections'
// Navigation bar with rotating compass (Phase 3, Task 2).
import Navbar from './components/ui/Navbar'
// Solo Leveling style system loading screen (Phase 3, Task 2).
import Loader from './components/ui/Loader'
// Project detail modal dialog (Phase 4, Task 2).
import ProjectModal from './components/ui/ProjectModal'
// Manga speed lines impact overlay on fast scroll (Phase 5, Task 6).
import SpeedLines from './components/ui/SpeedLines'
// Responsive device detection hook (Phase 6, Task 1).
import useIsMobile from './hooks/useIsMobile'
// Reduced-motion accessibility detection hook (Phase 6, Task 2).
import useReducedMotion from './hooks/useReducedMotion'
// Cyberpunk HUD crosshair cursor
import CustomCursor from './components/ui/CustomCursor'
// Lenis smooth scrolling (Phase 2, Task 2).
import useSmoothScroll from './hooks/useSmoothScroll'
// Moves the camera as the page scrolls (Phase 2, Task 3).
import CameraRig from './components/three/CameraRig'
// The six placeholder scenes and their data (Phase 2, Task 4).
import PlaceholderScene from './components/three/PlaceholderScene'
import { SCENES } from './utils/constants'
// Cinematic Post-Processing: Bloom aura & Vignette (Phase 5, Task 2).
import Effects from './components/three/Effects'
// Solo Leveling style rising shadow embers (Phase 5, Task 3).
import ShadowParticles from './components/three/ShadowParticles'
// One Piece style animated ocean shader (Phase 5, Task 4).
import Ocean from './components/three/Ocean'



// Moves the camera slightly toward the mouse, so the scene feels deep.
// Respects reducedMotion: keeps camera steady at center to prevent motion sickness.
function MouseParallax({ reducedMotion = false }) {
  useFrame((state, delta) => {
    const { camera, pointer } = state

    // If reduced motion is requested, smoothly keep camera centered at (0, 0)
    if (reducedMotion) {
      camera.position.x = MathUtils.damp(camera.position.x, 0, 3, delta)
      camera.position.y = MathUtils.damp(camera.position.y, 0, 3, delta)
      camera.lookAt(0, 0, camera.position.z - 5)
      return
    }

    // How far the camera may shift. Bigger = stronger effect.
    const strength = 1

    // damp(current, target, speed, delta) moves current a bit toward target each frame.
    // Speed 3 is gentle. Using delta keeps it the same on any refresh rate.
    // Mouse right (x +) -> camera moves right. Mouse up (y +) -> camera moves up.
    camera.position.x = MathUtils.damp(camera.position.x, pointer.x * strength, 3, delta)
    camera.position.y = MathUtils.damp(camera.position.y, pointer.y * strength, 3, delta)

    // Moving the camera also changes where it points, so we re-aim it.
    // The camera now travels along z, so we aim 5 units AHEAD of it (not at the origin,
    // or it would turn back to stare at the start once it has moved deep into the scene).
    camera.lookAt(0, 0, camera.position.z - 5)
  })

  return null
}

function App() {
  // Detect mobile screen for adaptive 3D performance and scaling
  const isMobile = useIsMobile()

  // Detect user preference for reduced motion (accessibility)
  const prefersReducedMotion = useReducedMotion()

  // Currently opened project for the detail modal
  const [selectedProject, setSelectedProject] = useState(null)

  // Turn on smooth scrolling for the whole page.
  useSmoothScroll()

  return (
    // Fragment <> ... </> lets us return two siblings: the fixed 3D layer and the spacer.
    <>
    {/* The Canvas fills its parent, so we give the parent the whole screen.
        position: fixed + inset: 0 also ignores the leftover Vite starter styles on #root. */}
    <div style={{ position: 'fixed', inset: 0, background: '#07060d' }}>
      {/* dpr={[1, 1.5]} caps pixel ratio to prevent retina mobile phones from overheating! */}
      <Canvas dpr={[1, 1.5]}>
        {/* Soft light from everywhere, so no side is pitch black. */}
        <ambientLight intensity={0.5} />
        {/* Light from a point in space (x, y, z), like a lamp. It gives the objects shading. */}
        <pointLight position={[5, 5, 5]} intensity={60} />
        {/* Scroll controls how close the camera is (z). Listed before MouseParallax so z is set first. */}
        <CameraRig />
        {/* Runs every frame and eases the camera toward the cursor (disabled when reduced motion is preferred). */}
        <MouseParallax reducedMotion={prefersReducedMotion} />

        {/* Suspense boundary for 3D textures & Wanted Poster screenshots */}
        <Suspense fallback={null}>
          {SCENES.map((scene, index) => (
            <PlaceholderScene
              key={scene.id}
              scene={scene}
              index={index}
              onSelectProject={setSelectedProject}
              isMobile={isMobile}
            />
          ))}
        </Suspense>
        {/* Adaptive particles: 150 on mobile for 60fps battery efficiency, 500 on desktop */}
        <ShadowParticles count={isMobile ? 150 : 500} />
        {/* Animated One Piece Grand Line ocean shader */}
        <Ocean />
        {/* Post-Processing Effects: Bloom glow & Vignette framing */}
        <Effects />
      </Canvas>
      {/* Navbar with rotating compass needle */}
      <Navbar />
      {/* System loading screen: monitors 3D asset download progress */}
      <Loader />
    </div>

    {/* The 6 full-screen HTML content sections that scroll over the fixed 3D canvas */}
    <Sections onSelectProject={setSelectedProject} />

    {/* Project Detail Modal Dialog (opens when a 3D poster or project card is clicked) */}
    {selectedProject && (
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    )}

    {/* Manga Speed Lines impact frame on rapid camera movement */}
    <SpeedLines />

    {/* Cyberpunk HUD Crosshair Cursor with Mana Sparks */}
    <CustomCursor />
    </>
  )
}

export default App
