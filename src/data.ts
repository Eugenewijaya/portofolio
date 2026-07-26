// Data for Evid Wijaya portfolio - static content from LinkedIn/resume
export const PROFILE = {
  name: 'Evid Wijaya',
  title: 'Information Systems Student · Graphic Designer · Cloud Computing Enthusiast',
  bio: 'A final-year Information Systems student at the School of Technopreneur Nusantara, currently contributing as a Graphic Designer at Star Champs Indonesia. Combines academic knowledge with professional experience to create impactful designs for social media, e-commerce, and promotional materials. Recently enhanced cloud computing expertise through Bangkit Academy, gaining skills in Google Cloud Platform.',
  location: 'Kota Tangerang, Banten, Indonesia',
  email: 'evidwijaya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/evid-wijaya',
  github: 'https://github.com/Eugenewijaya',
  portfolio: 'https://sites.google.com/view/evidwijaya/',
  avatar: '/avatar.png',
  skills: ['HTML', 'Project Management', 'Programming', 'Graphic Design', 'Video Editing', 'Cloud Computing', 'Google Cloud Platform', 'Canva', 'CapCut', 'Meta Business Suite'],
}

export const CERTIFICATIONS = [
  { name: 'Implement Load Balancing on Compute Engine', issuer: 'Google Cloud', color: '#4285F4' },
  { name: 'Google Cloud Computing Foundations: Infrastructure in Google Cloud', issuer: 'Google Cloud', color: '#34A853' },
  { name: 'Develop your Google Cloud Network', issuer: 'Google Cloud', color: '#FBBC05' },
  { name: 'Build a Secure Google Cloud Network', issuer: 'Google Cloud', color: '#EA4335' },
  { name: 'Video Content Creator Batch 2 2022', issuer: 'KOMINFO & EFFION Creator School', color: '#6366f1' },
]

export const EXPERIENCE = [
  {
    role: 'Graphic Designer',
    company: 'Star Champs Indonesia',
    period: 'Jul 2025 – Present',
    location: 'Tangerang',
    type: 'Full-time',
    highlights: [
      '200+ digital & print designs for branding, marketing, and campaigns',
      '200% increase in social media growth within one year',
      'Managed digital campaigns via Meta Business Suite',
      'Led "The Journey of Hope" Seminar (100+ participants)',
      'Developed TheraCare – integrated therapy center information system',
    ],
    color: '#6366f1',
  },
  {
    role: 'Commissioner',
    company: 'Sagara Karya Kreanusati',
    period: 'Jan 2024 – Jul 2026',
    location: 'Indonesia',
    type: 'Agency',
    highlights: [
      'Multidisciplinary creative agency across advertising, events, and technology',
      'Empowering creativity across the Nusa Archipelago',
    ],
    color: '#8b5cf6',
  },
  {
    role: 'Cloud Computing Cohort',
    company: 'Bangkit Academy',
    period: 'Sep 2024 – Jan 2025',
    location: 'Jakarta Raya',
    type: 'Training',
    highlights: [
      'Google Cloud Platform (Compute Engine, Cloud Storage, App Engine)',
      'Cloud infrastructure, serverless computing, deployment pipelines',
      'Cross-disciplinary teamwork with ML & Mobile Dev cohorts',
    ],
    color: '#38bdf8',
  },
  {
    role: 'Graphic Designer & Video Editor',
    company: 'Freelance (Fastwork.co)',
    period: 'Sep 2023 – Jan 2025',
    location: 'Tangerang Selatan',
    type: 'Freelance',
    highlights: [
      'Brand Identity, Marketing Materials, Digital Content (Canva)',
      'Promotional & social media videos, corporate materials (CapCut)',
    ],
    color: '#f59e0b',
  },
  {
    role: 'Information System Coordinator',
    company: 'Himpunan Psikologi Indonesia (HIMPSI)',
    period: 'Aug 2024 – Dec 2024',
    location: 'Kota Tangerang',
    type: 'Volunteer',
    highlights: [
      'Built integrated registration platform on Google Sites',
      'Created e-voting system for governance decisions',
      'Managed event photography and documentation',
    ],
    color: '#10b981',
  },
]

export const EDUCATION = [
  {
    school: 'School of Technopreneur Nusantara',
    degree: 'S.Kom, Information System',
    period: '2022 – 2026',
  },
  {
    school: 'SMK Negeri 10 Kab. Tangerang',
    degree: 'Intermedia / Multimedia',
    period: 'Jun 2019 – Aug 2022',
  },
]

export const PROJECTS = [
  {
    id: 'p1',
    name: 'TheraCare Information System',
    description: 'An integrated therapy center information system designed to streamline patient registration, scheduling, and medical records management.',
    category: 'Web Development',
    tags: ['HTML', 'System Design', 'Project Management'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    color: '#10b981',
  },
  {
    id: 'p2',
    name: '"The Journey of Hope" Seminar',
    description: 'Lead organizer for a massive seminar with 100+ participants. Handled end-to-end event management, branding, and promotional materials.',
    category: 'Event Organizer',
    tags: ['Leadership', 'Event Planning', 'Public Speaking'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    color: '#8b5cf6',
  },
  {
    id: 'p3',
    name: 'Star Champs Digital Campaigns',
    description: 'Designed over 200+ digital and print materials for marketing campaigns. Increased social media engagement and follower growth by 200%.',
    category: 'Graphic Design',
    tags: ['Canva', 'Meta Business Suite', 'Social Media'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
    color: '#f59e0b',
  },
  {
    id: 'p4',
    name: 'GCP Scalable Web Architecture',
    description: 'Architected and deployed a highly available web application infrastructure using Google Cloud Platform load balancers and compute engines.',
    category: 'Cloud Computing',
    tags: ['GCP', 'Load Balancing', 'Infrastructure'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    color: '#38bdf8',
  },
  {
    id: 'p5',
    name: 'HIMPSI E-Voting System',
    description: 'Developed an integrated e-voting system and registration platform for organizational governance decisions and event management.',
    category: 'Web Development',
    tags: ['Google Sites', 'Data Management'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    color: '#ef4444',
  },
  {
    id: 'p6',
    name: 'Corporate Branding Videos',
    description: 'Freelance video editing projects for corporate clients and SME promotional campaigns, delivering high-retention video content.',
    category: 'Video Editing',
    tags: ['CapCut', 'Storytelling', 'Motion Graphics'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
    color: '#ec4899',
  },
]
