export type MainWorldDecorationLayout = {
  filename: string;
  /** Intrinsic image ratio used to preserve the decoration's natural shape. */
  aspectRatio: string;
  /** Initial horizontal position as a percentage of the full desktop stage. */
  x: number;
  /** Initial vertical position as a percentage of the usable desktop stage. */
  y: number;
  /** Initial rendered width in pixels. */
  width: number;
  /** Initial clockwise rotation in degrees. */
  rotation: number;
  /** Initial stacking level; double-clicking still toggles front/back as before. */
  zIndex: number;
  /** Decorations remain hidden in the mobile layout unless explicitly enabled. */
  mobileVisible?: boolean;
};

export const mainWorldDecorationConfig: MainWorldDecorationLayout[] = [
  { filename: "decoration_01.png", aspectRatio: "897 / 786", x: 79, y: 13, width: 140, rotation: 18, zIndex: 100 },
  { filename: "decoration_02.png", aspectRatio: "2532 / 2031", x: 68, y: 66, width: 120, rotation: 0, zIndex: 100 },
  { filename: "decoration_03.png", aspectRatio: "447 / 465", x: 28, y: 53, width: 120, rotation: 0, zIndex: 100 },
  { filename: "decoration_04.png", aspectRatio: "371 / 475", x: 7.5, y: 40, width: 66, rotation: 0, zIndex: 100 },
  { filename: "decoration_05.png", aspectRatio: "350 / 1365", x: 12, y: 64, width: 60, rotation: 0, zIndex: 100 },
];
