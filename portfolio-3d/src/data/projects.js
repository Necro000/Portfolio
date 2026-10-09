// Authentic engineering project case studies by Sohit Kumar (Necro).
// Verified technical architecture, live Vercel deployments, and deep technical specs.

export const projects = [
  {
    id: 'ai-phishing-detection',
    title: 'AI Phishing Detection Platform',
    category: 'CYBERSECURITY & AI INTELLIGENCE',
    bounty: '₿ 3,500,000,000',
    status: 'Live Web Application',
    tagline: 'Automated threat assessment platform scanning URLs to calculate security risk scores in real time.',
    description:
      'Engineered during Web Developer Internship at Innovexis Pvt. Ltd. A real-time threat evaluation platform that inspects domain structures, SSL flags, and anomaly vectors to protect users from credential harvesting and domain spoofing.',
    problem:
      'Traditional blacklist-based security tools frequently fail against zero-day phishing campaigns and freshly registered spoofed domains that evade static signatures.',
    solution:
      'Engineered an interactive URL threat assessment engine that analyzes domain characteristics, suspicious patterns, and structural anomalies to generate immediate, multi-factor risk telemetry.',
    contribution:
      'Built the full-stack user scanner interface, implemented real-time input sanitization & validation, integrated API threat assessment endpoints, and designed the analyst dashboard with risk-scoring breakdowns.',
    challenges:
      'Synchronizing multi-engine heuristic checks with low latency to ensure seamless user response times, while handling diverse URL encodings and edge-case redirects.',
    outcomes:
      'Successfully deployed to Vercel with dedicated authentication gateway, responsive audit workspace, and instant threat telemetry feedback.',
    highlights: [
      'Engineered during Web Developer Internship at Innovexis Pvt. Ltd.',
      'Real-time URL scanner analyzing domain anatomy and threat vectors',
      'Multi-engine risk calculation interface with detailed forensic reports',
      'Secure authentication gateway and authenticated analyst workspace',
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
        caption: 'Secure gateway sign-in interface guarding the threat console session',
        isLive: true,
      },
      {
        label: 'USER WORKSPACE',
        title: 'Logged-in Scanner Workspace',
        url: 'https://ai-phishing-detection-platform-rouge.vercel.app/scan/url',
        image: '/projects/ai-phishing-dashboard.png',
        caption: 'Active analyst workspace with domain input and real-time vulnerability scan controls',
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
    bounty: '₿ 2,800,000,000',
    status: 'Live Web Application',
    tagline: 'Enterprise client portal for policy lifecycle administration and interactive claims processing.',
    description:
      'Comprehensive web application designed to streamline customer policy tracking, claims administration, and account verification through intuitive client portals and structured data displays.',
    problem:
      'Insurance clients and staff struggle with convoluted legacy portals, scattered policy documents, and slow opaque tracking of active insurance claims.',
    solution:
      'Created a unified, modern web portal offering self-service claim submission, centralized policy catalogues, and instant status updates in a responsive interface.',
    contribution:
      'Architected front-end dashboard workflows, implemented client authentication flows, built searchable policy catalog views, and designed the claims filing lifecycle system.',
    challenges:
      'Handling multi-stage form state for claim documents while maintaining high readability and fast navigation across complex policy tiers.',
    outcomes:
      'Deployed live to Vercel with complete user authentication, dashboard analytics, and clean policy management interfaces.',
    highlights: [
      'End-to-end customer portal with authentication and account overview',
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
        caption: 'Secure client portal sign-in interface with dark-mode styling',
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
    category: 'ENTERPRISE CLOUD ARCHITECTURE',
    bounty: '₿ 4,800,000,000',
    status: 'Live Web Application',
    tagline: 'Full-stack monorepo cloud file storage platform with direct-to-S3 uploads, ACL permissions, and worker queues.',
    description:
      'High-performance cloud storage solution featuring nested folder structures, direct-to-S3 uploads, soft-delete trash with 30-day auto-purge, atomic file version rollback, and background thumbnail workers powered by Redis & BullMQ.',
    problem:
      'Large file uploads overload application servers, basic storage tools lack fine-grained link permissions with expiration, and managing version history with atomic rollback is complex.',
    solution:
      'Architected a modular monorepo utilizing pre-signed direct-to-S3 uploads to bypass server memory limits, BullMQ asynchronous workers for background thumbnail generation, and cryptographic public links with ACL rules.',
    contribution:
      'Built the responsive Next.js 16 & React 19 client workspace (grid/list view, breadcrumbs, search, multi-file dropzone), integrated Express REST APIs, configured PostgreSQL schemas with Prisma ORM, and set up Redis worker queues.',
    challenges:
      'Implementing atomic version rollback without desynchronizing S3 object state, and orchestrating asynchronous thumbnail generation workers without blocking main event loops.',
    outcomes:
      'Deployed live on Vercel with authenticated multi-folder file management, instant search filtering, and secure password-protected link sharing.',
    highlights: [
      'Monorepo architecture with Next.js 16, React 19, Express & Tailwind CSS',
      'Direct-to-S3 pre-signed upload pipeline and BullMQ background workers',
      'Granular ACL permissions, password-protected links & auto-expiration',
      'Nested folder hierarchy, soft-delete trash with auto-purge & instant search',
    ],
    role: 'Full-Stack Architect & Developer',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'BullMQ', 'AWS S3', 'Tailwind CSS'],
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
        caption: 'Responsive client authentication gateway with email validation and encrypted session cookies',
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
