import type { PositionedWindowProps } from "@/components/retro/Win98Window";
import { Win98Window } from "@/components/retro/Win98Window";

export function ExperienceEditor(props: PositionedWindowProps) {
  return (
    <Win98Window {...props} title="Text File Editor — EXPERIENCE.DOC">
      <div className="experience-editor-app">
        <div className="win98-menubar">
          File&nbsp;&nbsp; Edit&nbsp;&nbsp; Search&nbsp;&nbsp;
          Window&nbsp;&nbsp; Help
        </div>
        <div className="editor-toolbar">
          New&nbsp; Open&nbsp; Save &nbsp;│&nbsp; Tahoma &nbsp; 10
        </div>
        <div className="editor-ruler">
          0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5
        </div>
        <article className="editor-document">
          <p>PROSPECT EQUITIES — Full-Service Real Estate Brokerage </p>
          <p className="mt-2 font-bold text-cobalt">
            Frontend Developer Intern
          </p>
          <p className="mt-4">Figma · React · JavaScript</p>

          <div className="experience-notes">
            <section>
              <h2>
                <span>01 —</span> COMMISSION WORKFLOW
              </h2>
              <p>
                Designed and built the pre-payment commission workflow from
                Figma to React, supporting agent split calculations, payout
                confirmation, and tracking as groundwork for bringing commission
                payouts into the internal platform.
              </p>
            </section>

            <section>
              <h2>
                <span>02 —</span> FUNDS WORKFLOW
              </h2>
              <p>
                Extended the existing fund-intake workflow into fund release in
                React, integrating APIs for fund records, receipt uploads, and
                agent notifications.
              </p>
            </section>

            <section>
              <h2>
                <span>03 —</span> BEYOND THE UI
              </h2>
              <p>
                Traced the fund intake/release flow beyond the frontend,
                following how user actions triggered fund record storage,
                receipt storage, PDF generation, and agent notifications.
              </p>
            </section>
          </div>
        </article>
        <div className="win98-statusbar">
          <span>Ln 1, Col 1</span>
          <span>INS</span>
          <span>100%</span>
        </div>
      </div>
    </Win98Window>
  );
}
