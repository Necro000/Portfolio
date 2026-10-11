// Clean, Cinematic 3D Scene Manager.
// Dedicated 3D interaction is focused on the Hero Lantern and the Wanted Posters showcase,
// keeping other scenes clean, atmospheric, and unobstructed.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { SCENE_SPACING } from '../../utils/constants'
import { projects } from '../../data/projects'
import WantedPoster from './WantedPoster'

function ProjectsScene3D({ posterOffsets, onSelectProject, isMobile, z }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const camZ = state.camera.position.z
    // Scene 3 camera focal point is z = -25. Posters are located at z = -30.
    // When camZ is between -17 and -28, the posters are fully in focus.
    // When the user scrolls past (-28.2 towards Journey at -35) or back up (> -17),
    // smoothly scale down and set visible = false so posters and text NEVER bleed
    // into Journey or Contact, and never collide with the camera!
    const inRange = camZ >= -28.2 && camZ <= -17.0
    const targetScale = inRange ? (isMobile ? 0.65 : 1.0) : 0

    const currentScale = groupRef.current.scale.x
    const newScale = MathUtils.damp(currentScale, targetScale, 10, delta)
    groupRef.current.scale.set(newScale, newScale, newScale)
    groupRef.current.visible = newScale > 0.01
  })

  return (
    <group ref={groupRef} position={[0, 0, z]}>
      <pointLight position={[0, 2, 4]} intensity={60} color="#fff" />
      <ambientLight intensity={0.6} />

      {projects.map((project, i) => {
        const offset = posterOffsets[i] || { x: (i - 1) * 2.8, z: 0 }
        return (
          <WantedPoster
            key={project.id}
            project={project}
            position={[offset.x, 0, offset.z]}
            onClick={onSelectProject}
          />
        )
      })}
    </group>
  )
}

function PlaceholderScene({ scene, index, onSelectProject, isMobile = false }) {
  // Scene 0 at z=0, Scene 1 at z=-10, Scene 2 at z=-20, Scene 3 at z=-30...
  const z = -index * SCENE_SPACING

  // 1. SCENE 3 (PROJECTS): Interactive 3D Wanted Posters Showcase with smooth proximity culling
  if (scene.id === 'projects') {
    const posterOffsets = isMobile
      ? [
          { x: -1.7, z: -0.5 },
          { x: 0, z: 0.3 },
          { x: 1.7, z: -0.5 },
        ]
      : [
          { x: -2.8, z: -0.2 },
          { x: 0, z: 0.3 },
          { x: 2.8, z: -0.2 },
        ]

    return (
      <ProjectsScene3D
        posterOffsets={posterOffsets}
        onSelectProject={onSelectProject}
        isMobile={isMobile}
        z={z}
      />
    )
  }

  // 2. SCENE 5 (CONTACT): 3D Monarch Horizon Volumetric Beacon over the Ocean
  if (scene.id === 'contact') {
    return (
      <group position={[0, 0.6, z - 2]} scale={isMobile ? 0.7 : 1.15}>
        <pointLight position={[0, 2, 2]} intensity={45} color="#00f0ff" distance={10} />
        <pointLight position={[0, -0.5, 1]} intensity={35} color="#a855f7" distance={8} />
      </group>
    )
  }

  // All other scenes: Keep background clean and cinematic (ocean + particles + HUD)
  return null
}

export default PlaceholderScene
