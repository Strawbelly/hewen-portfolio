export type ProjectDetailSection =
  | "Overview"
  | "Problem"
  | "Architecture"
  | "Engineering Challenges"
  | "Technical Decisions"
  | "Trade-offs"
  | "Results"
  | "What I Learned";

export type Project = {
  slug: string;
  title: string;
  fileName: string;
  status: "placeholder" | "draft" | "published";
  summary: string;
  tags: string[];
  sections: Record<ProjectDetailSection, string>;
};

const placeholderText = "Placeholder for the future case study.";

export const projects: Project[] = [
  {
    slug: "project-01",
    title: "project_01",
    fileName: "project_01.jpg",
    status: "placeholder",
    summary: "Replace with a real software engineering project later.",
    tags: ["placeholder", "case-study"],
    sections: {
      Overview: placeholderText,
      Problem: placeholderText,
      Architecture: placeholderText,
      "Engineering Challenges": placeholderText,
      "Technical Decisions": placeholderText,
      "Trade-offs": placeholderText,
      Results: placeholderText,
      "What I Learned": placeholderText
    }
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
