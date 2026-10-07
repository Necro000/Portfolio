// Projects showcased as One Piece style "Wanted Posters" in 3D space.
// Each project has a bounty label, tech stack, screenshots, and live/repo links.

export const projects = [
  {
    id: 'project-one',
    title: '3D Anime Portfolio',
    // One Piece inspired bounty line
    bounty: '₿ 30,000,000',
    description:
      'Immersive 3D developer portfolio inspired by Solo Leveling and One Piece. Built with React Three Fiber, Lenis, and GSAP.',
    role: 'Creative Developer',
    tech: ['React', 'Three.js', 'R3F', 'GSAP', 'Lenis'],
    // Images live in public/projects/project-one/
    thumbnail: '/projects/project-one/cover.webp',
    screenshots: [
      '/projects/project-one/1.webp',
      '/projects/project-one/2.webp',
    ],
    links: {
      live: 'https://portfolio-3d.example.com',
      github: 'https://github.com/Necro000/Portfolio',
    },
    featured: true,
  },
  {
    id: 'project-two',
    title: 'Full-Stack Web App',
    bounty: '₿ 15,000,000',
    description:
      'A full-stack application featuring authentication, real-time database updates, and a responsive modern interface.',
    role: 'Full-Stack Developer',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    thumbnail: '/projects/project-two/cover.webp',
    screenshots: [
      '/projects/project-two/1.webp',
      '/projects/project-two/2.webp',
    ],
    links: {
      live: 'https://project-two.example.com',
      github: 'https://github.com/Necro000',
    },
    featured: true,
  },
  {
    id: 'project-three',
    title: 'Interactive Dashboard',
    bounty: '₿ 10,000,000',
    description:
      'Performance analytics dashboard with dark-mode HUD styling, animated charts, and real-time metric tracking.',
    role: 'Frontend Developer',
    tech: ['JavaScript', 'CSS Modules', 'Chart.js', 'REST API'],
    thumbnail: '/projects/project-three/cover.webp',
    screenshots: [
      '/projects/project-three/1.webp',
      '/projects/project-three/2.webp',
    ],
    links: {
      live: 'https://project-three.example.com',
      github: 'https://github.com/Necro000',
    },
    featured: true,
  },
]
