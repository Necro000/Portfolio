// Phase 5, Task 4: Animated Grand Line Ocean with custom GLSL Shader.
// Simulates rolling water waves beneath the floating scenes and Wanted Posters.

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Import GLSL shader code as raw text strings using Vite's native ?raw import
import waterVertexShader from '../../shaders/water.vert.glsl?raw'
import waterFragmentShader from '../../shaders/water.frag.glsl?raw'

function Ocean() {
  const materialRef = useRef()

  // Uniforms are variables sent from JavaScript into the GPU shader
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveSpeed: { value: 1.1 },
      uWaveHeight: { value: 0.32 },
      uColorDeep: { value: new THREE.Color('#051d28') },    // Deep ocean abyss
      uColorSurface: { value: new THREE.Color('#3ab7ff') }, // Glowing cyan wave crests
      uOpacity: { value: 0.65 },
    }),
    []
  )

  // Update uTime on every frame so the GPU waves continually animate
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    // Laid flat beneath the scenes: rotated -90deg on X-axis, positioned at y = -3.2
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, -25]}>
      {/* 28 units wide, 75 units long, subdivided into 64x64 grid of vertices */}
      <planeGeometry args={[28, 75, 64, 64]} />
      {/* Custom Shader Material powered by our vertex & fragment shaders */}
      <shaderMaterial
        ref={materialRef}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default Ocean
