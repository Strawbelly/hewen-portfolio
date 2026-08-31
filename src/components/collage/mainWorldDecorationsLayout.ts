export type MainWorldDecorationLayout = {
  id: string;
  src: string;
  imageWidth: number;
  imageHeight: number;
  /** Initial horizontal position as a percentage of the full desktop stage. */
  x: number;
  /** Initial vertical position as a percentage of the usable desktop stage. */
  y: number;
  /** Initial rendered width in pixels. */
  width: number;
  /** Initial clockwise rotation in degrees. */
  rotation: number;
};

export const mainWorldDecorationsLayout: MainWorldDecorationLayout[] = [
  { id: "decoration-01", src: "/assets/main-world/decoration_01.png", imageWidth: 897, imageHeight: 786, x: 78, y: 13, width: 160, rotation: 18 },
  { id: "decoration-02", src: "/assets/main-world/decoration_02.png", imageWidth: 2532, imageHeight: 2031, x: 83, y: 76, width: 130, rotation: 0 },
  { id: "decoration-03", src: "/assets/main-world/decoration_03.png", imageWidth: 447, imageHeight: 465, x: 14, y: 62, width: 120, rotation: 0 },
  { id: "decoration-04", src: "/assets/main-world/decoration_04.png", imageWidth: 371, imageHeight: 475, x: 27, y: 52, width: 66, rotation: 0 },
];
