# ⚡ SOHIT KUMAR // 3D CYBERPUNK PORTFOLIO

<div align="center">

```
   ███╗   ██╗███████╗ ██████╗██████╗  ██████╗      ██████╗  ██████╗ 
   ████╗  ██║██╔════╝██╔════╝██╔══██╗██╔═══██╗     ╚════██╗██╔═████╗
   ██╔██╗ ██║█████╗  ██║     ██████╔╝██║   ██║      █████╔╝██║██╔██║
   ██║╚██╗██║██╔══╝  ██║     ██╔══██╗██║   ██║      ╚═══██╗████╔╝██║
   ██║ ╚████║███████╗╚██████╗██║  ██║╚██████╔╝     ██████╔╝╚██████╔╝
   ╚═╝  ╚═══╝╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝      ╚═════╝  ╚═════╝ 
```

**Next-Gen WebGL • Three.js (R3F) • Custom GLSL Shaders • Solo Leveling Anime Aesthetic**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-00f0ff?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-one-sooty-xxw5ag3on.vercel.app/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)](LICENSE)

<br/>

[Overview](#-overview) • [Key Engineering Highlights](#-key-engineering-highlights) • [System Architecture](#-system-architecture) • [Performance & Optimizations](#-performance--optimizations) • [Local Setup](#-local-development--setup)

---

</div>

## 🌌 Overview

This repository houses the source code for the 3D developer portfolio of **Sohit Kumar (Necro)** — MCA Scholar & Agentic Systems Developer. 

Engineered from the ground up to break away from traditional static web resumes, this project fuses **production-grade full-stack engineering** with an immersive **high-framerate WebGL journey**. Inspired by the visual storytelling of *Solo Leveling* and *Cyberpunk UI*, it turns technical credentials, active deployments, and architecture case studies into an interactive digital experience.

---

## ⚡ Key Engineering Highlights

### 🌊 Procedural GLSL Ocean Simulation
- **Custom Shaders**: Written in raw GLSL ([`water.vert.glsl`](portfolio-3d/src/shaders/water.vert.glsl) & [`water.frag.glsl`](portfolio-3d/src/shaders/water.frag.glsl)) computing procedural Gerstner-style sine waves, dynamic normal recalculation, and depth-based specular highlights.
- **Zero Heavy Textures**: Renders an infinite ocean surface mathematically in memory, eliminating multi-megabyte diffuse maps.

### 📜 Interactive 3D Wanted Posters (Project Showcase)
- **Raycasting & Spring Physics**: Interactive 3D planes rendered in R3F with hover tilt physics, Euler rotation damping, and depth translation.
- **Proximity Camera Culling**: Camera-based frustum/range culling that smoothly scales down and unmounts out-of-focus 3D nodes to guarantee a rock-solid **60 FPS** scroll.

### 🛡️ Solo Leveling "Hunter System" Interface
- **Cyberpunk System HUD**: Translucent glassmorphism dialogs mimicking an RPG Hunter Status Window, displaying real-time technical stats and stack telemetry.
- **Synthesizer Audio Feedback**: Lightweight Web Audio API sound effects and visualizer frequency bars reactive to user interactions.

### 💨 Dynamic Manga Speed Lines & Custom Cursor
- **Adaptive Canvas Engine**: Screen-space canvas overlay rendering procedural kinetic speed lines triggered on acceleration and high-velocity scrolling.
- **Tactical Crosshair HUD**: Custom dual-ring mouse cursor featuring magnetic hover locks on buttons and interactive nodes.

---

## 🏗️ System Architecture

```
Portfolio/
├── Docs/                              # Comprehensive specs & engineering logs
│   ├── ARCHITECTURE.md                # Component & state hierarchy breakdown
│   ├── LEARNING_NOTES.md              # 3D optimization & shader findings
│   └── PRD.md                         # Product requirements & feature roadmap
│
└── portfolio-3d/                      # Core Web Application
    ├── public/
    │   ├── media/                     # Optimized WebP & compressed avatar assets
    │   ├── projects/                  # Live application screenshots
    │   └── resume.pdf                 # Direct downloadable resume
    │
    └── src/
        ├── components/
        │   ├── three/                 # 3D Canvas, Rigging, Ocean, Holograms
        │   │   ├── Ocean.jsx          # GLSL Ocean mesh & material bindings
        │   │   ├── WantedPoster.jsx   # 3D tilt-interactive project cards
        │   │   ├── PlaceholderScene.js# Coordinate culling scene coordinator
        │   │   └── Effects.jsx        # Post-processing & bloom adjustments
        │   │
        │   └── ui/                    # 2D HUD Overlays & Sections
        │       ├── Sections.jsx       # Narrative scroll (Hero, Hunter Profile, Contact)
        │       ├── ProjectModal.jsx   # Lazy-loaded deep-dive modal
        │       ├── MonarchFinale.jsx  # Shadow Monarch throne climax footer
        │       └── Navbar.jsx         # Audio toggle & sound reactive bars
        │
        ├── shaders/                   # GLSL vertex & fragment source files
        ├── data/                      # Structured project & experience data
        ├── hooks/                     # useSmoothScroll, useIsMobile, useReducedMotion
        └── styles/ui.css              # Cyberpunk design system & responsiveness
```

---

## 🚀 Performance & Optimizations

| Optimization Strategy | Implementation Details | Impact |
| :--- | :--- | :--- |
| **Asset Diet & Compression** | Replaced 28.2 MB raw video with an optimized 1 MB WebP/PNG portrait. | **96% bandwidth reduction** on first contentful paint. |
| **Code Splitting (Lazy Loading)** | High-overhead modules like `ProjectModal` are dynamically imported via `React.lazy()`. | Initial bundle reduced by **~40%**. |
| **Vite Manual Chunks** | Configured `vite.config.js` to isolate `vendor-fiber` and `vendor-animation` (GSAP/Lenis) into separate cached chunks. | Instant browser cache hits on subsequent revisits. |
| **Accessibility & Motion Guards** | Respects `prefers-reduced-motion` media queries by automatically freezing camera parallax and disabling canvas speed lines. | Full a11y compliance & comfortable navigation. |
| **Mobile DPR Clamping** | Canvas dynamically clamps `dpr={[1, 1.5]}` preventing mobile GPU thermal throttling on 3x retina displays. | Smooth thermal & battery performance on mobile. |

---

## 🛠️ Featured Projects Showcased Inside

* **[Orbit – Cloud File Storage](https://orbit-web-ivory.vercel.app)**: Full-stack monorepo with direct-to-S3 uploads, BullMQ background thumbnail workers, Redis queues, and quota telemetry.
* **[AI Phishing Detection Platform](https://ai-phishing-detection-platform-rouge.vercel.app)**: ML-powered cybersecurity application featuring real-time URL threat scanning and heuristic report generation.
* **[Insurance Management Platform](https://insurance-management-platform-nu.vercel.app)**: Enterprise client portal streamlining policy catalogues, claims submission lifecycle, and customer authentication.

---

## 💻 Local Development & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Necro000/Portfolio.git

# 2. Navigate to the project directory
cd Portfolio/portfolio-3d

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📜 License & Acknowledgements

- **Developer**: [Sohit Kumar (Necro000)](https://github.com/Necro000)
- **Built With**: [React](https://react.dev/), [Three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/), [GSAP](https://gsap.com/), [Lenis](https://lenis.darkroom.engineering/), and [Vite](https://vitejs.dev/).
- **License**: Released under the [MIT License](LICENSE).
