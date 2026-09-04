import Link from "next/link";
import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";

type ProjectDetailLayoutProps = {
  project: Project;
};

function ArchitecturePreview({ project }: { project: Project }) {
  return (
    <figure className="project-doc-architecture">
      <figcaption>{project.architecture.caption}</figcaption>
      <div className="project-doc-system-map">
        {project.architecture.nodes.map((node, index) => (
          <span key={node}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            {node}
          </span>
        ))}
      </div>
      <p>{project.architecture.annotations.join("  ·  ")}</p>
    </figure>
  );
}

export function ProjectDetailLayout({ project }: ProjectDetailLayoutProps) {
  const projectIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;
  const highlights = project.challenges.slice(0, 3);

  return (
    <article className="project-document-browser">
      <header className="project-document-titlebar">
        <span>▤</span>
        <strong>{project.title} — Project</strong>
        <div aria-hidden="true"><i>_</i><i>□</i><i>×</i></div>
      </header>

      <nav className="project-document-toolbar" aria-label="Document toolbar">
        <Link href="/" aria-label="Back to desktop">←</Link>
        <button type="button" disabled aria-label="Forward">→</button>
        <button type="button" aria-label="Refresh page">⟳</button>
        <Link href="/">⌂ Home</Link>
        <span className="project-document-toolbar-separator" />
        <span>README.html</span>
        <span className="project-document-source">View Source</span>
      </nav>

      <div className="project-document-address">
        <span>Address</span>
        <div>▣ &nbsp;{project.filePath}\README.html</div>
        <span>Go</span>
      </div>

      <main className="project-document-content">
        <header className="project-document-project-header">
          <div>
            <p className="project-document-kicker">LOCAL PROJECT DOCUMENT / README.HTML</p>
            <h1>{project.title}</h1>
            <p className="project-document-summary">{project.summary}</p>
            <p className="project-document-tags">{project.tags.join(" / ")}</p>
          </div>
          <dl>
            <div><dt>TYPE:</dt><dd>{project.metadata.type}</dd></div>
            <div><dt>FOCUS:</dt><dd>{project.metadata.focus}</dd></div>
            <div><dt>STATUS:</dt><dd>{project.status === "published" ? "Completed" : "In progress"}</dd></div>
            <div><dt>FILE:</dt><dd>{project.fileName}</dd></div>
          </dl>
        </header>

        <section className="project-document-section project-document-overview">
          <h2><span>01</span> OVERVIEW / ARCHITECTURE</h2>
          <div className="project-document-overview-copy">
            <strong>{project.overview.statement}</strong>
            <p>{project.overview.body}</p>
          </div>
          <ArchitecturePreview project={project} />
        </section>

        <section className="project-document-section project-document-highlights">
          <h2><span>02</span> ENGINEERING HIGHLIGHTS</h2>
          <div>
            {highlights.map((highlight, index) => (
              <article key={highlight.code}>
                <p>{String(index + 1).padStart(2, "0")} /</p>
                <div>
                  <h3>{highlight.title}</h3>
                  <strong>{highlight.technology}</strong>
                  <span>{highlight.description}</span>
                </div>
                <code>{highlight.diagram.join(" → ")}</code>
              </article>
            ))}
          </div>
        </section>

        <footer className="project-document-footer">
          <div className="project-document-file-meta">
            <span>Last updated: 2026</span>
            <span>Status: {project.status === "published" ? "completed" : project.status}</span>
            <span>{project.filePath}</span>
          </div>
          <div className="project-document-actions">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="project-document-button">View GitHub</a>
            ) : (
              <button type="button" className="project-document-button" disabled>View GitHub</button>
            )}
          </div>
          <nav className="project-document-project-nav" aria-label="Project navigation">
            {previousProject ? <Link href={`/projects/${previousProject.slug}`}>← Previous Project</Link> : <span />}
            <Link href="/">Back to Desktop</Link>
            {nextProject ? <Link href={`/projects/${nextProject.slug}`}>Next Project →</Link> : <span />}
          </nav>
        </footer>
      </main>

      <div className="project-document-statusbar">
        <span>Done</span>
        <span>Local intranet</span>
      </div>
    </article>
  );
}
