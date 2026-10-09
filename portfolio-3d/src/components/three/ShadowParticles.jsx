// Phase 5, Task 3: Solo Leveling inspired Shadow Particles / Mana Embers.
// Uses a high-performance Three.js Points system (1 single GPU draw call).

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ShadowParticles({ count = 500 }) {
  const geometryRef = useRef()

  // Generate initial particle coordinates deterministically across all 6 scene depths
  // useMemo ensures this array is only computed once when the component mounts
  const [positions, initialX] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const initX = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random generation to ensure render purity
      const seed1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453
      const rand1 = seed1 - Math.floor(seed1)
      const seed2 = Math.sin(i * 39.346 + 11.135) * 43758.5453
      const rand2 = seed2 - Math.floor(seed2)
      const seed3 = Math.sin(i * 73.156 + 54.832) * 43758.5453
      const rand3 = seed3 - Math.floor(seed3)

      const x = (rand1 - 0.5) * 16 // Horizontal spread (-8 to +8)
      const y = (rand2 - 0.5) * 12 // Vertical spread (-6 to +6)
      const z = 5 - rand3 * 60     // Depth spread (+5 down to -55)

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      initX[i] = x
    }
    return [pos, initX]
  }, [count])

  // Runs on every frame refresh (60/144 fps)
  useFrame((state, delta) => {
    if (!geometryRef.current) return

    const posArray = geometryRef.current.attributes.position.array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const idx = i * 3

      // 1. Float gently upwards like smoke embers
      posArray[idx + 1] += delta * 0.7

      // If particle rises past the top of the viewport (+6), reset it to bottom (-6)
      if (posArray[idx + 1] > 6) {
        posArray[idx + 1] = -6
      }

      // 2. Add subtle horizontal sway using sine wave for organic smoke turbulence
      posArray[idx] = initialX[i] + Math.sin(time * 0.8 + i) * 0.25
    }

    // Tell Three.js the GPU position buffer has changed and needs a re-render
    geometryRef.current.attributes.position.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      {/* AdditiveBlending + depthWrite={false} creates a luminous glowing aura when particles overlap */}
      <pointsMaterial
        size={0.08}
        color="#a78bfa" // Electric soft-violet shadow color
        transparent
        opacity={0.85}
        sizeAttenuation // Particles farther from camera naturally appear smaller
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default ShadowParticles
