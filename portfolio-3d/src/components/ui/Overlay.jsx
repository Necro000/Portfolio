// Phase 3: HTML layer on top of the 3D Canvas, utilizing SystemWindow.

import SystemWindow from './SystemWindow'

function Overlay() {
  return (
    // Fixed overlay with pointer-events: none so mouse clicks fall through to Canvas
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        zIndex: 10,
      }}
    >
      {/* SystemWindow HUD panel showcasing Solo Leveling aesthetic */}
      <SystemWindow title="HUNTER STATUS: AWAKENED">
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              margin: '0 0 8px 0',
              fontSize: '32px',
              letterSpacing: '0.1em',
              color: '#e9e7f5',
            }}
          >
            ARISE
          </h1>
          <p
            style={{
              margin: '0 0 20px 0',
              color: '#9b97b3',
              fontSize: '14px',
            }}
          >
            Creative Developer & 3D Web Explorer
          </p>

          <button
            type="button"
            onClick={() => {
              // Scroll to Projects section (index 3)
              window.scrollTo({ top: 3 * window.innerHeight, behavior: 'smooth' })
            }}
            style={{
              pointerEvents: 'auto',
              padding: '10px 24px',
              background: 'rgba(58, 183, 255, 0.1)',
              color: '#3ab7ff',
              border: '1px solid #3ab7ff',
              borderRadius: '2px',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              transition: 'all 0.2s',
            }}
          >
            VIEW PROJECTS
          </button>
        </div>
      </SystemWindow>
    </div>
  )
}

export default Overlay
