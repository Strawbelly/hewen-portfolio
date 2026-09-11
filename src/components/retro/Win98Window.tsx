"use client";

import { motion, useDragControls } from "framer-motion";
import type { PanInfo } from "framer-motion";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TaskbarItemIcon } from "@/features/desktop/TaskbarItemIcon";
import { constrainWindowResize, windowMinimumSizes } from "./windowResize";
import {
  taskbarItemById,
  type DesktopWindowStatus,
  type TaskbarWindowId,
} from "@/features/desktop/taskbarItems";

type DesktopWindowInteraction = {
  onActivate: () => void;
  onMinimize: () => void;
  onClose: () => void;
  windowId: TaskbarWindowId;
  isActive: boolean;
  status: DesktopWindowStatus;
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
  showTitleIcon?: boolean;
};

export function Win98Window({
  id,
  title,
  children,
  className = "",
  style,
  zIndex,
  interaction,
  showTitleIcon = true,
}: Win98WindowProps) {
  const windowRef = useRef<HTMLElement>(null);
  const dragControls = useDragControls();
  const [canDrag, setCanDrag] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const interactionsEnabled = canDrag && !isMaximized;
  const [resizedStyle, setResizedStyle] = useState<CSSProperties>();
  const resizeSession = useRef<{
    pointerId: number; x: number; y: number; width: number; height: number;
  } | null>(null);
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

  const resizeWindow = useCallback((width: number, height: number) => {
    const element = windowRef.current;
    const desktop = element?.parentElement;
    if (!element || !desktop || element.hidden || isMaximized ||
        !window.matchMedia("(min-width: 769px)").matches) return;
    const rect = element.getBoundingClientRect();
    const desktopRect = desktop.getBoundingClientRect();
    const taskbar = desktop.closest(".main-world-desktop")?.querySelector(".desktop-taskbar");
    const bounds = {
      left: Math.max(0, desktopRect.left),
      top: Math.max(0, desktopRect.top),
      right: Math.min(window.innerWidth, desktopRect.right),
      bottom: Math.min(window.innerHeight, desktopRect.bottom,
        taskbar?.getBoundingClientRect().top ?? window.innerHeight),
    };
    const next = constrainWindowResize(
      { left: rect.left, top: rect.top, width, height }, bounds,
      windowMinimumSizes[interaction?.windowId ?? "journey"],
    );
    setResizedStyle({
      width: next.width,
      height: next.height,
      // Preserve Framer Motion's current drag translation.
      left: element.offsetLeft + next.left - rect.left,
      top: element.offsetTop + next.top - rect.top,
    });
  }, [interaction?.windowId, isMaximized]);

  useEffect(() => {
    if (!interactionsEnabled || !resizedStyle || interaction?.status !== "open") return;
    const fitDesktop = () => {
      const element = windowRef.current;
      if (element) resizeWindow(element.offsetWidth, element.offsetHeight);
    };
    window.addEventListener("resize", fitDesktop);
    updateDragConstraints();
    return () => window.removeEventListener("resize", fitDesktop);
  }, [interactionsEnabled, resizedStyle, interaction?.status, resizeWindow, updateDragConstraints]);

  const startResizing = (event: PointerEvent<HTMLButtonElement>) => {
    if (!interactionsEnabled || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    interaction?.onActivate();
    const element = windowRef.current;
    if (!element) return;
    resizeSession.current = {
      pointerId: event.pointerId, x: event.clientX, y: event.clientY,
      width: element.offsetWidth, height: element.offsetHeight,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeWindow(element.offsetWidth, element.offsetHeight);
  };

  const continueResizing = (event: PointerEvent<HTMLButtonElement>) => {
    const session = resizeSession.current;
    if (!interactionsEnabled || !session || session.pointerId !== event.pointerId) return;
    resizeWindow(session.width + event.clientX - session.x, session.height + event.clientY - session.y);
  };

  const stopResizing = () => {
    resizeSession.current = null;
    updateDragConstraints();
  };

  useEffect(() => {
    const desktopPointer = window.matchMedia("(min-width: 769px)");
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
    if (!interactionsEnabled || event.target instanceof Element && event.target.closest("button")) return;
    interaction?.onActivate();
    updateDragConstraints();
    dragControls.start(event);
  };

  const toggleMaximize = () => {
    interaction?.onActivate();
    if (!isMaximized && canDrag && windowRef.current) {
      // Freeze the untransformed geometry, including subpixel positions. The
      // motion translation remains untouched and is revealed again on restore.
      const computed = window.getComputedStyle(windowRef.current);
      setResizedStyle({
        left: computed.left,
        top: computed.top,
        width: computed.width,
        height: computed.height,
      });
    }
    resizeSession.current = null;
    setIsMaximized((maximized) => !maximized);
  };

  const keepWindowActive = (_event: MouseEvent | TouchEvent | PointerEvent, _info: PanInfo) => {
    interaction?.onActivate();
  };

  return (
    <motion.article
      ref={windowRef}
      id={id}
      hidden={interaction?.status !== "open"}
      data-maximized={isMaximized}
      className={`main-world-object win98-window draggable-desktop-window ${interaction?.isActive ? "is-active-window" : "is-inactive-window"} ${className}`}
      style={{ ...style, ...(canDrag ? resizedStyle : {}), zIndex }}
      drag={interactionsEnabled}
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
        {interaction && showTitleIcon ? (
          <TaskbarItemIcon
            item={taskbarItemById[interaction.windowId]}
            className="win98-titlebar-icon"
          />
        ) : null}
        <span className="min-w-0 flex-1 truncate">{title}</span>
        <span className="win98-controls">
          <button
            type="button"
            aria-label={`Minimize ${title}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              interaction?.onMinimize();
            }}
          >_</button>
          <button
            type="button"
            aria-label={`${isMaximized ? "Restore" : "Maximize"} ${title}`}
            aria-pressed={isMaximized}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              toggleMaximize();
            }}
          >{isMaximized ? "❐" : "□"}</button>
          <button
            type="button"
            aria-label={`Close ${title}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              interaction?.onClose();
            }}
          >×</button>
        </span>
      </header>
      {children}
      {interactionsEnabled && (
        <button
          type="button"
          className="win98-resize-handle"
          aria-label={`Resize ${title}`}
          onPointerDown={startResizing}
          onPointerMove={continueResizing}
          onPointerUp={stopResizing}
          onPointerCancel={stopResizing}
          onLostPointerCapture={stopResizing}
          onKeyDown={(event) => {
            if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
            event.preventDefault();
            interaction?.onActivate();
            const element = windowRef.current;
            if (!element) return;
            const step = event.shiftKey ? 40 : 10;
            resizeWindow(
              element.offsetWidth + (event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0),
              element.offsetHeight + (event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0),
            );
          }}
        />
      )}
    </motion.article>
  );
}
