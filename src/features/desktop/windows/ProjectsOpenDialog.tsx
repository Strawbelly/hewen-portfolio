import type { PositionedWindowProps } from "@/components/retro/Win98Window";
import { Win98Window } from "@/components/retro/Win98Window";
import type { ProjectOption } from "@/features/projects/projectData";

type ProjectsOpenDialogProps = PositionedWindowProps & {
  projects: ProjectOption[];
  selectedProject: ProjectOption;
  onSelect: (id: string) => void;
  onOpen: (project: ProjectOption) => void;
  onViewGithub: () => void;
};

export function ProjectsOpenDialog({
  projects,
  selectedProject,
  onSelect,
  onOpen,
  onViewGithub,
  ...windowProps
}: ProjectsOpenDialogProps) {
  return (
    <Win98Window {...windowProps} title="Open">
      <div className="open-file-dialog project-browser-dialog">
        <div className="open-file-location-row">
          <span>Look in:</span>
          <div className="win98-field"><span className="text-cobalt">▣</span> C:\HEWEN\PROJECTS <span className="ml-auto">▼</span></div>
          <button type="button" className="win98-icon-button" aria-label="Go up">↰</button>
          <button type="button" className="win98-icon-button" aria-label="List view">▦</button>
        </div>
        <div className="open-file-menu">File&nbsp;&nbsp; Edit&nbsp;&nbsp; View&nbsp;&nbsp; Help</div>

        <div className="project-browser-workspace">
          <nav className="project-shortcuts" aria-label="Software projects">
            {projects.map((project) => {
              const selected = selectedProject.id === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  aria-pressed={selected}
                  className={`project-shortcut focus-ring ${selected ? "is-selected" : ""}`}
                  onClick={() => onSelect(project.id)}
                  onDoubleClick={() => {
                    onSelect(project.id);
                    onOpen(project);
                  }}
                >
                  <span className="project-shortcut-icon" aria-hidden="true">{project.icon}</span>
                  <span>{project.title}</span>
                </button>
              );
            })}
          </nav>

          <section className="project-file-preview" aria-live="polite">
            <header>
              <span>PROJECT PREVIEW</span>
              <strong>{selectedProject.title.toUpperCase()}</strong>
              <p>{selectedProject.description}</p>
            </header>

            <div className={`project-system-visual is-${selectedProject.previewKind}`}>
              <span className="project-system-caption">
                {selectedProject.previewKind === "commerce" ? "ORDER FLOW / SYSTEM MAP" : null}
                {selectedProject.previewKind === "education" ? "LEARNING SERVICE WORKFLOW" : null}
                {selectedProject.previewKind === "music" ? "AGENT SESSION / AUDIO FLOW" : null}
              </span>
              <div className="project-system-nodes">
                {selectedProject.previewLabels.map((label, index) => (
                  <span key={label} data-node={index + 1}>{label}</span>
                ))}
              </div>
            </div>

            <div className="project-preview-details">
              <div className="project-preview-tech-list">
                {selectedProject.technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <dl>
                {selectedProject.metadata.map((detail) => {
                  const [label, value] = detail.split(": ");
                  return <div key={detail}><dt>{label}:</dt><dd>{value}</dd></div>;
                })}
              </dl>
            </div>
          </section>
        </div>

        <div className="project-browser-fields">
          <label htmlFor="selected-project">Project name:</label>
          <div className="win98-combo">
            <input id="selected-project" readOnly value={selectedProject.title} />
          </div>
          <button type="button" onClick={() => onOpen(selectedProject)} className="win98-button">Open Project</button>
          <span>Project type:</span>
          <div className="win98-combo"><span>{selectedProject.type}</span><span>▼</span></div>
          <button
            type="button"
            onClick={onViewGithub}
            disabled={!selectedProject.github}
            className="win98-button"
            title={selectedProject.github ? "Open GitHub in a new tab" : "GitHub URL not added yet"}
          >
            View GitHub
          </button>
        </div>
      </div>
    </Win98Window>
  );
}
