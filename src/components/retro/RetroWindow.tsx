"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useState } from "react";

type RetroWindowProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  zIndex?: number;
  draggable?: boolean;
  onFocus?: (id: string) => void;
};

export function RetroWindow({
  id,
  title,
  children,
  className = "",
  zIndex = 1,
  draggable = true,
  onFocus
}: RetroWindowProps) {
  const [open, setOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const reduceMotion = useReducedMotion();

  if (!open) {
    return null;
  }

  return (
    <motion.article
      drag={draggable && !reduceMotion}
      dragMomentum={false}
      onPointerDown={() => onFocus?.(id)}
      tabIndex={0}
      onFocus={() => onFocus?.(id)}
      style={{ zIndex }}
      className={`retro-panel absolute bg-chrome p-1 shadow-hard ${draggable ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 18, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35 }}
    >
      <header className="flex items-center justify-between bg-cobalt px-2 py-1 font-mono text-lg leading-none text-white">
        <span>{title}</span>
        <span className="flex gap-1">
          <button
            type="button"
            aria-label={`Minimize ${title}`}
            onClick={() => setMinimized((value) => !value)}
            className="focus-ring grid h-5 w-5 place-items-center border border-white bg-chrome text-ink"
          >
            _
          </button>
          <button
            type="button"
            aria-label={`Close ${title}`}
            onClick={() => setOpen(false)}
            className="focus-ring grid h-5 w-5 place-items-center border border-white bg-chrome text-ink"
          >
            ×
          </button>
        </span>
      </header>
      {!minimized && <div className="bg-white p-4">{children}</div>}
    </motion.article>
  );
}
