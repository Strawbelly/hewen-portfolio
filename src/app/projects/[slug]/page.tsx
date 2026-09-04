import { notFound } from "next/navigation";
import { ProjectDetailLayout } from "@/components/projects/ProjectDetailLayout";
import { getProjectBySlug, projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="project-document-page">
      <ProjectDetailLayout project={project} />
    </main>
  );
}
