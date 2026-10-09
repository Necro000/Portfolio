# TASKS — Progress Checklist

Tick a box (`[x]`) when you finish a task. Source: PRD §11.

## Phase 0 — Setup
- [x] Install Node.js (LTS), Git
- [x] `npm create vite@latest portfolio-3d -- --template react`
- [x] `npm i three @react-three/fiber @react-three/drei gsap lenis`
- [ ] Optional: `npm i @react-three/postprocessing tailwindcss` (skipped for now; postprocessing is needed in Phase 5)
- [x] Create GitHub repo, first commit, push
- [x] Add the `.md` files from PRD §6
- [ ] Fill in `DESIGN.md` and `CONTENT.md` with my own choices

## Phase 1 — 3D Basics
- [x] Render a `<Canvas>` with a rotating cube
- [x] Understand: scene, camera, mesh, geometry, material, light, render loop (`useFrame`)
- [x] Load a `.glb` with `useGLTF`
- [x] Add mouse parallax

## Phase 2 — Layout & Scroll
- [x] HTML overlay on top of Canvas (`position: fixed`)
- [x] Add Lenis smooth scroll
- [x] Map scroll progress (0 → 1) to camera position (`CameraRig.jsx`)
- [x] Build 6 empty sections with placeholder 3D shapes

## Phase 3 — Content & UI
- [x] Fill `data/*.js` files with real content
- [x] Build `SystemWindow`, `Navbar` (compass), `Loader`
- [x] Build About + Skills + Contact sections

## Phase 4 — Projects Showcase
- [x] `WantedPoster.jsx`: plane + texture + hover tilt
- [x] Click → `ProjectModal` with screenshots, live link, GitHub link
- [x] Optimize screenshots to `.webp`

## Phase 5 — Anime Magic
- [x] Install `@react-three/postprocessing`
- [x] Bloom/glow with post-processing
- [x] Shadow particles
- [x] Ocean shader
- [x] "ARISE" text + level-up animation (GSAP)
- [x] Glitch text, speed-line transitions

## Phase 6 — Polish & Performance
- [x] Mobile layout + lower-quality mode
- [x] Reduced-motion support
- [x] Compress models
- [x] Lighthouse audit, fix issues
- [x] SEO meta + OG image + favicon
- [x] Test on real phone

## Phase 7 — Deploy
- [ ] Deploy to Vercel/Netlify
- [ ] Optional custom domain
- [ ] Add live link to README, LinkedIn, resume
- [ ] Record a 20-second demo video/GIF