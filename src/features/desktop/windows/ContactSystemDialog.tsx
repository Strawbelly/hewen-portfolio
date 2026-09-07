import type { PositionedWindowProps } from "@/components/retro/Win98Window";
import { Win98Window } from "@/components/retro/Win98Window";
import { ContactChat } from "@/features/contact/ContactChat";

export function ContactSystemDialog(props: PositionedWindowProps) {
  return (
    <Win98Window {...props} title="Hewen - Conversation" showTitleIcon={false}>
      <ContactChat />
    </Win98Window>
  );
}
