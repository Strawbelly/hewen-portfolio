import Link from "next/link";
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
    <main className="min-h-screen bg-paper px-5 py-6 text-ink sm:px-8 lg:px-12">
      <Link
        href="/"
        className="focus-ring inline-flex border border-ink bg-white px-3 py-2 font-mono text-lg shadow-hard"
      >
        ← back_to_world
      </Link>
      <ProjectDetailLayout project={project} />
    </main>
  );
}
