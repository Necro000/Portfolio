# DESIGN — Look & Feel

> Reference: PRD §8. These choices get copied into CSS variables in `src/styles/global.css`.

## Concept
Dark, cinematic, game-HUD feel. Two moods that alternate by section:
- **System mood (Solo Leveling):** void black, violet aura, electric-blue panels, glitch text.
- **Adventure mood (One Piece):** ocean teal, parchment paper, ink text, hand-made poster feel.

## Colors
| Token | Hex | Used for |
|---|---|---|
| `--bg-void` | `#07060d` | Main page + canvas background |
| `--bg-panel` | `#0e0c1a` | System window background (with ~85% opacity) |
| `--shadow-violet` | `#6d28d9` | Aura, particles, glow |
| `--shadow-violet-soft` | `#a78bfa` | Soft highlights, hover |
| `--system-blue` | `#3ab7ff` | System window borders, stat bars, links |
| `--ocean-teal` | `#0e7c86` | Water, adventure accents |
| `--parchment` | `#e8d9b5` | Wanted poster paper |
| `--ink` | `#1b1410` | Text on posters |
| `--alert-red` | `#e5383b` | Danger, hover, "ARISE" flash |
| `--text` | `#e9e7f5` | Main body text |
| `--text-dim` | `#9b97b3` | Secondary text |

```css
:root {
  --bg-void: #07060d;
  --bg-panel: #0e0c1a;
  --shadow-violet: #6d28d9;
  --shadow-violet-soft: #a78bfa;
  --system-blue: #3ab7ff;
  --ocean-teal: #0e7c86;
  --parchment: #e8d9b5;
  --ink: #1b1410;
  --alert-red: #e5383b;
  --text: #e9e7f5;
  --text-dim: #9b97b3;
}
```

## Fonts (self-host in `public/fonts/`)
| Role | Font | Where |
|---|---|---|
| Headings / System UI | **Orbitron** (or Rajdhani) | Hero, system windows, nav |
| Poster / Adventure | **Pirata One** (or Rye) | Wanted posters, journey map |
| Body | **Inter** | Paragraphs, buttons, forms |

Scale: 12 / 14 / 16 / 20 / 28 / 40 / 64 px. Headings uppercase with wide letter-spacing (`0.08em`) in System mood.

## Spacing & layout
- Base unit: **8px** (use multiples: 8, 16, 24, 32, 48, 64, 96).
- Max content width: **1100px** for text overlays.
- Section overlay padding: 24px mobile, 64px desktop.
- Border radius: **2px** for system panels (sharp, HUD-like), **0** for posters.
- System window style: 1px `--system-blue` border, soft blue glow (`box-shadow: 0 0 16px rgba(58,183,255,.35)`), subtle scanline background.

## Components look
- **Buttons:** transparent, 1px blue border, uppercase, glow on hover, slight glitch animation on hover.
- **Wanted poster:** parchment texture, "WANTED" header, screenshot in the middle, project name below, a "bounty" tagline, torn/rough edges.
- **Compass nav:** small SVG compass bottom-left; needle rotates to the active section.
- **Cursor:** small dot + larger ring with violet glow trail (desktop only).

## Motion rules (PRD §4.3)
- Easing: `power3.out` or `expo.out`. No linear.
- Max section transition: **1.2s**.
- UI elements enter with fade + 20px slide, stagger 0.08s.
- Glitch effects last under 0.4s and never loop endlessly on text people need to read.
- Loader max visible time: 3s after assets are ready.
- `prefers-reduced-motion`: disable particles, camera shake, glitch and speed lines; keep simple fades.
- Never hide essential content (links, resume) behind an animation.

## Accessibility
- Text contrast at least 4.5:1 against its background.
- Visible focus outline on all interactive elements (blue, 2px).
- Alt text on every project screenshot.