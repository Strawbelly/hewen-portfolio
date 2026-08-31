import type { PositionedWindowProps } from "@/components/collage/windows/Win98Window";
import { Win98Window } from "@/components/collage/windows/Win98Window";

export function JourneyLogWindow(props: PositionedWindowProps) {
  return (
    <Win98Window {...props} title="MY_JOURNEY.LOG — Notepad">
      <div className="journey-log-app">
        <div className="win98-menubar">File&nbsp;&nbsp; Edit&nbsp;&nbsp; Search&nbsp;&nbsp; Help</div>
        <div className="journey-log-text">
          <p>C:\HEWEN\HISTORY&gt; read journey.log</p>
          <p className="mt-4">01&nbsp; Creating with paper</p>
          <p className="mt-3">02&nbsp; Hello, World!<br />&nbsp;&nbsp;&nbsp; First Python at Northeastern</p>
          <p className="mt-3">03&nbsp; Building my first little world<br />&nbsp;&nbsp;&nbsp; Pixel-style human-vs-computer game</p>
          <p className="mt-3">04&nbsp; From programs to systems<br />&nbsp;&nbsp;&nbsp; Java / Distributed Systems / Full-stack / AI</p>
          <p className="mt-4">Still building...</p>
        </div>
      </div>
    </Win98Window>
  );
}
