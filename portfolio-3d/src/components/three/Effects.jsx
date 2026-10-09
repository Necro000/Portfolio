// Phase 5, Task 2: Cinematic Post-Processing Pipeline (Bloom & Vignette).
// Creates the signature Solo Leveling electric glow and cinematic movie framing.

import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

function Effects() {
  return (
    // EffectComposer intercepts the 3D scene before it reaches the screen
    // disableNormalPass speeds up rendering because we don't use depth-of-field or SSAO
    <EffectComposer disableNormalPass>
      {/* Bloom: Creates a radiant light aura around bright and emissive objects */}
      <Bloom
        luminanceThreshold={0.25} // Anything brighter than 0.25 will radiate light
        luminanceSmoothing={0.8}  // Smooth falloff curve
        intensity={1.3}           // Strength of the glow
        mipmapBlur                // Generates silky-smooth blur levels across resolutions
      />

      {/* Vignette: Softly darkens the outer corners of the screen */}
      <Vignette
        eskil={false}
        offset={0.2}
        darkness={0.75}
      />
    </EffectComposer>
  )
}

export default Effects
