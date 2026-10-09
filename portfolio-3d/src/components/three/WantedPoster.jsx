// High-End 3D Holographic Project Monolith.
// Replaces clumsy parchment paper with a precision obsidian glass slab,
// metallic chamfers, glowing neon laser rims, and crisp typography.

import { useRef, useState, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Image } from '@react-three/drei'
import { MathUtils } from 'three'

function WantedPoster({ project, position = [0, 0, 0], onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Smoothly ease the 3D card tilt towards the cursor
    const targetX = hovered ? targetRotation.current.x : 0
    const targetY = hovered ? targetRotation.current.y : 0

    meshRef.current.rotation.x = MathUtils.damp(
      meshRef.current.rotation.x,
      targetX,
      9,
      delta
    )
    meshRef.current.rotation.y = MathUtils.damp(
      meshRef.current.rotation.y,
      targetY,
      9,
      delta
    )

    // Lift forward on the Z-axis on hover with smooth damping
    const targetZ = hovered ? position[2] + 0.45 : position[2]
    meshRef.current.position.z = MathUtils.damp(
      meshRef.current.position.z,
      targetZ,
      7,
      delta
    )
  })

  function handlePointerMove(e) {
    e.stopPropagation()
    if (e.uv) {
      targetRotation.current.x = (e.uv.y - 0.5) * 0.35
      targetRotation.current.y = -(e.uv.x - 0.5) * 0.35
    }
  }

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onPointerMove={handlePointerMove}
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) onClick(project)
      }}
    >
      {/* ========================================================
          1. LASER RIM FRAME (Glows with Post-Processing Bloom)
          ======================================================== */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.26, 3.26]} />
        <meshStandardMaterial
          color={hovered ? '#00f0ff' : '#4f46e5'}
          emissive={hovered ? '#00f0ff' : '#38bdf8'}
          emissiveIntensity={hovered ? 1.8 : 0.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* ========================================================
          2. OBSIDIAN GLASS SLAB BASE
          ======================================================== */}
      <mesh>
        <planeGeometry args={[2.2, 3.2]} />
        <meshStandardMaterial
          color={hovered ? '#100e1c' : '#08070e'}
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* ========================================================
          3. HEADER BADGE: STATUS PILL
          ======================================================== */}
      <Text
        position={[0, 1.32, 0.02]}
        fontSize={0.085}
        color={hovered ? '#00f0ff' : '#94a3b8'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.14}
        fontWeight="bold"
      >
        {hovered ? '● LIVE PRODUCTION APP' : '[ SYSTEM DISPATCH ]'}
      </Text>

      {/* ========================================================
          4. SCREENSHOT DISPLAY BEZEL & IMAGE
          ======================================================== */}
      {/* Dark metallic background frame */}
      <mesh position={[0, 0.42, 0.015]}>
        <planeGeometry args={[1.88, 1.34]} />
        <meshStandardMaterial color="#030206" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Asynchronous Texture Loader with Safe Fallback */}
      <Suspense
        fallback={
          <mesh position={[0, 0.42, 0.02]}>
            <planeGeometry args={[1.84, 1.3]} />
            <meshStandardMaterial color="#0e0d16" roughness={0.8} />
          </mesh>
        }
      >
        {project.thumbnail && (
          <Image
            url={project.thumbnail}
            position={[0, 0.42, 0.025]}
            scale={[1.84, 1.3]}
            transparent
            opacity={0.96}
          />
        )}
      </Suspense>

      {/* ========================================================
          5. PROJECT TITLE & DETAILS
          ======================================================== */}
      <Text
        position={[0, -0.44, 0.02]}
        fontSize={0.125}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={1.9}
        textAlign="center"
        letterSpacing={0.04}
      >
        {project.title.toUpperCase()}
      </Text>

      {/* Tech Stack Pills */}
      <Text
        position={[0, -0.72, 0.02]}
        fontSize={0.08}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
        textAlign="center"
        letterSpacing={0.06}
      >
        {project.tech.slice(0, 4).join('  •  ')}
      </Text>

      {/* Role / Architecture Tag */}
      <Text
        position={[0, -0.96, 0.02]}
        fontSize={0.075}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {project.role.toUpperCase()}
      </Text>

      {/* ========================================================
          6. INTERACTIVE CALLOUT BUTTON
          ======================================================== */}
      <mesh position={[0, -1.28, 0.02]}>
        <planeGeometry args={[1.8, 0.28]} />
        <meshStandardMaterial
          color={hovered ? '#00f0ff' : '#1e1b4b'}
          emissive={hovered ? '#00f0ff' : '#0f172a'}
          emissiveIntensity={hovered ? 0.9 : 0.1}
          roughness={0.3}
        />
      </mesh>

      <Text
        position={[0, -1.28, 0.03]}
        fontSize={0.075}
        color={hovered ? '#030206' : '#93c5fd'}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        letterSpacing={0.08}
      >
        {hovered ? 'INSPECT ARCHITECTURE ↗' : 'VIEW PROJECT DETAILS'}
      </Text>
    </group>
  )
}

export default WantedPoster
