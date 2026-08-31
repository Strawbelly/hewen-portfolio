import type { CSSProperties, ReactNode } from "react";

export type PositionedWindowProps = {
  id: string;
  className?: string;
  style?: CSSProperties;
  zIndex: number;
};

type Win98WindowProps = PositionedWindowProps & {
  title: string;
  children: ReactNode;
  onClose?: () => void;
};

export function Win98Window({
  id,
  title,
  children,
  className = "",
  style,
  zIndex,
  onClose
}: Win98WindowProps) {
  return (
    <article
      id={id}
      className={`main-world-object win98-window ${className}`}
      style={{ ...style, zIndex }}
    >
      <header className="win98-titlebar">
        <span className="min-w-0 flex-1 truncate">{title}</span>
        <span className="win98-controls">
          <span aria-hidden="true">_</span>
          <span aria-hidden="true">□</span>
          {onClose ? (
            <button type="button" aria-label={`Close ${title}`} onClick={onClose}>×</button>
          ) : (
            <span aria-hidden="true">×</span>
          )}
        </span>
      </header>
      {children}
    </article>
  );
}
