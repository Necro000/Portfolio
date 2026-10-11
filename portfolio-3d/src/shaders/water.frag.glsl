// Phase 5, Task 4: Water Fragment Shader
// Calculates the pixel color of the ocean: deep teal in the troughs, cyan on wave crests.

uniform vec3 uColorDeep;      // Color in deep wave troughs (dark ocean teal)
uniform vec3 uColorSurface;   // Color on high wave peaks (bright electric cyan)
uniform float uOpacity;       // Translucency of the water surface

varying float vElevation;     // Received from vertex shader: height of this pixel's wave
varying vec2 vUv;            // UV coordinates for edge feathering

void main() {
  // Normalize wave height from [-0.3, +0.3] into [0.0, 1.0] for color interpolation
  float mixStrength = (vElevation + 0.25) * 1.8;
  mixStrength = clamp(mixStrength, 0.0, 1.0);

  // Smoothly blend between deep ocean color and surface foam color
  vec3 finalColor = mix(uColorDeep, uColorSurface, mixStrength);

  // Softly feather the edges along X and Y to dissolve into the dark void seamlessly
  float edgeFadeX = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
  float edgeFadeY = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);
  float edgeAlpha = uOpacity * edgeFadeX * edgeFadeY;

  // Set the final RGBA color of the pixel
  gl_FragColor = vec4(finalColor, edgeAlpha);
}
