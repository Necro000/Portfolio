// Real projects created by Necro (Sohit Kumar) showcased as 3D Wanted Posters and Spotlight Deck.
// 100% authentic project data, live Vercel deployments, and captured UI screenshots across the entire user journey.

export const projects = [
  {
    id: 'ai-phishing-detection',
    title: 'AI Phishing Detection Platform',
    category: 'CYBERSECURITY & AI INTELLIGENCE',
    bounty: '₿ 3,500,000,000',
    description:
      'Multi-engine AI cybersecurity intelligence platform featuring real-time phishing threat detection, Zero-Trust encrypted gateway, threat console authentication, and enterprise domain analysis.',
    highlights: [
      'Multi-engine AI algorithm detecting real-time phishing anomalies',
      'Zero-Trust encrypted threat console gateway with TLS 1.3 verification',
      'Live risk scoring telemetry and domain spoofing analysis pipeline',
    ],
    role: 'Cybersecurity & AI Developer',
    tech: ['TypeScript', 'React', 'AI Engine', 'Next.js', 'Zero-Trust'],
    thumbnail: '/projects/ai-phishing-dashboard.png',
    screenshots: [
      '/projects/ai-phishing.png',
      '/projects/ai-phishing-dashboard.png',
      '/projects/ai-phishing-scanner.png',
    ],
    slides: [
      {
        label: 'GATEWAY AUTH',
        title: 'Threat Console Gateway',
        url: 'https://ai-phishing-detection-platform-rouge.vercel.app/login',
        image: '/projects/ai-phishing.png',
        caption: 'Zero-Trust gateway authentication with encrypted session access',
      },
      {
        label: 'USER WORKSPACE',
        title: 'Logged-in Scanner Workspace',
        url: 'https://ai-phishing-detection-platform-rouge.vercel.app/scan/url',
        image: '/projects/ai-phishing-dashboard.png',
        caption: 'Active analyst workspace with real-time target domain input & test vectors',
      },
      {
        label: 'FORENSIC AUDIT',
        title: 'Quad-Engine Risk Inspector',
        url: 'https://ai-phishing-detection-platform-rouge.vercel.app',
        image: '/projects/ai-phishing-scanner.png',
        caption: 'Live HIGH_RISK 92/100 score combining Rules, Safe Browsing, VirusTotal & ML',
      },
    ],
    links: {
      live: 'https://ai-phishing-detection-platform-rouge.vercel.app',
      github: 'https://github.com/Necro000/AI-Phishing-Detection-Platform',
    },
    featured: true,
  },
  {
    id: 'insurance-management-platform',
    title: 'Insurance Management Platform',
    category: 'ENTERPRISE FULL-STACK SAAS',
    bounty: '₿ 2,800,000,000',
    description:
      'Enterprise workflow application for policy lifecycle management, claims processing, and user access control with clean authenticated portals and responsive UI.',
    highlights: [
      'End-to-end policy lifecycle management and customer record administration',
      'Claims processing pipeline with role-based access control (RBAC)',
      'Secure authenticated portal architecture deployed on Vercel',
    ],
    role: 'Full-Stack Developer',
    tech: ['JavaScript', 'React', 'Node.js', 'REST API', 'Auth'],
    thumbnail: '/projects/insurance-dashboard.png',
    screenshots: [
      '/projects/insurance.png',
      '/projects/insurance-dashboard.png',
      '/projects/insurance-policies.png',
    ],
    slides: [
      {
        label: 'PORTAL LOGIN',
        title: 'Customer Authentication',
        url: 'https://insurance-management-platform-nu.vercel.app/login',
        image: '/projects/insurance.png',
        caption: 'Secure client portal sign-in with clean dark-mode authentication',
      },
      {
        label: 'USER DASHBOARD',
        title: 'Logged-in Customer Dashboard',
        url: 'https://insurance-management-platform-nu.vercel.app/dashboard',
        image: '/projects/insurance-dashboard.png',
        caption: 'Active client session showing claims workflow, policies & document upload',
      },
      {
        label: 'POLICY VIEWER',
        title: 'Policy Management Directory',
        url: 'https://insurance-management-platform-nu.vercel.app/policies',
        image: '/projects/insurance-policies.png',
        caption: 'Filterable policy catalog with real-time status search and management tools',
      },
    ],
    links: {
      live: 'https://insurance-management-platform-nu.vercel.app',
      github: 'https://github.com/Necro000/Insurance-Management-Platform',
    },
    featured: true,
  },
  {
    id: 'arise-3d-portfolio',
    title: 'ARISE 3D Developer Portfolio',
    category: 'CREATIVE 3D WEBGL DEVELOPMENT',
    bounty: '₿ 5,000,000,000',
    description:
      'High-performance 3D interactive web portfolio blending Solo Leveling and One Piece aesthetics with custom GLSL ocean shaders, React Three Fiber raycasting, and GSAP camera choreography.',
    highlights: [
      'Custom GLSL ocean wave simulation executing in real-time fragment shaders',
      'React Three Fiber WebGL canvas with post-processing bloom and vignette',
      'GSAP smooth camera choreography and responsive touch/DPR performance capping',
    ],
    role: 'Creative 3D Full-Stack Developer',
    tech: ['React', 'Three.js', 'R3F', 'GLSL Shaders', 'GSAP', 'Lenis'],
    thumbnail: '/projects/portfolio-3d.png',
    screenshots: [
      '/projects/portfolio-3d.png',
      '/og-image.jpg',
    ],
    slides: [
      {
        label: '3D SCENE',
        title: 'Ocean Horizon & Lantern',
        url: 'http://localhost:5173/#hero',
        image: '/projects/portfolio-3d.png',
        caption: 'Procedural GLSL Gerstner waves and mouse parallax lighting',
      },
      {
        label: 'SPOTLIGHT DECK',
        title: 'Cyberpunk Engineering Dossier',
        url: 'http://localhost:5173/#projects',
        image: '/og-image.jpg',
        caption: 'Interactive project spotlight deck with live user journey slides',
      },
    ],
    links: {
      live: 'https://github.com/Necro000/Portfolio',
      github: 'https://github.com/Necro000/Portfolio',
    },
    featured: true,
  },
]
