// Shared numbers and the list of scenes. Change them here and everything else follows.

// How far apart the scenes are on the z axis (in 3D units).
export const SCENE_SPACING = 10

// How far in front of a scene the camera stops when looking at it.
export const CAMERA_DISTANCE = 5

// The six scenes from the PRD, in order. Colors come from DESIGN.md.
// "shape" says which placeholder geometry to draw (see PlaceholderScene.jsx).
export const SCENES = [
  { id: 'hero', name: 'Hero', shape: 'octahedron', color: '#a78bfa' },
  { id: 'about', name: 'About', shape: 'box', color: '#3ab7ff' },
  { id: 'skills', name: 'Skills', shape: 'icosahedron', color: '#6d28d9' },
  { id: 'projects', name: 'Projects', shape: 'cone', color: '#e8d9b5' },
  { id: 'journey', name: 'Journey', shape: 'torus', color: '#0e7c86' },
  { id: 'contact', name: 'Contact', shape: 'sphere', color: '#e5383b' },
]
