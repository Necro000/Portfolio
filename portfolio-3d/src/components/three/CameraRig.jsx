// Phase 2, Task 3: moves the camera based on how far down the page the user has scrolled.

import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { SCENES, SCENE_SPACING, CAMERA_DISTANCE } from '../../utils/constants'

// Camera z at the top of the page: in front of the first scene (z = 0).
const START_Z = CAMERA_DISTANCE
// Camera z at the bottom: in front of the LAST scene (5 gaps of 10 units = -50, so z = -45).
const END_Z = -(SCENES.length - 1) * SCENE_SPACING + CAMERA_DISTANCE

// Renders nothing; it only moves the camera. It must live INSIDE <Canvas> to use useFrame.
function CameraRig() {
  useFrame((state) => {
    // How far we can scroll in total = full page height minus one screen.
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight

    // progress = 0 at the top, 1 at the bottom. The max(..., 1) avoids dividing by zero
    // if the page isn't scrollable. clamp keeps it between 0 and 1.
    const progress = MathUtils.clamp(window.scrollY / Math.max(maxScroll, 1), 0, 1)

    // lerp(a, b, t) = a point t of the way from a to b. t = 0 gives a, t = 1 gives b.
    // We change only z here; MouseParallax controls x and y, so the two don't fight.
    state.camera.position.z = MathUtils.lerp(START_Z, END_Z, progress)
  })

  return null
}

export default CameraRig
