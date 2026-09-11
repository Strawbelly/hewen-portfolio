"use client";

import { motion, useDragControls } from "framer-motion";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import type { MainWorldDecorationLayout } from "@/features/desktop/mainWorldDecorationsLayout";

type DesktopDecorationProps = {
  layout: MainWorldDecorationLayout;
  constraintsRef: RefObject<HTMLDivElement | null>;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

type ResizeStart = {
  pointerX: number;
  width: number;
  direction: -1 | 1;
};

export function DesktopDecoration({
  layout,
  constraintsRef,
  isSelected,
  onSelect,
}: DesktopDecorationProps) {
  const { filename, aspectRatio, x, y, width, rotation, zIndex, mobileVisible } = layout;
  const id = `decoration-${filename}`;
  const src = `/assets/main-world/decorations/${filename}`;
  const decorationRef = useRef<HTMLDivElement>(null);
  const resizeStart = useRef<ResizeStart | null>(null);
  const dragControls = useDragControls();
  const [resizedWidth, setResizedWidth] = useState<number | null>(null);
  const [layer, setLayer] = useState<"back" | "front">("front");

  const startResize = (event: ReactPointerEvent<HTMLButtonElement>, direction: -1 | 1) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(id);
    const currentWidth = decorationRef.current?.getBoundingClientRect().width;
    if (!currentWidth) return;
    resizeStart.current = { pointerX: event.clientX, width: currentWidth, direction };
  };

  useEffect(() => {
    const resize = (event: PointerEvent) => {
      if (!resizeStart.current) return;
      event.preventDefault();
      const nextWidth =
        resizeStart.current.width +
        (event.clientX - resizeStart.current.pointerX) * resizeStart.current.direction;
      setResizedWidth(Math.max(64, Math.min(nextWidth, 360)));
    };

    const stopResize = () => {
      resizeStart.current = null;
    };

    window.addEventListener("pointermove", resize, { passive: false });
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);

    return () => {
      window.removeEventListener("pointermove", resize);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("pointercancel", stopResize);
    };
  }, []);

  return (
    <motion.div
      ref={decorationRef}
      className={`main-world-decoration ${isSelected ? "is-selected" : ""} ${mobileVisible ? "is-mobile-visible" : ""}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        aspectRatio,
        width: resizedWidth ?? width,
        rotate: rotation,
        zIndex: layer === "front" ? zIndex : 0,
      }}
      drag
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 1280px) 15vw, 220px"
        draggable={false}
        className="main-world-decoration-image"
      />
      <button
        type="button"
        className="main-world-decoration-drag-surface"
        aria-label="Move decoration"
        onPointerDown={(event) => {
          onSelect(id);
          dragControls.start(event);
        }}
        onDoubleClick={(event) => {
          event.stopPropagation();
          setLayer((current) => current === "back" ? "front" : "back");
        }}
      />
      {isSelected ? (
        <>
          {(["top-left", "bottom-left"] as const).map((corner) => (
            <button
              key={corner}
              type="button"
              className={`main-world-decoration-scale-handle ${corner}`}
              aria-label="Resize decoration"
              onPointerDown={(event) => startResize(event, -1)}
            />
          ))}
          {(["top-right", "bottom-right"] as const).map((corner) => (
            <button
              key={corner}
              type="button"
              className={`main-world-decoration-scale-handle ${corner}`}
              aria-label="Resize decoration"
              onPointerDown={(event) => startResize(event, 1)}
            />
          ))}
        </>
      ) : null}
    </motion.div>
  );
}
