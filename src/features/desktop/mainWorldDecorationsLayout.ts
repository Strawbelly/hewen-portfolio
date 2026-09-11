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
  { filename: "decoration_01.png", aspectRatio: "897 / 786", x: 78, y: 13, width: 160, rotation: 18, zIndex: 100 },
  { filename: "decoration_02.png", aspectRatio: "2532 / 2031", x: 83, y: 76, width: 130, rotation: 0, zIndex: 100 },
  { filename: "decoration_03.png", aspectRatio: "447 / 465", x: 14, y: 62, width: 120, rotation: 0, zIndex: 100 },
  { filename: "decoration_04.png", aspectRatio: "371 / 475", x: 27, y: 52, width: 66, rotation: 0, zIndex: 100 },
  { filename: "decoration_05.png", aspectRatio: "350 / 1365", x: 66, y: 42, width: 70, rotation: 0, zIndex: 100 },
];
