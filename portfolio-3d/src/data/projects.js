// Verified engineering project case studies by Sohit Kumar.
// Technical architecture, live deployments, and realistic implementation details.

export const projects = [
  {
    id: 'ai-phishing-detection',
    title: 'AI Phishing Detection Platform',
    category: 'CYBERSECURITY & THREAT AUDIT',
    badge: 'FEATURED • CYBERSECURITY',
    status: 'Live Web Application',
    tagline: 'Real-time URL threat assessment engine analyzing domain anatomy, SSL flags, and risk scoring.',
    description:
      'Engineered during Web Developer Internship at Innovexis Pvt. Ltd. An interactive security tool that inspects domain structures, heuristic indicators, and structural anomalies to help users detect phishing attempts and spoofed domains.',
    problem:
      'Static blacklist-based tools frequently lag behind zero-day phishing campaigns and freshly registered deceptive domains that mimic legitimate brands.',
    solution:
      'Engineered a multi-factor URL analysis interface that evaluates domain characteristics, redirect chains, and risk indicators to generate instant telemetry and confidence scores.',
    contribution:
      'Built the full-stack user scanner interface, implemented client-side input validation, connected backend threat assessment endpoints, and designed the analyst dashboard with risk-scoring breakdowns.',
    challenges:
      'Handling diverse URL encodings, internationalized domain names, and parsing edge-case redirects while keeping scan evaluation times low.',
    outcomes:
      'Deployed live on Vercel with dedicated authentication gateway, responsive audit workspace, and instant threat telemetry feedback.',
    highlights: [
      'Engineered during Web Developer Internship at Innovexis Pvt. Ltd.',
      'Real-time URL scanner analyzing domain anatomy and threat vectors',
      'Multi-engine risk calculation interface with detailed inspection reports',
      'Dedicated authentication gateway and authenticated analyst workspace',
    ],
    role: 'Web Developer Intern (Innovexis)',
    tech: ['Next.js 15', 'React', 'TypeScript', 'Python', 'Supabase', 'REST APIs'],
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
        caption: 'Authentication gateway guarding the analyst scanning console',
        isLive: true,
      },
      {
        label: 'USER WORKSPACE',
        title: 'Interactive Scanner Workspace',
        url: 'https://ai-phishing-detection-platform-rouge.vercel.app/scan/url',
        image: '/projects/ai-phishing-dashboard.png',
        caption: 'Active scanner workspace with domain input and real-time vulnerability scan controls',
        isLive: true,
      },
      {
        label: 'FORENSIC AUDIT',
        title: 'Risk Scoring Inspector',
        url: 'https://ai-phishing-detection-platform-rouge.vercel.app',
        image: '/projects/ai-phishing-scanner.png',
        caption: 'Detailed threat assessment report aggregating risk scores and domain indicators',
        isLive: true,
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
    category: 'ENTERPRISE SAAS WORKFLOW',
    badge: 'ENTERPRISE SAAS',
    status: 'Live Web Application',
    tagline: 'Client portal for policy lifecycle administration and interactive claims processing.',
    description:
      'Web application designed to streamline customer policy tracking, claims administration, and account management through intuitive client portals and structured data displays.',
    problem:
      'Policyholders and service agents struggle with convoluted paper-heavy portals, scattered documentation, and opaque tracking of active claim statuses.',
    solution:
      'Created a modern client dashboard offering self-service claim submission, centralized policy directories, and instant status updates in a responsive interface.',
    contribution:
      'Built front-end dashboard workflows, implemented client authentication flows, built searchable policy catalog views, and designed the claims filing lifecycle system.',
    challenges:
      'Managing multi-stage form state for claim documents while maintaining high readability and fast navigation across policy tiers.',
    outcomes:
      'Deployed live on Vercel with customer authentication, dashboard overview, and clean policy management interfaces.',
    highlights: [
      'Customer portal with authentication and account overview',
      'Interactive policy catalog with real-time status filtering and search',
      'Structured claims workflow with status tracking and timeline views',
      'Responsive enterprise UI styled for desktop and mobile efficiency',
    ],
    role: 'Full-Stack Developer',
    tech: ['React', 'JavaScript', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs'],
    thumbnail: '/projects/insurance-dashboard.png',
    screenshots: [
      '/projects/insurance.png',
      '/projects/insurance-dashboard.png',
      '/projects/insurance-policies.png',
    ],
    slides: [
      {
        label: 'PORTAL LOGIN',
        title: 'Client Authentication',
        url: 'https://insurance-management-platform-nu.vercel.app/login',
        image: '/projects/insurance.png',
        caption: 'Client portal sign-in interface with dark-mode styling',
        isLive: true,
      },
      {
        label: 'USER DASHBOARD',
        title: 'Customer Dashboard',
        url: 'https://insurance-management-platform-nu.vercel.app/dashboard',
        image: '/projects/insurance-dashboard.png',
        caption: 'Active client session showing claims workflow, policies, and account metrics',
        isLive: true,
      },
      {
        label: 'POLICY VIEWER',
        title: 'Policy Management Directory',
        url: 'https://insurance-management-platform-nu.vercel.app/policies',
        image: '/projects/insurance-policies.png',
        caption: 'Filterable policy catalog with real-time status search and details view',
        isLive: true,
      },
    ],
    links: {
      live: 'https://insurance-management-platform-nu.vercel.app',
      github: 'https://github.com/Necro000/Insurance-Management-Platform',
    },
    featured: true,
  },
  {
    id: 'orbit-cloud-storage',
    title: 'Orbit – Cloud File Storage',
    category: 'FULL-STACK CLOUD PLATFORM',
    badge: 'FEATURED • CLOUD STORAGE',
    status: 'Live Web Application',
    tagline: 'Modern cloud file manager featuring nested folder hierarchies, search filters, and storage telemetry.',
    description:
      'Full-stack cloud file storage platform featuring multi-folder hierarchies, file uploads, real-time storage quota tracking, soft-deletion trash with 30-day auto-purge policy, and share link management.',
    problem:
      'Users require a clean, responsive storage hub to organize assets across nested folders without complex overhead or cluttered interfaces.',
    solution:
      'Built a full-stack Next.js and Express platform featuring intuitive folder hierarchies, quick-filter search, trash retention lifecycle, and responsive storage monitoring.',
    contribution:
      'Developed the Next.js 16 & React 19 client workspace (grid/list view, breadcrumbs, search, folder management), integrated backend REST APIs, and structured storage tracking.',
    challenges:
      'Orchestrating synchronized client-side state between nested folders, breadcrumb navigation, and real-time storage quota meters.',
    outcomes:
      'Deployed live on Vercel with authenticated multi-folder file management, instant search filtering, and clean responsive UI.',
    highlights: [
      'Modern web application built with Next.js 16, React 19, and Tailwind CSS',
      'Hierarchical folder management with breadcrumb navigation',
      'Real-time storage quota meter and file type category filters',
      'Soft-delete trash section with 30-day retention auto-purge notice',
    ],
    role: 'Full-Stack Developer',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    thumbnail: '/projects/orbit-dashboard.png',
    screenshots: [
      '/projects/orbit-auth.png',
      '/projects/orbit-dashboard.png',
      '/projects/orbit-sharing.png',
    ],
    slides: [
      {
        label: 'GATEWAY AUTH',
        title: 'Secure User Authentication',
        url: 'https://orbit-web-ivory.vercel.app/login',
        image: '/projects/orbit-auth.png',
        caption: 'Responsive client authentication gateway with email validation and session management',
        isLive: true,
      },
      {
        label: 'DRIVE WORKSPACE',
        title: 'Cloud File Explorer Workspace',
        url: 'https://orbit-web-ivory.vercel.app/drive',
        image: '/projects/orbit-dashboard.png',
        caption: 'Interactive file explorer with folder tree, search filters, and real-time storage quota telemetry',
        isLive: true,
      },
      {
        label: 'RETENTION & TRASH',
        title: 'Storage & 30-Day Purge Lifecycle',
        url: 'https://orbit-web-ivory.vercel.app/trash',
        image: '/projects/orbit-sharing.png',
        caption: 'Soft-delete file recovery pipeline with automated 30-day purge lifecycle and real-time quota synchronization',
        isLive: true,
      },
    ],
    links: {
      live: 'https://orbit-web-ivory.vercel.app',
      github: 'https://github.com/Necro000/Orbit',
    },
    featured: true,
  },
]
