import type { PositionedWindowProps } from "@/components/collage/windows/Win98Window";
import { Win98Window } from "@/components/collage/windows/Win98Window";

export function ContactSystemDialog(props: PositionedWindowProps) {
  return (
    <Win98Window {...props} title="System message">
      <div className="contact-system-dialog">
        <p className="contact-dialog-message">
          Let&apos;s make something weird
          <br />
          on the internet!
        </p>
        <div className="contact-dialog-actions">
          <a href="#contact-email"><span aria-hidden="true">✉</span> email me</a>
          <a href="#contact-linkedin"><span aria-hidden="true">↗</span> find me on linkedin</a>
        </div>
        <p className="contact-dialog-footer">♡ always open to weird ideas</p>
      </div>
    </Win98Window>
  );
}
