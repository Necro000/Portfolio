// Approach 2: Deep 3D Ocean Hologram Integration.
// Renders ethereal holographic character projections directly inside the Three.js world,
// floating over the ocean waves with true spatial perspective.
// Solves all 2D scroll jitter, modulo snaps, and viewport sticker artifacts.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Image } from '@react-three/drei'
import useReducedMotion from '../../hooks/useReducedMotion'

function Monarch3DHologram({ isMobile = false }) {
  const prefersReducedMotion = useReducedMotion()
  const jinwooGroupRef = useRef()
  const igrisGroupRef = useRef()

  useFrame((state) => {
    if (prefersReducedMotion) return

    const t = state.clock.elapsedTime

    // Gentle oceanic bobbing and atmospheric breathing in 3D space
    if (jinwooGroupRef.current) {
      jinwooGroupRef.current.position.y = -0.2 + Math.sin(t * 1.4) * 0.08
      jinwooGroupRef.current.rotation.y = Math.sin(t * 0.8) * 0.04
    }

    if (igrisGroupRef.current) {
      igrisGroupRef.current.position.y = 0.1 + Math.sin(t * 1.2 + 1) * 0.07
      igrisGroupRef.current.rotation.y = -Math.sin(t * 0.7) * 0.03
    }
  })

  // On compact mobile screens, scale down and nudge slightly further outward
  const scaleJinwoo = isMobile ? [2.4, 3.0, 1] : [3.6, 4.5, 1]
  const scaleIgris = isMobile ? [2.2, 3.2, 1] : [3.3, 4.8, 1]

  const posXJinwoo = isMobile ? 2.5 : 4.4
  const posXIgris = isMobile ? -2.5 : -4.4

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Sung Jin-Woo Dual Daggers — Floating on the Right Horizon (Scene 0 / Hero) */}
      <group ref={jinwooGroupRef} position={[posXJinwoo, -0.2, -0.5]}>
        <Image
          url="/media/jinwoo-daggers.webp"
          transparent
          opacity={0.32}
          scale={scaleJinwoo}
          toneMapped={false}
        />
        {/* Subtle Cyan Hologram Ambient Light in 3D Ocean */}
        <pointLight position={[0, 0, 0.5]} intensity={12} color="#00f0ff" distance={5} />
      </group>

      {/* 2. Commander Igris — Floating on the Left Horizon (Scene 0 / Hero) */}
      <group ref={igrisGroupRef} position={[posXIgris, 0.1, -0.8]}>
        <Image
          url="/media/igris-shadow.webp"
          transparent
          opacity={0.28}
          scale={scaleIgris}
          toneMapped={false}
        />
        {/* Subtle Crimson Hologram Ambient Light */}
        <pointLight position={[0, 0, 0.5]} intensity={8} color="#ef4444" distance={5} />
      </group>
    </group>
  )
}

export default Monarch3DHologram
