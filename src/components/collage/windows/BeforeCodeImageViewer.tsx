import type { PositionedWindowProps } from "@/components/collage/windows/Win98Window";
import { Win98Window } from "@/components/collage/windows/Win98Window";

export function BeforeCodeImageViewer(props: PositionedWindowProps) {
  return (
    <Win98Window {...props} title="paper_world_01.jpg">
      <div className="image-viewer-app">
        <div className="win98-menubar">File&nbsp;&nbsp; Edit&nbsp;&nbsp; View&nbsp;&nbsp; Image&nbsp;&nbsp; Help</div>
        <div className="image-viewer-toolbar">↶ &nbsp; ↷ &nbsp; ⊞ &nbsp; 100%</div>
        <div className="image-viewer-viewport">
          <div className="image-placeholder-canvas">
            <span>IMAGE PLACEHOLDER</span>
            <small>paper_world_01.jpg</small>
          </div>
          <span className="image-viewer-scroll-y" aria-hidden="true" />
          <span className="image-viewer-scroll-x" aria-hidden="true" />
        </div>
        <div className="win98-statusbar"><span>1214 × 1295</span><span>RGB / 24 bit</span><span>100%</span></div>
      </div>
    </Win98Window>
  );
}
