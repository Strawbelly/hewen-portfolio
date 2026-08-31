import type { PositionedWindowProps } from "@/components/collage/windows/Win98Window";
import { Win98Window } from "@/components/collage/windows/Win98Window";

export function ContactSystemDialog(props: PositionedWindowProps) {
  return (
    <Win98Window {...props} title="System message">
      <div className="contact-system-dialog">
        <p>Let&apos;s build<br />something?</p>
        <div><button type="button" className="win98-button">Email</button><button type="button" className="win98-button">LinkedIn</button></div>
      </div>
    </Win98Window>
  );
}
