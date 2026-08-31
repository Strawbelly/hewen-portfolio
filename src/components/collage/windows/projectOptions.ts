export type ProjectOption = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
};

export const projectOptions: ProjectOption[] = [
  {
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "A scalable storefront and order-management system built for reliable transactions.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    highlights: ["Transactional checkout flow", "Inventory consistency", "Cached product discovery"]
  },
  {
    id: "education-platform",
    title: "Education Platform",
    description: "A learning platform connecting structured coursework, progress, and collaboration.",
    technologies: ["React", "Java", "Spring Boot", "PostgreSQL"],
    highlights: ["Role-based learning spaces", "Progress tracking", "Modular course architecture"]
  },
  {
    id: "ai-music-agent",
    title: "AI Music Agent",
    description: "An AI-assisted music workflow that turns creative direction into useful iterations.",
    technologies: ["Python", "LLMs", "Audio APIs", "Vector Search"],
    highlights: ["Agent orchestration", "Context-aware suggestions", "Human-in-the-loop refinement"]
  }
];
