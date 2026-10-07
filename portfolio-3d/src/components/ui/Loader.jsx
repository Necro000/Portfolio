// Solo Leveling inspired "SYSTEM INITIALIZATION" loading screen.
// Tracks 3D asset loading progress (e.g. models & textures) using drei's useProgress.

import { useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  const [isDone, setIsDone] = useState(false)

  // When assets hit 100%, wait a brief moment for a smooth transition before hiding
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setIsDone(true), 600)
      return () => clearTimeout(timer)
    }
  }, [progress])

  return (
    <div className={`system-loader ${isDone ? 'loaded' : ''}`}>
      <div className="loader-box">
        <div className="loader-title">[ SYSTEM INITIALIZING ]</div>

        {/* Progress bar */}
        <div className="loader-bar-bg">
          <div
            className="loader-bar-fill"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>

        {/* Status text */}
        <div className="loader-status">
          {progress < 100
            ? `DOWNLOADING HUNTER ASSETS... ${Math.round(progress)}%`
            : 'SYSTEM SYNCHRONIZED. WELCOME.'}
        </div>
      </div>
    </div>
  )
}

export default Loader
