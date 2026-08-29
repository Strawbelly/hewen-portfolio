import type { CSSProperties, ReactNode } from "react";
import type { CollageLayoutItem } from "@/components/landing/desktopLayout";

type CollageItemProps = {
  item: CollageLayoutItem;
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

export function CollageItem({ item, className, children }: CollageItemProps) {
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
      {children}
    </div>
  );
}
