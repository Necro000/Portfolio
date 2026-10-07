// A stand-in for one scene: a slowly spinning shape with its own light.
// We'll replace these with real content in later phases.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { SCENE_SPACING } from '../../utils/constants'

// Picks the geometry (the shape) by name. Keeping this separate keeps the component below short.
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

// "scene" is one item from SCENES; "index" is its position in the list (0 to 5).
function PlaceholderScene({ scene, index }) {
  const meshRef = useRef()

  // A gentle spin so we can see it's 3D. delta keeps the speed equal on every screen.
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5
  })

  // Scene 0 sits at z = 0, scene 1 at z = -10, scene 2 at z = -20, and so on (deeper = more negative).
  const z = -index * SCENE_SPACING

  return (
    // A group moves its children together, so we position the shape and its light as one unit.
    <group position={[0, 0, z]}>
      <mesh ref={meshRef}>
        <Geometry shape={scene.shape} />
        <meshStandardMaterial color={scene.color} />
      </mesh>
      {/* Each scene brings its own lamp: a single lamp near the start would not reach z = -50. */}
      <pointLight position={[3, 3, 3]} intensity={40} />
    </group>
  )
}

export default PlaceholderScene
