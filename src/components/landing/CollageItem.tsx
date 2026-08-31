"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import type { CollageLayoutItem, CollageMotion } from "@/components/landing/desktopLayout";

type CollageItemProps = {
  item: CollageLayoutItem;
  motionConfig?: CollageMotion;
  className?: string;
  children: ReactNode;
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

export function CollageItem({ item, motionConfig, className, children }: CollageItemProps) {
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
          {children}
        </motion.div>
      ) : (
        <div className="landing-collage-motion">{children}</div>
      )}
    </div>
  );
}
