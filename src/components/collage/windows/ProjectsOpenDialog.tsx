import type { PositionedWindowProps } from "@/components/collage/windows/Win98Window";
import { Win98Window } from "@/components/collage/windows/Win98Window";
import type { ProjectOption } from "@/components/collage/windows/projectOptions";

type ProjectsOpenDialogProps = PositionedWindowProps & {
  projects: ProjectOption[];
  selectedProject: ProjectOption;
  onSelect: (id: string) => void;
  onOpen: () => void;
  onCancel: () => void;
};

export function ProjectsOpenDialog({
  projects,
  selectedProject,
  onSelect,
  onOpen,
  onCancel,
  ...windowProps
}: ProjectsOpenDialogProps) {
  return (
    <Win98Window {...windowProps} title="Open">
      <div className="open-file-dialog">
        <div className="open-file-location-row">
          <span>Look in:</span>
          <div className="win98-field"><span className="text-cobalt">▣</span> C:\HEWEN\PROJECTS <span className="ml-auto">▼</span></div>
          <button type="button" className="win98-icon-button" aria-label="Go up">↰</button>
          <button type="button" className="win98-icon-button" aria-label="List view">▦</button>
        </div>
        <div className="open-file-menu">File&nbsp;&nbsp; Edit&nbsp;&nbsp; View&nbsp;&nbsp; Help</div>
        <div className="open-file-entries">
          {projects.map((project) => {
            const selected = selectedProject.id === project.id;
            return (
              <button
                key={project.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(project.id)}
                className="open-file-entry focus-ring"
              >
                <span className={`open-file-icon ${selected ? "is-selected" : ""}`}>▤</span>
                <span className={selected ? "is-selected-label" : ""}>{project.title}</span>
              </button>
            );
          })}
        </div>
        <div className="open-file-fields">
          <label htmlFor="selected-project">File name:</label>
          <div className="win98-combo">
            <input id="selected-project" readOnly value={selectedProject.title} />
            <span>▼</span>
          </div>
          <button type="button" onClick={onOpen} className="win98-button">Open</button>
          <span>Files of type:</span>
          <div className="win98-combo"><span>Software Projects</span><span>▼</span></div>
          <button type="button" onClick={onCancel} className="win98-button">Cancel</button>
        </div>
      </div>
    </Win98Window>
  );
}
