"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import type { CollageLayoutItem, CollageMotion } from "@/components/landing/desktopLayout";

type CollageItemProps = {
  item: CollageLayoutItem;
  motionConfig?: CollageMotion;
  hoverConfig?: CollageHover;
  className?: string;
  children: ReactNode;
};

export type CollageHover = {
  scale?: number;
  x?: number;
  y?: number;
  rotate?: number;
  duration?: number;
};

type CollageItemStyle = CSSProperties & {
  "--collage-x": number;
  "--collage-y": number;
  "--collage-width": number;
  "--collage-rotation": string;
  "--collage-scale": number;
  "--collage-z-index": number;
  "--collage-transform-origin": string;
};

export function CollageItem({
  item,
  motionConfig,
  hoverConfig,
  className,
  children
}: CollageItemProps) {
  const style: CollageItemStyle = {
    "--collage-x": item.x,
    "--collage-y": item.y,
    "--collage-width": item.width,
    "--collage-rotation": `${item.rotation}deg`,
    "--collage-scale": item.scale ?? 1,
    "--collage-z-index": item.zIndex,
    "--collage-transform-origin": item.transformOrigin ?? "center"
  };

  if (item.height !== undefined) {
    style.height = item.height;
  }

  const content = hoverConfig ? (
    <motion.div
      className="landing-collage-hover"
      whileHover={{
        scale: hoverConfig.scale ?? 1,
        x: hoverConfig.x ?? 0,
        y: hoverConfig.y ?? 0,
        rotate: hoverConfig.rotate ?? 0
      }}
      transition={{
        type: "tween",
        duration: hoverConfig.duration ?? 0.25,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  ) : (
    children
  );

  return (
    <div className={["landing-collage-item", className].filter(Boolean).join(" ")} style={style}>
      {motionConfig ? (
        <motion.div
          className="landing-collage-motion"
          animate={{
            x: motionConfig.x ?? 0,
            y: motionConfig.y ?? 0,
            rotate: motionConfig.rotate ?? 0
          }}
          transition={{
            duration: motionConfig.duration,
            delay: motionConfig.delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
          }}
        >
          {content}
        </motion.div>
      ) : (
        <div className="landing-collage-motion">{content}</div>
      )}
    </div>
  );
}
