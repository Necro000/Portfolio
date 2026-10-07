// Reusable Solo Leveling style HUD window panel.
// Used for displaying the Hunter status, skills, and alert messages.

function SystemWindow({ title = 'SYSTEM NOTIFICATION', children, style }) {
  return (
    <div className="system-window" style={style}>
      {/* Header bar with neon blue title and pulsing status orb */}
      <div className="system-window-header">
        <span>[ {title} ]</span>
        <span className="status-indicator" title="System Online" />
      </div>

      {/* Main content slot where children components/text render */}
      <div className="system-window-body">
        {children}
      </div>
    </div>
  )
}

export default SystemWindow
