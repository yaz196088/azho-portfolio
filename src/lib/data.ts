export type Project = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  url?: string;
  /** Path relative to /public */
  image?: string;
  year: number;
  featured?: boolean;
};

export type Internship = {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  tags?: string[];
};

// ─── Projects ──────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "arcform",
    title: "Arcform Studio",
    description:
      "Brand identity and website for an architecture studio. Focused on negative space, brutalist grid systems, and long-scroll interaction.",
    tags: ["Next.js", "Framer Motion", "Figma", "Typography"],
    url: "https://arcform.studio",
    year: 2024,
    featured: true,
  },
  {
    id: "pulso",
    title: "Pulso — Health Dashboard",
    description:
      "Real-time health data visualisation dashboard. Built with live WebSocket feeds, D3 charts, and a dark-mode-first design system.",
    tags: ["React", "D3.js", "WebSockets", "Tailwind"],
    year: 2024,
    featured: true,
  },
  {
    id: "terroir",
    title: "Terroir Wine App",
    description:
      "iOS companion app for natural wine discovery. Designed in Figma; prototype covers the full onboarding, scanning, and cellar flows.",
    tags: ["Figma", "Prototyping", "iOS", "UX Research"],
    year: 2023,
  },
  {
    id: "lightfield",
    title: "Lightfield — 3D Web Experience",
    description:
      "Immersive WebGL scene built with Three.js and custom GLSL shaders to showcase parametric architectural models.",
    tags: ["Three.js", "GLSL", "WebGL", "GSAP"],
    year: 2023,
    featured: true,
  },
  {
    id: "typo-grid",
    title: "Typography Grid System",
    description:
      "Open-source Figma plugin that generates modular typographic scales and baseline grids from a single type token.",
    tags: ["Figma Plugin API", "TypeScript", "Design Systems"],
    url: "https://github.com/azho/typo-grid",
    year: 2022,
  },
];

// ─── Internships / Experience ───────────────────────────────────────────────

export const internships: Internship[] = [
  {
    id: "studio-nord",
    title: "UX / Product Design Intern",
    company: "Studio Nord",
    period: "Sep 2024 — Feb 2025",
    location: "Berlin, Germany",
    description:
      "Led end-to-end design of a B2B SaaS onboarding flow, cutting drop-off by 34 %. Collaborated with engineering on a shared component library in Figma and Storybook.",
    tags: ["Figma", "Storybook", "User Testing", "Design Systems"],
  },
  {
    id: "codehaus",
    title: "Front-End Developer Intern",
    company: "Codehaus GmbH",
    period: "Mar 2024 — Aug 2024",
    location: "Hamburg, Germany",
    description:
      "Built interactive marketing pages with Next.js 14 and Framer Motion. Implemented A/B testing pipeline that increased CTR by 18 % on key landing pages.",
    tags: ["Next.js", "Framer Motion", "A/B Testing", "Performance"],
  },
  {
    id: "forma-arch",
    title: "Architectural Visualisation Intern",
    company: "Forma Architekten",
    period: "Jun 2023 — Sep 2023",
    location: "Vienna, Austria",
    description:
      "Produced real-time 3D visualisations in Blender and Unreal Engine 5 for client presentations. Developed a parametric facade generator script in Python / Grasshopper.",
    tags: ["Blender", "Unreal Engine 5", "Python", "Grasshopper"],
  },
];
