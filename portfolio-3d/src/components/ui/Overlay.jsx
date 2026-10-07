// Phase 2, Task 1: an HTML layer that sits on top of the 3D Canvas.

function Overlay() {
  return (
    // position: fixed pins this layer to the screen; inset: 0 stretches it over everything.
    // pointer-events: none lets the mouse "fall through" to the Canvas below,
    // otherwise this layer would block the mouse and the parallax would stop working.
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        // Flexbox centers the text block on the screen.
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        // Colors come from DESIGN.md (--text and --system-blue).
        color: '#e9e7f5',
        textAlign: 'center',
      }}
    >
      {/* Real HTML text: sharp, selectable, and readable by screen readers. */}
      <h1 style={{ margin: 0, fontSize: '40px', letterSpacing: '0.08em' }}>
        ARISE
      </h1>
      <p style={{ margin: 0, color: '#9b97b3' }}>
        HTML layer on top of the 3D canvas
      </p>

      {/* Buttons must opt back in to the mouse, since their parent turned it off. */}
      <button
        type="button"
        style={{
          pointerEvents: 'auto',
          padding: '8px 24px',
          background: 'transparent',
          color: '#3ab7ff',
          border: '1px solid #3ab7ff',
          cursor: 'pointer',
        }}
      >
        View Projects
      </button>
    </div>
  )
}

export default Overlay
