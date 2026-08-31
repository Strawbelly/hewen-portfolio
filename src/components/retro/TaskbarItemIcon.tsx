import Image from "next/image";
import type { TaskbarIconConfig } from "@/components/retro/taskbarItems";

type TaskbarItemIconProps = {
  item: TaskbarIconConfig;
  className?: string;
};

export function TaskbarItemIcon({ item, className = "" }: TaskbarItemIconProps) {
  if (!item.icon) {
    return (
      <span className={`desktop-taskbar-fallback-icon ${className}`} aria-hidden="true">
        {item.fallbackIcon}
      </span>
    );
  }

  return (
    <Image
      src={item.icon}
      alt=""
      width={20}
      height={20}
      unoptimized
      className={`desktop-taskbar-icon ${item.pixelArt ? "is-pixel-art" : ""} ${className}`}
      aria-hidden="true"
    />
  );
}
