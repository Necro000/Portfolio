// Phase 1, Task 4: mouse parallax (cube from Task 1 and lantern from Task 3 stay).

import { useRef, Suspense } from 'react'
// Canvas = the 3D world. useFrame = code that runs on every rendered frame.
import { Canvas, useFrame } from '@react-three/fiber'
// useGLTF = drei's helper that loads .glb / .gltf files.
import { useGLTF } from '@react-three/drei'
// MathUtils has small math helpers; we use damp() for smooth easing.
import { MathUtils } from 'three'

// A small component for just the cube. It must live INSIDE <Canvas>,
// because useFrame only works within the 3D world.
function SpinningCube() {
  // A ref is a handle to the real 3D object, so we can change it directly.
  // We use a ref (not state) because state would re-render React 60 times a second.
  const cubeRef = useRef()

  // Runs every frame. "delta" = seconds since the last frame.
  useFrame((state, delta) => {
    // Multiplying by delta makes the speed the same on 60Hz and 144Hz screens.
    // Rotation is in radians; 1 means about 57 degrees per second.
    cubeRef.current.rotation.x += delta
    cubeRef.current.rotation.y += delta
  })

  return (
    // position = [x, y, z]. x = -2 moves the cube left to make room for the model.
    <mesh ref={cubeRef} position={[-2, 0, 0]}>
      {/* geometry = the shape. [1, 1, 1] means width, height, depth in 3D units. */}
      <boxGeometry args={[1, 1, 1]} />
      {/* material = the surface. "Standard" reacts to light; violet is --shadow-violet from DESIGN.md. */}
      <meshStandardMaterial color="#6d28d9" />
    </mesh>
  )
}

// Loads the lantern model from public/models/ and puts it in the scene.
function Lantern() {
  // "/models/lantern.glb" = a file in public/. The hook waits for the download,
  // so a <Suspense> parent is required (see App below).
  // "scene" is the whole 3D object inside the file (its meshes, materials, textures).
  const { scene } = useGLTF('/models/lantern.glb')

  // <primitive> inserts an existing Three.js object into our scene.
  // scale: this model is huge, so 0.1 shrinks it to 10% of its size.
  // position: its origin is at its base, so y = -1 sets it down a bit; x = 2 puts it on the right.
  return <primitive object={scene} scale={0.1} position={[2, -1, 0]} />
}

// Moves the camera slightly toward the mouse, so the scene feels deep.
// Renders nothing (returns null); it only runs code every frame.
function MouseParallax() {
  useFrame((state, delta) => {
    // state.camera = the camera we're moving. state.pointer = mouse position, -1 to 1 on each axis.
    const { camera, pointer } = state

    // How far the camera may shift. Bigger = stronger effect.
    const strength = 1

    // damp(current, target, speed, delta) moves current a bit toward target each frame.
    // Speed 3 is gentle. Using delta keeps it the same on any refresh rate.
    // Mouse right (x +) -> camera moves right. Mouse up (y +) -> camera moves up.
    camera.position.x = MathUtils.damp(camera.position.x, pointer.x * strength, 3, delta)
    camera.position.y = MathUtils.damp(camera.position.y, pointer.y * strength, 3, delta)

    // Moving the camera also changes where it points, so we aim it at the center again.
    camera.lookAt(0, 0, 0)
  })

  return null
}

function App() {
  return (
    // The Canvas fills its parent, so we give the parent the whole screen.
    // position: fixed + inset: 0 also ignores the leftover Vite starter styles on #root.
    <div style={{ position: 'fixed', inset: 0, background: '#07060d' }}>
      {/* The default camera sits at z = 5 and looks at the center (0, 0, 0). */}
      <Canvas>
        {/* Soft light from everywhere, so no side is pitch black. */}
        <ambientLight intensity={0.5} />
        {/* Light from a point in space (x, y, z), like a lamp. It gives the objects shading. */}
        <pointLight position={[5, 5, 5]} intensity={60} />
        {/* Runs every frame and eases the camera toward the cursor. */}
        <MouseParallax />
        <SpinningCube />
        {/* Suspense = "wait here until the model has loaded". fallback={null} shows nothing meanwhile. */}
        <Suspense fallback={null}>
          <Lantern />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
