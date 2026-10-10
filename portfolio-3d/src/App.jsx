// Clean, high-performance R3F + React entry application.
// Connects 3D ocean, particle systems, interactive wanted posters, HUD overlay, and project modals.

import { useState, Suspense, lazy } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import './styles/ui.css'
import Sections from './components/ui/Sections'
import Navbar from './components/ui/Navbar'
import Loader from './components/ui/Loader'
import SpeedLines from './components/ui/SpeedLines'
import useIsMobile from './hooks/useIsMobile'
import useReducedMotion from './hooks/useReducedMotion'
import CustomCursor from './components/ui/CustomCursor'
import useSmoothScroll from './hooks/useSmoothScroll'
import CameraRig from './components/three/CameraRig'
import PlaceholderScene from './components/three/PlaceholderScene'
import { SCENES } from './utils/constants'
import Effects from './components/three/Effects'
import ShadowParticles from './components/three/ShadowParticles'
import Ocean from './components/three/Ocean'
import KineticRails from './components/ui/KineticRails'
import Monarch3DHologram from './components/three/Monarch3DHologram'
import HunterDossier from './components/ui/HunterDossier'

// Code-split ProjectModal to reduce initial bundle size; loaded on-demand when a project is clicked
const ProjectModal = lazy(() => import('./components/ui/ProjectModal'))

// Moves the camera slightly toward the mouse, creating natural depth.
// Automatically centers and stays steady when user prefers reduced motion or when inspecting a modal.
function MouseParallax({ reducedMotion = false, isFrozen = false }) {
  useFrame((state, delta) => {
    const { camera, pointer } = state

    // If reduced motion or modal inspection is active, smoothly keep camera steady
    if (reducedMotion || isFrozen) {
      camera.position.x = MathUtils.damp(camera.position.x, 0, 4, delta)
      camera.position.y = MathUtils.damp(camera.position.y, 0, 4, delta)
      camera.lookAt(0, 0, camera.position.z - 5)
      return
    }

    const strength = 1
    camera.position.x = MathUtils.damp(camera.position.x, pointer.x * strength, 3, delta)
    camera.position.y = MathUtils.damp(camera.position.y, pointer.y * strength, 3, delta)
    camera.lookAt(0, 0, camera.position.z - 5)
  })

  return null
}

function App() {
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()
  const [selectedProject, setSelectedProject] = useState(null)
  const isModalOpen = Boolean(selectedProject)

  useSmoothScroll()

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: '#07060d' }}>
        <Canvas dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={60} />
          <CameraRig />
          <MouseParallax reducedMotion={prefersReducedMotion} isFrozen={isModalOpen} />

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

          <ShadowParticles count={isMobile ? 150 : 500} />
          <Ocean />
          <Monarch3DHologram isMobile={isMobile} />
          <Effects />
        </Canvas>

        <Navbar />
        <Loader />
      </div>

      {/* Main scrolling content sections */}
      <Sections onSelectProject={setSelectedProject} />

      {/* Lazy-loaded Project Detail Modal */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}

      {/* Manga Speed Lines (automatically pauses when modal is open or when reduced-motion is active) */}
      <SpeedLines isModalOpen={isModalOpen} />

      {/* Kinetic HUD Rail Typography in Parallax Motion */}
      <KineticRails />

      {/* Interactive Hunter Dossier HUD System Window (Approach 3) */}
      <HunterDossier />

      {/* Cyberpunk HUD Cursor */}
      <CustomCursor />
    </>
  )
}

export default App
