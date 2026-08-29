import { Project } from "@/content/projects";

type ProjectDetailLayoutProps = {
  project: Project;
};

export function ProjectDetailLayout({ project }: ProjectDetailLayoutProps) {
  const sections = Object.entries(project.sections);

  return (
    <article className="mx-auto mt-10 max-w-4xl">
      <header className="border-2 border-ink bg-white p-5 shadow-hard">
        <p className="font-mono text-xl text-cobalt">{project.fileName}</p>
        <h1 className="mt-3 font-display text-5xl leading-none text-cobalt sm:text-7xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-lg">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="border border-ink bg-cobalt-soft px-2 py-1 font-mono text-lg leading-none">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="mt-8 grid gap-5">
        {sections.map(([title, body]) => (
          <section key={title} className="border border-ink bg-white p-5">
            <h2 className="font-mono text-3xl leading-none text-cobalt">{title}</h2>
            <p className="mt-3 text-lg leading-relaxed">{body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
