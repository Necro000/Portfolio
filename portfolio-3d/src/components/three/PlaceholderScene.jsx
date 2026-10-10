// Clean, Cinematic 3D Scene Manager.
// Dedicated 3D interaction is focused on the Hero Lantern and the Wanted Posters showcase,
// keeping other scenes clean, atmospheric, and unobstructed.

import { SCENE_SPACING } from '../../utils/constants'
import { projects } from '../../data/projects'
import WantedPoster from './WantedPoster'

function PlaceholderScene({ scene, index, onSelectProject, isMobile = false }) {
  // Scene 0 at z=0, Scene 1 at z=-10, Scene 2 at z=-20, Scene 3 at z=-30...
  const z = -index * SCENE_SPACING

  // 1. SCENE 3 (PROJECTS): Interactive 3D Wanted Posters Showcase
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
      <group position={[0, 0, z]} scale={isMobile ? 0.65 : 1.0}>
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

  // 2. SCENE 5 (CONTACT): 3D Monarch Horizon Volumetric Beacon over the Ocean
  if (scene.id === 'contact') {
    return (
      <group position={[0, 0.6, z - 2]} scale={isMobile ? 0.7 : 1.15}>
        <pointLight position={[0, 2, 2]} intensity={45} color="#00f0ff" distance={10} />
        <pointLight position={[0, -0.5, 1]} intensity={35} color="#f59e0b" distance={8} />
      </group>
    )
  }

  // All other scenes: Keep background clean and cinematic (ocean + particles + HUD)
  return null
}

export default PlaceholderScene
