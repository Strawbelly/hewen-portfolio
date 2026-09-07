export type ProjectPreviewKind = "commerce" | "education" | "music";

export type ProjectOption = {
  id: string;
  title: string;
  type: string;
  description: string;
  technologies: string[];
  metadata: string[];
  previewImage?: string;
  previewKind: ProjectPreviewKind;
  previewLabels: string[];
  href: string;
  github?: string;
  icon: string;
  highlights: string[];
};

export const projectOptions: ProjectOption[] = [
  {
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    type: "Distributed System",
    description: "Distributed order-to-payment system",
    technologies: ["Java", "Spring Cloud", "Redis", "RocketMQ", "Elasticsearch"],
    metadata: ["Service topology: distributed", "Data flow: order → payment", "Status: case study"],
    previewKind: "commerce",
    previewLabels: ["ORDER", "PAYMENT", "INVENTORY", "MQ", "SEARCH"],
    href: "/projects/e-commerce",
    icon: "▦",
    highlights: ["Transactional checkout flow", "Inventory consistency", "Event-driven order processing"]
  },
  {
    id: "education-platform",
    title: "Education Platform",
    type: "Microservices Platform",
    description: "Learning workflow, progress, and leaderboard services",
    technologies: ["React", "Java", "Spring Boot", "PostgreSQL"],
    metadata: ["Workspace: role based", "Progress: event tracked", "Status: case study"],
    previewKind: "education",
    previewLabels: ["COURSE", "LEARN", "PROGRESS", "QUIZ", "RANK"],
    href: "/projects/education",
    icon: "▤",
    highlights: ["Role-based learning spaces", "Progress tracking", "Modular course architecture"]
  },
  {
    id: "ai-music-agent",
    title: "AI Music Agent",
    type: "AI Agent",
    description: "Agent workflow for iterative music exploration",
    technologies: ["Python", "LLMs", "Audio APIs", "Vector Search"],
    metadata: ["Mode: human in the loop", "Output: music iterations", "Status: prototype"],
    previewKind: "music",
    previewLabels: ["PROMPT", "AGENT", "TRACK", "MIX", "PLAY"],
    href: "/projects/ai-music-agent",
    icon: "♫",
    highlights: ["Agent orchestration", "Context-aware suggestions", "Human-in-the-loop refinement"]
  }
];
