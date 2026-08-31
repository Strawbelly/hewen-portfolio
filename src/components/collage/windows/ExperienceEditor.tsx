import type { PositionedWindowProps } from "@/components/collage/windows/Win98Window";
import { Win98Window } from "@/components/collage/windows/Win98Window";

export function ExperienceEditor(props: PositionedWindowProps) {
  return (
    <Win98Window {...props} title="Text File Editor — EXPERIENCE.DOC">
      <div className="experience-editor-app">
        <div className="win98-menubar">File&nbsp;&nbsp; Edit&nbsp;&nbsp; Search&nbsp;&nbsp; Window&nbsp;&nbsp; Help</div>
        <div className="editor-toolbar">New&nbsp; Open&nbsp; Save &nbsp;│&nbsp; Courier New &nbsp; 10</div>
        <div className="editor-ruler">0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5</div>
        <article className="editor-document">
          <p>PROSPECT EQUITIES</p>
          <p className="mt-2 font-bold text-cobalt">Software Engineer Intern</p>
          <p className="mt-4">React / Spring Boot / PostgreSQL / Kafka / AWS</p>
          <p className="mt-5 text-[10px] text-gray-500">engineering_notes.txt</p>
        </article>
        <div className="win98-statusbar"><span>Ln 1, Col 1</span><span>INS</span><span>100%</span></div>
      </div>
    </Win98Window>
  );
}
