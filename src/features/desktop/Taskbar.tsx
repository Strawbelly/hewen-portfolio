"use client";

import { useEffect, useState } from "react";
import { TaskbarItemIcon } from "@/features/desktop/TaskbarItemIcon";
import {
  collagesTaskbarItem,
  projectPreviewTaskbarItem,
  startTaskbarItem,
  taskbarWindowItems,
  type TaskbarWindowId,
} from "@/features/desktop/taskbarItems";

export type { TaskbarWindowId } from "@/features/desktop/taskbarItems";

type TaskbarProps = {
  activeWindowId: TaskbarWindowId | null;
  onWindowActivate: (id: TaskbarWindowId) => void;
  projectPreviewLabel?: string;
  collagesVisible?: boolean;
};

export function Taskbar({ activeWindowId, onWindowActivate, projectPreviewLabel, collagesVisible = false }: TaskbarProps) {
  const [localTime, setLocalTime] = useState("--:--");
  const taskbarWindows = [
    ...taskbarWindowItems,
    ...(collagesVisible ? [collagesTaskbarItem] : []),
    ...(projectPreviewLabel ? [{ ...projectPreviewTaskbarItem, label: projectPreviewLabel }] : []),
  ];

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
    const updateTime = () => setLocalTime(formatter.format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <nav
      aria-label="Open desktop windows"
      className="desktop-taskbar"
    >
      <button type="button" className="desktop-start-button focus-ring" aria-label="Start">
        <TaskbarItemIcon item={startTaskbarItem} />
        {startTaskbarItem.label}
      </button>

      <div className="desktop-task-buttons">
        {taskbarWindows.map((windowItem) => (
          <button
            key={windowItem.id}
            type="button"
            aria-pressed={activeWindowId === windowItem.id}
            onClick={() => onWindowActivate(windowItem.id)}
            className={`desktop-task-button focus-ring ${activeWindowId === windowItem.id ? "is-active" : ""}`}
          >
            <TaskbarItemIcon item={windowItem} />
            <span>{windowItem.label}</span>
          </button>
        ))}
      </div>

      <div className="desktop-system-tray" aria-label="System tray">
        <time>{localTime}</time>
      </div>
    </nav>
  );
}
