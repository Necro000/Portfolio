// Renders 3D content for a scene.
// For the 'projects' scene, renders interactive 3D Wanted Posters.
// For other scenes, renders thematic placeholder geometries until later phases.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { SCENE_SPACING } from '../../utils/constants'
import { projects } from '../../data/projects'
import WantedPoster from './WantedPoster'

// Helper that picks the placeholder geometry for non-project scenes
function Geometry({ shape }) {
  switch (shape) {
    case 'box':
      return <boxGeometry args={[1.4, 1.4, 1.4]} />
    case 'sphere':
      return <sphereGeometry args={[0.9, 32, 32]} />
    case 'cone':
      return <coneGeometry args={[0.9, 1.6, 32]} />
    case 'torus':
      return <torusGeometry args={[0.8, 0.3, 16, 48]} />
    case 'icosahedron':
      return <icosahedronGeometry args={[1]} />
    default:
      return <octahedronGeometry args={[1]} />
  }
}

function PlaceholderScene({ scene, index, onSelectProject }) {
  const meshRef = useRef()

  // Gentle spin for placeholder shapes
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  // Scene 0 at z=0, Scene 1 at z=-10, Scene 2 at z=-20, Scene 3 at z=-30...
  const z = -index * SCENE_SPACING

  // ========================================================
  // SPECIAL HANDLING FOR PROJECTS SCENE (Scene 3)
  // Renders the 3 One Piece inspired Wanted Posters in 3D!
  // ========================================================
  if (scene.id === 'projects') {
    // Spacing offsets for the 3 posters in a shallow arc
    const posterOffsets = [
      { x: -2.8, z: -0.2 },
      { x: 0, z: 0.3 },
      { x: 2.8, z: -0.2 },
    ]

    return (
      <group position={[0, 0, z]}>
        {/* Lights focused specifically on the posters */}
        <pointLight position={[0, 2, 4]} intensity={60} color="#fff" />
        <ambientLight intensity={0.6} />

        {/* Map through the 3 projects from src/data/projects.js */}
        {projects.map((project, i) => (
          <WantedPoster
            key={project.id}
            project={project}
            position={[posterOffsets[i].x, 0, posterOffsets[i].z]}
            onClick={onSelectProject}
          />
        ))}
      </group>
    )
  }

  // ========================================================
  // DEFAULT PLACEHOLDER SCENE (for other scenes)
  // ========================================================
  return (
    <group position={[0, 0, z]}>
      <mesh ref={meshRef}>
        <Geometry shape={scene.shape} />
        <meshStandardMaterial color={scene.color} />
      </mesh>
      {/* Each scene brings its own light */}
      <pointLight position={[3, 3, 3]} intensity={40} />
    </group>
  )
}

export default PlaceholderScene
