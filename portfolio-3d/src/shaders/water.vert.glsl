// Phase 5, Task 4: Water Vertex Shader
// Displaces the vertices of a 3D plane using sine waves to create rolling ocean waves.

uniform float uTime;          // Current elapsed time passed from JavaScript
uniform float uWaveSpeed;     // Speed of the rolling waves
uniform float uWaveHeight;    // Height of the wave crests

varying float vElevation;     // Sent to fragment shader so it knows the wave height

void main() {
  vec3 modelPosition = position;

  // Calculate sine-wave displacement using both X and Y local coordinates
  // Combining two sine/cosine waves creates organic, non-repetitive ocean swells
  float elevation = sin(modelPosition.x * 0.35 + uTime * uWaveSpeed) * 
                    cos(modelPosition.y * 0.25 + uTime * uWaveSpeed * 0.7) * 
                    uWaveHeight;

  // Displace the vertex along its normal (Z in local plane coordinates)
  modelPosition.z += elevation;

  // Pass elevation value to the fragment shader for wave-crest color blending
  vElevation = elevation;

  // Transform 3D coordinate from model space into screen camera projection
  vec4 viewPosition = viewMatrix * modelMatrix * vec4(modelPosition, 1.0);
  gl_Position = projectionMatrix * viewPosition;
}
