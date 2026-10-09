# ARCHITECTURE — How the Code Is Organized

> Starter version. Keep editing it in your own words as you build; it's interview practice.

## Folder overview (`portfolio-3d/`)
| Path | What it holds | Why |
|---|---|---|
| `index.html` | The single HTML page Vite serves | React mounts into `<div id="root">` here |
| `public/` | Files served as-is: models, textures, project screenshots, fonts, resume | Not processed by the bundler; reached by URL like `/projects/x/cover.webp` |
| `src/main.jsx` | Entry point | Starts React and renders `<App />` |
| `src/App.jsx` | Top-level layout | Puts the 3D `<Canvas>` behind and the HTML UI overlay on top |
| `src/scenes/` | One file per section (Hero, About, Skills, Projects, Journey, Contact) | Each section's 3D content stays separate and easy to find |
| `src/components/three/` | Reusable 3D pieces (WantedPoster, ShadowParticles, Ocean, CameraRig, Effects) | Used inside scenes |
| `src/components/ui/` | Normal HTML UI (Loader, Navbar, SystemWindow, ProjectModal, Cursor) | Text and buttons are better as real HTML for accessibility |
| `src/data/` | Content as plain JS arrays/objects | Change text without touching component code |
| `src/shaders/` | GLSL files | Custom GPU effects (water, aura, glitch) |
| `src/hooks/` | Small reusable logic (scroll progress, mouse parallax, mobile check) | Keeps components short |
| `src/utils/` | Constants and shared GSAP timelines | One place for colors and camera positions |
| `src/styles/` | Global CSS and UI CSS | CSS variables from DESIGN.md live here |

## The two layers
```
┌──────────────────────────────┐
│  HTML overlay (position:fixed) │  ← text, buttons, nav, modal
├──────────────────────────────┤
│  <Canvas> (WebGL, 3D world)    │  ← camera, meshes, particles, shaders
└──────────────────────────────┘
```
The page scrolls normally, and the scroll value moves the 3D camera.

## How data flows
`src/data/projects.js` → `Projects.jsx` (loops over the array) → one `WantedPoster.jsx` per project → click sets the selected project → `ProjectModal.jsx` shows screenshots, live link and GitHub link.

Same idea for `skills.js` → Skills scene, `socials.js` → Contact scene and Navbar.

## How scroll drives the camera
<!-- Fill in during Phase 2, in your own words. -->
Plan: Lenis smooths the scroll → a hook turns it into a number from 0 to 1 → `CameraRig.jsx` reads it inside `useFrame` and moves the camera along a path between the six scene positions. GSAP ScrollTrigger handles the UI animations at the same scroll points.

## Render loop (Phase 1 notes)
<!-- Fill in after Phase 1: scene, camera, renderer, mesh, useFrame. -->

## Key decisions
| Decision | Why |
|---|---|
| **Vite** | Very fast dev server, almost no config, ideal for learning |
| **React + React Three Fiber** | Describe 3D scenes as components; matches how I'd structure a normal React app |
| **JavaScript, not TypeScript** | Fewer new things at once; can migrate later |
| **GSAP + Lenis** | Industry-standard animation and smooth scroll; both pair well with scroll-driven 3D |
| **Data in `src/data/`** | Content is separate from code, easy to update |
| **HTML for text, canvas for visuals** | Better accessibility, SEO and sharper text |
| **Original assets only** | Anime-inspired mood, but no copyrighted artwork or logos |
| **Low-quality mode for mobile** | Keeps frame rate acceptable on phones |

## Performance rules
- Compress `.glb` models; images as `.webp`.
- Limit particle counts; fewer on mobile.
- Cap pixel ratio: `dpr={[1, 1.5]}`.
- Reuse geometries/materials; don't create objects inside `useFrame`.