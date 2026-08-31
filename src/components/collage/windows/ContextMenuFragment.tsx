import type { CSSProperties } from "react";

type ContextMenuFragmentProps = {
  style: CSSProperties;
  zIndex: number;
};

export function ContextMenuFragment({ style, zIndex }: ContextMenuFragmentProps) {
  return (
    <aside className="main-world-object main-world-fragment win98-context-menu" style={{ ...style, zIndex }} aria-hidden="true">
      <span>View&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▸</span>
      <span>Arrange Icons&nbsp;▸</span>
      <span>Line up Icons</span>
      <i />
      <span className="is-active">New&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▸</span>
      <span>Properties</span>
    </aside>
  );
}
