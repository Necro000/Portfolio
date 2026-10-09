# LEARNING NOTES

> One entry per work session, in your own words. This becomes your interview script.
> The Phase 0 answers below are a starter draft. Rewrite them in your own words so they're really yours.

## Phase 0 — Setup
- **What Vite does:** It's the build tool and dev server. It runs my project locally with instant reloads, and later bundles everything into small files for deployment.
- **What package.json is:** The project's ID card. It lists the name, scripts (`npm run dev`), and the libraries I installed (three, R3F, drei, gsap, lenis) with versions.
- **What a component is:** A reusable piece of UI written as a JavaScript function that returns what to show. I can use it many times and pass it different props.
- **Node vs npm:** Node.js runs JavaScript outside the browser. npm is the package manager that installs libraries for it.
- **Why Git:** It saves the history of my code so I can undo mistakes, and GitHub stores it online as proof of my work.
- **Something that confused me:** <write your own here>

## Phase 1 — 3D Basics
- **Scene / camera / renderer:** `<Canvas>` sets all three up automatically. The **Scene** is the 3D container holding all objects; the **Camera** is your point of view (default looks from z=5 towards 0,0,0); the **Renderer** draws what the camera sees onto the HTML `<canvas>` element.
- **Mesh = geometry + material:** A 3D object on screen. **Geometry** is the physical 3D shape (vertices/skeleton like `boxGeometry`). **Material** is the appearance (skin/paint like `meshStandardMaterial`). Standard materials need light to be visible.
- **What `useFrame` does:** Runs on every single frame refresh (e.g. 60 or 144 times/sec). Multiplying speed by `delta` (time since last frame in seconds) ensures movement stays the same speed across all monitor refresh rates. Must be called inside a child of `<Canvas>`.
- **x, y, z axes:** In Three.js: **X** is horizontal (left - / right +), **Y** is vertical (down - / up +), and **Z** is depth (towards you + / into the screen -).
- **Something that confused me:** Running `npm run dev` in the parent folder instead of inside `portfolio-3d/` where `package.json` lives!

## Phase 2 — Layout & Scroll
- **How scroll becomes a 0-1 number:** We divide `window.scrollY` (how many pixels scrolled) by the maximum scroll distance (`scrollHeight - innerHeight`). We clamp it between 0 (top of page) and 1 (bottom of page).
- **How the camera follows it:** In `CameraRig.jsx`, `useFrame` runs every frame and uses `MathUtils.lerp(startZ, endZ, progress)` to calculate the camera's Z position. As we scroll from 0 to 1, the camera glides smoothly forward down the Z-axis through the scenes!
- **Something that confused me:** Remembering that `lookAt(0, 0, camera.position.z - 5)` must look ahead along the camera's current Z coordinate, rather than always looking backwards at `(0, 0, 0)`.

## Phase 3 — Content & UI
- **Separation of data & UI:** By isolating projects, skills, and socials into pure JS data files (`src/data/`), we can update stats and projects without ever modifying or risking breaking React/Three.js rendering code.
- **Component composition with SystemWindow:** We built a reusable `SystemWindow` HUD panel component with `{children}` slots, allowing us to rapidly construct Hunter Status, Skills stat bars, and Contact interfaces with consistent styling.
- **Synchronized HTML & 3D scrolling:** The 3D `<Canvas>` is pinned (`fixed`), while each section is sized to `100vh`. As the page scrolls, the 3D camera glides forward to the corresponding 3D scene in sync with the section's HTML card!
- **Something that confused me:** Ensuring `.section` has `pointer-events: none` so scrolling and 3D parallax work everywhere, while buttons and panels use `pointer-events: auto` to remain fully clickable.

## Phase 4 — Projects Showcase
- **3D Pointer Events & Raycasting:** React Three Fiber projects an invisible ray from the camera through the mouse coordinates into the 3D scene. This allows `<mesh>` components to listen to `onPointerOver`, `onPointerOut`, and `onPointerMove`.
- **UV Coordinates for Hover Tilt:** In `onPointerMove`, `e.uv` gives the normalized coordinate (0 to 1) across the plane's surface. By subtracting 0.5, we get the offset from the center, which we use to dynamically calculate realistic 3D tilt angles (`rotation.x` and `rotation.y`).
- **3D Click to 2D Modal Flow:** The 3D `<Canvas>` and HTML UI share the same React root in `App.jsx`. When an `onClick` occurs on a 3D `<mesh>`, we call `setSelectedProject(project)`. React then conditionally renders the HTML `<ProjectModal />` dialog, bridging the 3D WebGL world directly with accessible HTML overlays.
- **Modal Accessibility & Event Propagation:** The modal stops click propagation on its dialog body (`e.stopPropagation()`) while letting backdrop clicks call `onClose()`, and listens to the `Escape` keyboard key for keyboard navigation.
- **WebP Image Compression & Lazy Loading:** WebP reduces image file sizes by ~80% compared to standard PNGs without losing fidelity. Serving `.webp` images with `loading="lazy"` prevents network bottlenecks and ensures the portfolio loads in under 2 seconds.

## Phase 5 — Anime Magic
- **Post-Processing & EffectComposer:** Post-processing runs GPU shader passes on the rendered image before displaying it. We use `<EffectComposer>` to manage this pipeline without hurting standard rendering.
- **Bloom & Emissive Radiance:** Bloom creates the signature Solo Leveling electric aura. It samples pixels brighter than `luminanceThreshold` and blurs them outwards. By setting `emissive` and `emissiveIntensity` on 3D materials, objects radiate their own light halos in dark space.
- **Cinematic Vignette:** A shader effect that softly darkens screen borders to guide the viewer's focus to the center.
- **Particle Systems with Three.js Points:** Instead of rendering hundreds of separate meshes, Three.js `<points>` with a `bufferGeometry` and Float32Array renders 500+ particles in a single GPU draw call. Combining `AdditiveBlending`, `depthWrite={false}`, and Bloom creates a glowing, floating mana ember effect with zero frame drops.
- **Custom GLSL Shaders (Vertex & Fragment):** A shader runs directly on thousands of GPU cores. The **Vertex Shader** uses sine wave equations to displace vertices into rolling ocean waves. The **Fragment Shader** uses `mix()` to color the water, blending from dark deep abyss teal into glowing cyan foam on wave peaks. `uniform` passes time and colors from React, while `varying` passes calculated wave elevations between the two shaders.
- **GSAP Timelines & Staggering:** `gsap.timeline()` allows sequence orchestration without messy timeouts. We split text into spans and apply `stagger: 0.12` with `expo.out` easing to create a cinematic letter-by-letter impact. For the Level Up animation, we coordinate a full-screen flash with concurrent width calculations on stat bars.
- **CSS Clip-Path Glitch & Canvas Speed Lines:** Using CSS `clip-path: polygon()` with pseudo-elements creates chromatic aberration glitch effects on hover without laggy JavaScript. For manga speed lines, a 2D `<canvas>` overlay tracks scroll velocity and draws radial burst strokes during rapid transitions, smoothly decaying to zero when stopping.

## Phase 6 — Polish & Performance
- **Mobile Responsive Layout & Viewports:** Mobile screens have portrait aspect ratios and limited touch real estate. By defining responsive breakpoints in `useIsMobile.js` and responsive CSS rules, we reorganize horizontal elements into stacked cards, adjust padding, and scale 3D objects to prevent clipping.
- **Capping Device Pixel Ratio (DPR):** High-end phones have DPRs of 3x or 4x. Rendering WebGL at 3x means the GPU calculates 9x to 16x more fragments than 1080p, causing thermal throttling and battery drain. Setting `<Canvas dpr={[1, 1.5]}>` caps the pixel density to 1.5x on mobile screens, preserving crystal sharpness while maintaining 60 FPS smoothly.
- **Adaptive 3D Asset Density:** On mobile devices, we dynamically scale down particle counts (e.g., from 500 down to 150) and adjust 3D object spacing (e.g., single-column Wanted Posters instead of a wide row) so mobile GPUs stay cool and items remain easily tappable.
- **Reduced-Motion Support (`prefers-reduced-motion`):** Users with vestibular disorders, inner-ear balance sensitivities, or migraines can configure their operating system to minimize motion. By detecting this with `useReducedMotion.js` (`window.matchMedia('(prefers-reduced-motion: reduce)')`) and CSS `@media (prefers-reduced-motion: reduce)`, we satisfy WCAG 2.1 Criterion 2.3.3.
- **Graceful Motion Dampening (Not Destruction):** Instead of a blanket `0.01ms` wipeout which can make animations jarring, we selectively disable rapid radial speed lines (`SpeedLines.jsx`), steady the 3D camera from mouse parallax wobble (`MouseParallax`), bypass bright screen flashes (`triggerLevelUpAnimation`), and replace aggressive hover zooms with calm color fades.
- **3D Asset Optimization with gltf-transform & Draco:** Unoptimized 3D models often embed multi-megabyte PNG textures and duplicate vertices. Inspecting `lantern.glb` revealed 9.3 MB was uncompressed PNG textures! By utilizing `@gltf-transform/cli optimize` with `--compress draco` and `--texture-compress webp`, we deduplicated geometry, quantized coordinates with Draco, and transcoded textures into WebP, shrinking file size from **9.56 MB down to 959 KB (a 90% reduction!)**.
- **Draco Decoding in R3F:** React Three Fiber's `@react-three/drei` library handles Google Draco decompression out of the box via WebAssembly workers inside `useGLTF`, enabling fast downloads without blocking the browser main thread.
- **Lighthouse Performance & Core Web Vitals Auditing:** Lighthouse evaluates Performance, Accessibility, Best Practices, and SEO. Key fixes we implemented include:
  1. **Accessible Heading Hierarchy:** Converted non-semantic `<span>` and `<div>` headers in `SystemWindow` and sections into semantic `<h2>` tags, preserving exact visual HUD styles while establishing a proper document outline for screen readers.
  2. **Link Security & Performance:** Upgraded external anchor links with `rel="noopener noreferrer"` to prevent tab-nabbing vulnerabilities and performance penalties on target windows.
  3. **ARIA Modal Landmarks:** Added `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="project-modal-title"` to `ProjectModal.jsx` for full WCAG accessibility.
  4. **CSS Boilerplate Purge:** Replaced Vite starter CSS with a clean dark theme reset, preventing layout shifts and eliminating unstyled canvas containers.
- **Open Graph (OG) & Social Card Architecture:** When sharing URLs on LinkedIn, Twitter/X, Discord, or Slack, crawlers parse Open Graph meta tags (`og:title`, `og:image`, `og:description`). By crafting a high-resolution 1200x630 preview card (`og-image.jpg`) showcasing the 3D aesthetic and pairing it with Twitter Card metadata (`summary_large_image`), link previews render rich cards rather than raw plain text links.
- **SVG Favicons with Dual-Mode Glow:** SVG favicons scale to any resolution (16px to 512px) with crisp geometry. By defining dark obsidian base plates with cyan electric borders and SVG drop-shadow filters, our custom Hunter Dagger emblem remains high-contrast across dark and light browser chrome.
- **Local Network Mobile Testing (`server.host: true`):** While Chrome DevTools device mode simulates viewport dimensions and touch pointers, physical mobile devices have different GPU chipsets, high-DPR screens, and touch momentum physics. Configuring Vite's `server.host: true` exposes the development server across the local Wi-Fi network (e.g. `http://192.168.1.13:5173`), enabling immediate live-testing on real iPhones and Android devices to verify 60 FPS performance, touch gestures, and portrait layouts in a real-world environment.

## Interview questions to practice
1. Why did you choose React Three Fiber instead of plain Three.js?
2. What happens on every frame of your 3D scene?
3. How does scrolling move the camera?
4. How did you keep performance good on mobile?
5. What was the hardest bug and how did you fix it?