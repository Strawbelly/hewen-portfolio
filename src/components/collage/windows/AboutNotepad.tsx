import { RabbitAvatar } from "@/components/rabbit/RabbitAvatar";
import type { PositionedWindowProps } from "@/components/collage/windows/Win98Window";
import { Win98Window } from "@/components/collage/windows/Win98Window";

export function AboutNotepad(props: PositionedWindowProps) {
  return (
    <Win98Window {...props} title="ABOUT_ME.TXT">
      <div className="about-notepad-app">
        <div className="win98-menubar">File&nbsp;&nbsp; Edit&nbsp;&nbsp; Search&nbsp;&nbsp; Help</div>
        <div className="about-notepad-content">
          <RabbitAvatar size="sm" priority />
          <p><strong>Hi, I&apos;m Hewen.</strong><br /><br />Software engineer.<br />Building little worlds with code.</p>
        </div>
        <span id="resume" className="sr-only">Resume</span>
      </div>
    </Win98Window>
  );
}
