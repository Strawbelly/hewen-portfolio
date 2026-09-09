import type { TaskbarWindowId } from "@/features/desktop/taskbarItems";

export const windowMinimumSizes: Record<TaskbarWindowId, { width: number; height: number }> = {
  journey: { width: 320, height: 240 },
  experience: { width: 380, height: 300 },
  projects: { width: 480, height: 360 },
  about: { width: 300, height: 240 },
  contact: { width: 320, height: 280 },
  collages: { width: 360, height: 300 },
  projectPreview: { width: 380, height: 300 },
};

type Bounds = { left: number; top: number; right: number; bottom: number };

/** Viewport coordinates; available desktop space takes priority on small screens. */
export function constrainWindowResize(
  rect: { left: number; top: number; width: number; height: number },
  bounds: Bounds,
  minimum: { width: number; height: number },
) {
  const minWidth = Math.min(minimum.width, Math.max(0, bounds.right - bounds.left));
  const minHeight = Math.min(minimum.height, Math.max(0, bounds.bottom - bounds.top));
  const left = Math.max(bounds.left, Math.min(rect.left, bounds.right - minWidth));
  const top = Math.max(bounds.top, Math.min(rect.top, bounds.bottom - minHeight));
  return {
    left,
    top,
    width: Math.max(minWidth, Math.min(rect.width, bounds.right - left)),
    height: Math.max(minHeight, Math.min(rect.height, bounds.bottom - top)),
  };
}
