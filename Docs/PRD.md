# PRD — 3D Anime-Style Developer Portfolio

> **Working title:** "ARISE: Portfolio of <YOUR NAME>"
> **Inspiration:** The Drop for Creatives (Awwwards 3D portfolio element) + Solo Leveling and One Piece *vibes*
> **Build style:** Hand-coded, step by step, learning-first
> **IDE:** Antigravity

---

## 1. Vision

A scroll-driven, immersive **3D portfolio** where the visitor travels through a 3D world instead of reading a flat page. Each section is a "scene". Animations and UI borrow the *feeling* of two anime worlds:

- **Solo Leveling** → dark, shadowy, violet/electric-blue glow, the "System" window UI, level-up/stat screens, "ARISE" shadow-summon effect.
- **One Piece** → adventure, ocean, treasure maps, wanted posters, compass/Log Pose navigation, bold hand-drawn energy.

**Goal of the site:** Make a recruiter or client think *"this person can build real things"* within 10 seconds, then let them dig into projects, GitHub and LinkedIn in 2 clicks.

**Goal of the build (for you):** You understand every line, and can explain it in an interview.

> ⚠️ **Copyright note:** Take *inspiration* (colors, mood, UI concepts, motion style). Do **not** use official anime artwork, logos, character images, or the Jolly Roger of Luffy/Straw Hat Pirates as-is. Create original assets (your own skull-and-compass emblem, your own "System window", your own wanted-poster layout). This keeps your portfolio legal and makes it uniquely yours.

---

## 2. Target Audience

| Audience | What they want |
|---|---|
| Recruiters / hiring managers | Quick view of skills, best 3–4 projects, resume, contact |
| Freelance clients | Proof of quality, live demos, easy contact |
| Other developers | Interesting tech, GitHub links, clean code |

---

## 3. Core Features (MVP — must have)

1. **Loading screen** — "System loading…" with progress bar (Solo Leveling style) while 3D assets load.
2. **Hero scene** — 3D object/environment + your name + role + one-line pitch. Mouse-parallax (scene reacts to cursor).
3. **About scene** — short bio, photo (optional), "Hunter Status Window" style stats card.
4. **Skills scene** — skills shown as a *level/stat system* (e.g., React Lv.7, Three.js Lv.4). Animated bars/orbs.
5. **Projects scene** — each project is a **Wanted Poster** card in 3D space. Contains:
   - Project name, short description, tech stack tags
   - **Screenshot(s)** (image on the poster)
   - **Live link** button
   - **GitHub repo** button
   - Click → opens a detail panel/modal with more screenshots and description
6. **Experience / Journey scene** (optional but recommended) — timeline like a sea route map.
7. **Contact scene** — email, **LinkedIn**, **GitHub**, resume download. Optional simple contact form.
8. **Navigation** — fixed nav (compass-style or minimal) that smooth-scrolls/jumps between scenes.
9. **Scroll-driven camera** — camera moves through the world as the user scrolls.
10. **Responsive + fallback** — on weak devices/phones show a lighter 2D/low-poly version.

### Nice-to-have (v2)
- Sound toggle (ambient + whoosh on transitions, **off by default**)
- Custom cursor with glow trail
- "ARISE" easter egg — click a shadow figure and shadow soldiers rise
- Dark/light theme toggle
- Blog or "Now" page

---

## 4. Animation & Motion Design Spec

### 4.1 Solo Leveling–inspired
| Effect | How to build it |
|---|---|
| Shadow aura / smoke around hero object | GLSL shader or particle system (Three.js `Points`) with violet color |
| "System window" panels | HTML/CSS with blue neon border, scanline, glitch text via GSAP |
| Level-up flash | Full-screen overlay flash + number counting up (GSAP) |
| "ARISE" text reveal | Letter-by-letter reveal + camera shake + particle burst |
| Glitch/hologram text | CSS `clip-path` + GSAP timeline, or a small custom shader |
| Skill orbs / shadow soldiers | Instanced meshes rising from floor with staggered GSAP delay |

### 4.2 One Piece–inspired
| Effect | How to build it |
|---|---|
| Ocean / waves background | Custom water shader (vertex displacement) or animated plane |
| Wanted poster project cards | Textured planes with paper texture, slight sway animation, hover tilt |
| Compass navigation | SVG compass whose needle rotates to the active section |
| Treasure-map journey/timeline | SVG path drawn on scroll (`stroke-dashoffset` + GSAP ScrollTrigger) |
| Bounty counter | Animated number (e.g., "Projects shipped: 12") |
| Speed lines / impact frames | CSS/Canvas overlay on section transitions (manga-style) |

### 4.3 Global rules
- Easing: prefer `power3.out`, `expo.out`; avoid linear.
- Section transition: max **1.2 s**.
- Respect `prefers-reduced-motion` → disable heavy animation.
- Never block content behind an animation longer than 3 s (except loader).

---

## 5. Tech Stack (recommended — "best" balance of power & learnability)

| Layer | Tool | Why |
|---|---|---|
| Language | **JavaScript (ES6+)** first; upgrade to **TypeScript** later if comfortable | Easier to learn; TS optional |
| Markup/Styling | **HTML5, CSS3**, **Tailwind CSS** (optional) or plain CSS modules | Layout of UI overlays |
| Build tool | **Vite** | Fast dev server, simple config |
| UI framework | **React** | Component structure |
| 3D engine | **Three.js** via **React Three Fiber (R3F)** | Industry standard for web 3D |
| 3D helpers | **@react-three/drei** | Ready-made controls, loaders, text, etc. |
| Post-processing | **@react-three/postprocessing** | Bloom/glow (key for the Solo Leveling look) |
| Animation | **GSAP** (+ ScrollTrigger) | Timelines, scroll sync |
| Smooth scroll | **Lenis** | Buttery scroll, pairs with GSAP |
| Shaders | **GLSL** (vertex + fragment) | Water, aura, glitch |
| 3D models | **Blender** → export **.glb** | Create/optimize your own models |
| Free models | Sketchfab (CC license), Poly Pizza, Kenney | Only use properly licensed assets |
| Image tools | Squoosh / TinyPNG / `sharp` | Compress screenshots to **.webp** |
| Version control | **Git + GitHub** | Required for the portfolio itself |
| Hosting | **Vercel** or **Netlify** (free) | One-click deploy from GitHub |
| Analytics (optional) | Vercel Analytics / Plausible | See who visits |

> **Learning-path alternative:** If R3F feels too abstract, build Phase 1–2 using **vanilla Three.js** first (no React), then migrate. Vanilla teaches how Three.js *really* works (scene, camera, renderer, render loop). Decide before Phase 1 and stick to it.

---

## 6. Project Structure

```
portfolio-3d/
├── PRD.md                  ← this file
├── ARCHITECTURE.md         ← how the code is organized (you write as you go)
├── DESIGN.md               ← colors, fonts, spacing, motion rules
├── CONTENT.md              ← all text: bio, project descriptions, links
├── TASKS.md                ← checklist of phases (tick as you finish)
├── LEARNING_NOTES.md       ← your own notes: "what I learned today"
├── README.md               ← for GitHub: screenshots, setup, tech
├── package.json
├── vite.config.js
├── index.html
├── .gitignore
├── .env.example            ← only if you use a contact-form API key
│
├── public/
│   ├── models/             ← .glb files (compressed)
│   ├── textures/           ← paper, water normal maps, noise
│   ├── projects/           ← screenshots (.webp), one folder per project
│   ├── fonts/              ← self-hosted fonts
│   ├── resume.pdf
│   ├── favicon.svg
│   └── og-image.png        ← social share preview
│
└── src/
    ├── main.jsx            ← entry point
    ├── App.jsx             ← layout: <Canvas> + HTML overlay
    ├── styles/
    │   ├── global.css      ← reset, CSS variables (colors, fonts)
    │   └── ui.css          ← system-window, buttons, glitch styles
    │
    ├── data/
    │   ├── projects.js     ← array of project objects (see §7)
    │   ├── skills.js
    │   ├── experience.js
    │   └── socials.js      ← GitHub, LinkedIn, email
    │
    ├── scenes/             ← one file per 3D section
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Skills.jsx
    │   ├── Projects.jsx
    │   ├── Journey.jsx
    │   └── Contact.jsx
    │
    ├── components/
    │   ├── three/          ← reusable 3D pieces
    │   │   ├── WantedPoster.jsx
    │   │   ├── ShadowParticles.jsx
    │   │   ├── Ocean.jsx
    │   │   ├── CameraRig.jsx     ← scroll → camera path
    │   │   └── Effects.jsx       ← bloom, vignette
    │   └── ui/             ← normal HTML overlay
    │       ├── Loader.jsx
    │       ├── Navbar.jsx        ← compass nav
    │       ├── SystemWindow.jsx  ← Solo Leveling-style panel
    │       ├── ProjectModal.jsx
    │       ├── Cursor.jsx
    │       └── SoundToggle.jsx
    │
    ├── shaders/
    │   ├── water.vert.glsl
    │   ├── water.frag.glsl
    │   ├── aura.vert.glsl
    │   └── aura.frag.glsl
    │
    ├── hooks/
    │   ├── useScrollProgress.js
    │   ├── useMouseParallax.js
    │   ├── useIsMobile.js
    │   └── useReducedMotion.js
    │
    └── utils/
        ├── animations.js   ← reusable GSAP timelines
        └── constants.js    ← colors, camera positions
```

---

## 7. Data Models

### 7.1 Project object (`src/data/projects.js`)
```js
export const projects = [
  {
    id: "project-one",
    title: "Project Name",
    bounty: "Tagline or '₿ 1,000,000'-style fun label",
    description: "One or two sentences: problem → solution → result.",
    role: "Full-stack developer",
    tech: ["React", "Node.js", "MongoDB"],
    thumbnail: "/projects/project-one/cover.webp",
    screenshots: [
      "/projects/project-one/1.webp",
      "/projects/project-one/2.webp"
    ],
    links: {
      live: "https://…",
      github: "https://github.com/<you>/<repo>",
    },
    featured: true,
  },
];
```

### 7.2 Socials (`src/data/socials.js`)
```js
export const socials = {
  github: "https://github.com/<your-username>",
  linkedin: "https://www.linkedin.com/in/<your-profile>",
  email: "mailto:you@example.com",
  resume: "/resume.pdf",
};
```

### 7.3 Skills (`src/data/skills.js`)
```js
export const skills = [
  { name: "JavaScript", level: 8, category: "Language" },
  { name: "React", level: 7, category: "Frontend" },
  { name: "Three.js", level: 4, category: "3D" },
];
```

---

## 8. Visual Design Direction

### Palette (put in CSS variables)
| Token | Hex | Use |
|---|---|---|
| `--bg-void` | `#07060d` | Main background |
| `--shadow-violet` | `#6d28d9` | Solo Leveling aura |
| `--system-blue` | `#3ab7ff` | System window border/glow |
| `--ocean-teal` | `#0e7c86` | One Piece ocean accents |
| `--parchment` | `#e8d9b5` | Wanted poster paper |
| `--ink` | `#1b1410` | Poster text |
| `--alert-red` | `#e5383b` | Highlights, hover |

### Typography (free Google Fonts, self-host them)
- **Display/Headings:** `Orbitron` or `Rajdhani` (system feel) — for Solo Leveling sections
- **Poster/Adventure:** `Rye`, `Pirata One` or `Cinzel Decorative` — for One Piece sections
- **Body:** `Inter` or `Space Grotesk`

### Mood
Dark, cinematic, high contrast, glowing edges. Lots of negative space. UI should feel like a game HUD.

---

## 9. Scene-by-Scene Flow

| # | Scene | 3D content | UI overlay | Scroll animation |
|---|---|---|---|---|
| 0 | Loader | — | "SYSTEM LOADING… 73%" | Fades into hero |
| 1 | Hero | Floating emblem / island + shadow particles | Name, title, CTA "View Projects" | Camera slowly pushes in |
| 2 | About | Dark room / platform | System window: Name, Class (Developer), Level, Location | Window panels slide in |
| 3 | Skills | Orbs/crystals rising from ground | Stat bars count up | "ARISE" effect when entering |
| 4 | Projects | Row/arc of wanted posters over ocean | Project modal on click | Camera glides along posters |
| 5 | Journey | Map with drawn route | Timeline items | Path draws with scroll |
| 6 | Contact | Ship/lighthouse or portal | Links + form | Final glow, "Join the crew" CTA |

---

## 10. Non-Functional Requirements

| Area | Target |
|---|---|
| Performance | 60 fps on a mid laptop; Lighthouse Performance ≥ 85 |
| Initial load | < 5 s on 4G; total 3D assets < 10 MB (use Draco/meshopt compression) |
| Images | `.webp`, max ~200 KB each, lazy-loaded |
| Mobile | Lower pixel ratio (`dpr={[1, 1.5]}`), fewer particles, simplified scene |
| Accessibility | Keyboard-navigable, alt text on screenshots, `prefers-reduced-motion`, contrast ≥ 4.5:1 for text, text content also available as real HTML (not only in canvas) |
| SEO | Proper `<title>`, meta description, Open Graph image, semantic HTML headings |
| Browser support | Latest Chrome, Edge, Firefox, Safari (WebGL2) |
| Fallback | If WebGL fails → static 2D page with the same content |

---

## 11. Development Phases (build manually, learn at each step)

Tick these in `TASKS.md`.

### Phase 0 — Setup (Day 1)
- [ ] Install Node.js (LTS), Git
- [ ] `npm create vite@latest portfolio-3d -- --template react`
- [ ] `npm i three @react-three/fiber @react-three/drei gsap lenis`
- [ ] Optional: `npm i @react-three/postprocessing tailwindcss`
- [ ] Create GitHub repo, first commit, push
- [ ] Add the `.md` files from §6
- **Learn:** what Vite does, what `package.json` is, what a component is.

### Phase 1 — 3D Basics (Days 2–4)
- [ ] Render a `<Canvas>` with a rotating cube
- [ ] Understand: scene, camera, mesh, geometry, material, light, render loop (`useFrame`)
- [ ] Load a `.glb` with `useGLTF`
- [ ] Add mouse parallax
- **Learn:** coordinate system (x, y, z), units, camera FOV.

### Phase 2 — Layout & Scroll (Days 5–7)
- [ ] HTML overlay on top of Canvas (`position: fixed`)
- [ ] Add Lenis smooth scroll
- [ ] Map scroll progress (0 → 1) to camera position (`CameraRig.jsx`)
- [ ] Build 6 empty sections with placeholder 3D shapes
- **Learn:** how scroll value drives animation.

### Phase 3 — Content & UI (Days 8–11)
- [ ] Fill `data/*.js` files with real content
- [ ] Build `SystemWindow`, `Navbar` (compass), `Loader`
- [ ] Build About + Skills + Contact sections
- **Learn:** React props, mapping arrays to components.

### Phase 4 — Projects Showcase (Days 12–15)
- [ ] `WantedPoster.jsx`: plane + texture (your screenshot) + hover tilt
- [ ] Click → `ProjectModal` with screenshots, live link, GitHub link
- [ ] Optimize screenshots to `.webp`
- **Learn:** raycasting/pointer events in R3F, textures (`useTexture`).

### Phase 5 — Anime Magic (Days 16–21)
- [ ] Bloom/glow with post-processing
- [ ] Shadow particles (`ShadowParticles.jsx`)
- [ ] Ocean shader (start simple: sine-wave vertex displacement)
- [ ] "ARISE" text + level-up animation using GSAP timelines
- [ ] Glitch text, speed-line transitions
- **Learn:** GLSL basics (uniforms, varyings), GSAP timelines, ScrollTrigger.

### Phase 6 — Polish & Performance (Days 22–25)
- [ ] Mobile layout + lower-quality mode
- [ ] Reduced-motion support
- [ ] Compress models (gltf-transform / Draco)
- [ ] Lighthouse audit, fix issues
- [ ] SEO meta + OG image + favicon
- [ ] Test on real phone

### Phase 7 — Deploy (Day 26)
- [ ] Deploy to Vercel/Netlify
- [ ] Optional custom domain
- [ ] Add live link to your GitHub README, LinkedIn, resume
- [ ] Record a 20-second demo video/GIF for README and LinkedIn post

> Timeline is flexible — 4 weeks at ~2 hrs/day. Don't skip Phases 1–2; they are the foundation.

---

## 12. Using Antigravity Effectively

1. Open the project folder in Antigravity and keep `PRD.md` at the root so the agent can read it as context.
2. **Learning rule:** ask the agent to *explain* before it writes. Use prompts like:
   - "Explain what `useFrame` does in 5 lines, then show a minimal example."
   - "Write only Phase 1, task 2. Add comments on every line. Do not touch other files."
   - "Review my `CameraRig.jsx` and explain why the camera jitters. Don't rewrite it; suggest the fix."
3. Work **one task at a time**, run it in the browser, commit to Git, then move on.
4. Keep `LEARNING_NOTES.md` updated — it becomes your interview script.
5. Check Antigravity's docs for where to place project rules/instructions, and add a rule such as: *"Beginner-friendly code, small files, comments explaining why, no new libraries without asking."*

---

## 13. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Too ambitious, never finished | Ship MVP (Phases 0–4, 7) first; anime effects are layered on later |
| Heavy 3D = slow site | Compress assets, limit particles, test on mobile early |
| Copyright issues | Original assets only; inspiration ≠ copying |
| Code you can't explain | One task at a time, comment code, keep learning notes |
| WebGL unsupported | 2D fallback page |
| Recruiters can't find info fast | Always keep a visible nav + resume + links; don't hide content behind long animations |

---

## 14. Definition of Done

- [ ] All 6 scenes work on desktop and a phone
- [ ] ≥ 3 projects, each with screenshot(s), live link, GitHub link
- [ ] GitHub + LinkedIn + email + resume are reachable in ≤ 2 clicks from anywhere
- [ ] Solo Leveling and One Piece-inspired animations present but not overwhelming
- [ ] Lighthouse Performance ≥ 85, Accessibility ≥ 90
- [ ] Deployed with a public URL
- [ ] You can explain: the render loop, scroll → camera mapping, one shader, one GSAP timeline, and how project data flows to the UI

---

## 15. Useful Resources

- Three.js docs & examples — threejs.org
- React Three Fiber docs — r3f.docs.pmnd.rs
- Drei — github.com/pmndrs/drei
- GSAP + ScrollTrigger — gsap.com/docs
- Lenis — github.com/darkroomengineering/lenis
- The Book of Shaders — thebookofshaders.com (for GLSL)
- Three.js Journey (Bruno Simon, paid course — best structured path)
- Awwwards inspiration: awwwards.com/websites/3d, /webgl, /portfolio
- Reference site from your link: drop.peachworlds.com (study the *motion*, don't copy)

---

## 16. Next Step

Start **Phase 0**. When it's done, tell me and we'll do **Phase 1** together, one small piece at a time, with every line explained.
