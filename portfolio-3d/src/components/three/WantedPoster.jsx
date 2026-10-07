// Phase 4, Task 1: 3D Wanted Poster with raycasted hover tilt and pointer events.
// Inspired by One Piece wanted posters floating in 3D space.

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
// Drei's <Text> renders crisp typography directly inside the 3D WebGL scene!
import { Text } from '@react-three/drei'
import { MathUtils } from 'three'

function WantedPoster({ project, position = [0, 0, 0], onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  // Store target tilt angles (in radians) calculated from mouse position over the poster
  const targetRotation = useRef({ x: 0, y: 0 })

  // Runs on every frame refresh (60/144 fps)
  useFrame((state, delta) => {
    if (!meshRef.current) return

    // 1. Smoothly interpolate (damp) the poster's 3D tilt towards target rotation
    // When hovered: tilts towards cursor. When not hovered: smoothly returns to 0
    const targetX = hovered ? targetRotation.current.x : 0
    const targetY = hovered ? targetRotation.current.y : 0

    meshRef.current.rotation.x = MathUtils.damp(
      meshRef.current.rotation.x,
      targetX,
      8,
      delta
    )
    meshRef.current.rotation.y = MathUtils.damp(
      meshRef.current.rotation.y,
      targetY,
      8,
      delta
    )

    // 2. Smoothly float the poster slightly forward on Z-axis when hovered
    const targetZ = hovered ? position[2] + 0.4 : position[2]
    meshRef.current.position.z = MathUtils.damp(
      meshRef.current.position.z,
      targetZ,
      6,
      delta
    )
  })

  // Calculate mouse tilt based on where the cursor hits the poster plane
  function handlePointerMove(e) {
    e.stopPropagation() // Prevent events from bleeding into objects behind
    if (e.uv) {
      // e.uv gives normalized coordinates across the face (0 to 1). Center is at 0.5.
      // Offset from center (-0.5 to +0.5) determines tilt direction
      targetRotation.current.x = (e.uv.y - 0.5) * 0.4
      targetRotation.current.y = -(e.uv.x - 0.5) * 0.4
    }
  }

  return (
    <group
      ref={meshRef}
      position={position}
      // R3F 3D Pointer Events (Raycasting)
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
          1. PARCHMENT POSTER BASE (Aged Paper)
          ======================================================== */}
      {/* 2.2 units wide, 3.2 units tall */}
      <mesh>
        <planeGeometry args={[2.2, 3.2]} />
        <meshStandardMaterial
          color={hovered ? '#f4e9cf' : '#e8d9b5'} // Glows subtly brighter on hover
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* ========================================================
          2. POSTER HEADLINE: "WANTED"
          ======================================================== */}
      <Text
        position={[0, 1.25, 0.02]} // Placed 0.02 in front of the parchment plane to avoid z-fighting
        fontSize={0.24}
        color="#1b1410"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
        fontWeight="bold"
      >
        WANTED
      </Text>

      {/* ========================================================
          3. PICTURE FRAME (Placeholder for screenshot)
          ======================================================== */}
      <mesh position={[0, 0.35, 0.02]}>
        <planeGeometry args={[1.8, 1.3]} />
        <meshStandardMaterial
          color="#1b1410"
          roughness={0.9}
        />
      </mesh>

      {/* Tech stack badge preview inside the picture frame */}
      <Text
        position={[0, 0.35, 0.03]}
        fontSize={0.09}
        color="#3ab7ff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
        textAlign="center"
      >
        {project.tech.join(' • ')}
      </Text>

      {/* ========================================================
          4. "DEAD OR ALIVE" BANNER
          ======================================================== */}
      <Text
        position={[0, -0.45, 0.02]}
        fontSize={0.1}
        color="#5c4d3c"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        DEAD OR ALIVE
      </Text>

      {/* ========================================================
          5. PROJECT TITLE
          ======================================================== */}
      <Text
        position={[0, -0.7, 0.02]}
        fontSize={0.14}
        color="#1b1410"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={1.9}
        textAlign="center"
      >
        {project.title.toUpperCase()}
      </Text>

      {/* ========================================================
          6. BOUNTY AMOUNT
          ======================================================== */}
      <Text
        position={[0, -1.05, 0.02]}
        fontSize={0.17}
        color="#e5383b" // Signature red bounty stamp
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        letterSpacing={0.06}
      >
        {project.bounty}
      </Text>

      {/* Click indicator hint */}
      {hovered && (
        <Text
          position={[0, -1.35, 0.02]}
          fontSize={0.08}
          color="#0e7c86"
          anchorX="center"
          anchorY="middle"
        >
          [ CLICK FOR DETAILS ]
        </Text>
      )}
    </group>
  )
}

export default WantedPoster
