"use client";

import { motion, useDragControls } from "framer-motion";
import type { PanInfo } from "framer-motion";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TaskbarItemIcon } from "@/components/retro/TaskbarItemIcon";
import { taskbarItemById, type TaskbarWindowId } from "@/components/retro/taskbarItems";

type DesktopWindowInteraction = {
  onActivate: () => void;
  windowId: TaskbarWindowId;
  isActive: boolean;
};

export type PositionedWindowProps = {
  id: string;
  className?: string;
  style?: CSSProperties;
  zIndex: number;
  interaction?: DesktopWindowInteraction;
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
  interaction,
  onClose
}: Win98WindowProps) {
  const windowRef = useRef<HTMLElement>(null);
  const dragControls = useDragControls();
  const [canDrag, setCanDrag] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const updateDragConstraints = useCallback(() => {
    const windowElement = windowRef.current;
    const desktop = windowElement?.parentElement;
    if (!windowElement || !desktop) return;

    const baseLeft = windowElement.offsetLeft;
    const baseTop = windowElement.offsetTop;
    const windowWidth = windowElement.offsetWidth;
    const titleBarHeight =
      windowElement.querySelector<HTMLElement>(".win98-titlebar")?.offsetHeight ?? 22;

    setDragConstraints({
      left: 100 - baseLeft - windowWidth,
      right: desktop.clientWidth - 100 - baseLeft,
      top: -baseTop,
      bottom: desktop.clientHeight - titleBarHeight - baseTop,
    });
  }, []);

  useEffect(() => {
    const desktopPointer = window.matchMedia("(min-width: 768px)");
    const updateDraggingMode = () => setCanDrag(desktopPointer.matches);
    updateDraggingMode();
    updateDragConstraints();
    desktopPointer.addEventListener("change", updateDraggingMode);
    window.addEventListener("resize", updateDragConstraints);
    return () => {
      desktopPointer.removeEventListener("change", updateDraggingMode);
      window.removeEventListener("resize", updateDragConstraints);
    };
  }, [updateDragConstraints]);

  const startDragging = (event: PointerEvent<HTMLElement>) => {
    if (!canDrag || event.target instanceof Element && event.target.closest("button")) return;
    interaction?.onActivate();
    updateDragConstraints();
    dragControls.start(event);
  };

  const keepWindowActive = (_event: MouseEvent | TouchEvent | PointerEvent, _info: PanInfo) => {
    interaction?.onActivate();
  };

  return (
    <motion.article
      ref={windowRef}
      id={id}
      className={`main-world-object win98-window draggable-desktop-window ${interaction?.isActive ? "is-active-window" : "is-inactive-window"} ${className}`}
      style={{ ...style, zIndex }}
      drag={canDrag}
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={dragConstraints}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={keepWindowActive}
      onPointerDown={() => interaction?.onActivate()}
      transformTemplate={(_, generatedTransform) =>
        `${generatedTransform} rotate(var(--world-rotation))`
      }
    >
      <header className="win98-titlebar draggable-window-titlebar" onPointerDown={startDragging}>
        {interaction ? (
          <TaskbarItemIcon
            item={taskbarItemById[interaction.windowId]}
            className="win98-titlebar-icon"
          />
        ) : null}
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
    </motion.article>
  );
}
