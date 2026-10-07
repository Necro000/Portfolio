# TASKS — Progress Checklist

Tick a box (`[x]`) when you finish a task. Source: PRD §11.

## Phase 0 — Setup
- [x] Install Node.js (LTS), Git
- [x] `npm create vite@latest portfolio-3d -- --template react`
- [x] `npm i three @react-three/fiber @react-three/drei gsap lenis`
- [ ] Optional: `npm i @react-three/postprocessing tailwindcss` (skipped for now)
- [x] Create GitHub repo, first commit, push
- [ ] Add the `.md` files from PRD §6

## Phase 1 — 3D Basics
- [ ] Render a `<Canvas>` with a rotating cube
- [ ] Understand: scene, camera, mesh, geometry, material, light, render loop (`useFrame`)
- [ ] Load a `.glb` with `useGLTF`
- [ ] Add mouse parallax

## Phase 2 — Layout & Scroll
- [ ] HTML overlay on top of Canvas (`position: fixed`)
- [ ] Add Lenis smooth scroll
- [ ] Map scroll progress (0 → 1) to camera position (`CameraRig.jsx`)
- [ ] Build 6 empty sections with placeholder 3D shapes

## Phase 3 — Content & UI
- [ ] Fill `data/*.js` files with real content
- [ ] Build `SystemWindow`, `Navbar` (compass), `Loader`
- [ ] Build About + Skills + Contact sections

## Phase 4 — Projects Showcase
- [ ] `WantedPoster.jsx`: plane + texture + hover tilt
- [ ] Click → `ProjectModal` with screenshots, live link, GitHub link
- [ ] Optimize screenshots to `.webp`

## Phase 5 — Anime Magic
- [ ] Bloom/glow with post-processing
- [ ] Shadow particles
- [ ] Ocean shader
- [ ] "ARISE" text + level-up animation (GSAP)
- [ ] Glitch text, speed-line transitions

## Phase 6 — Polish & Performance
- [ ] Mobile layout + lower-quality mode
- [ ] Reduced-motion support
- [ ] Compress models
- [ ] Lighthouse audit, fix issues
- [ ] SEO meta + OG image + favicon
- [ ] Test on real phone

## Phase 7 — Deploy
- [ ] Deploy to Vercel/Netlify
- [ ] Optional custom domain
- [ ] Add live link to README, LinkedIn, resume
- [ ] Record a 20-second demo video/GIF
