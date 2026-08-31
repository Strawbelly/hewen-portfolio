import type { ProjectOption } from "@/components/collage/windows/projectOptions";
import type { PositionedWindowProps } from "@/components/collage/windows/Win98Window";
import { Win98Window } from "@/components/collage/windows/Win98Window";

type ProjectPreviewWindowProps = PositionedWindowProps & {
  project: ProjectOption;
};

export function ProjectPreviewWindow({ project, ...windowProps }: ProjectPreviewWindowProps) {
  return (
    <Win98Window {...windowProps} title={`${project.title} — Project Preview`}>
      <div className="project-preview-app">
        <div className="win98-menubar">Project&nbsp;&nbsp; View&nbsp;&nbsp; Engineering Notes&nbsp;&nbsp; Help</div>
        <article>
          <small>SELECTED PROJECT</small>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <div className="project-preview-tech">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div>
          <ul>{project.highlights.map((item) => <li key={item}>▸ {item}</li>)}</ul>
        </article>
        <footer><button type="button" className="win98-button">OPEN FULL CASE STUDY</button></footer>
      </div>
    </Win98Window>
  );
}
