export type MainWorldWindowLayout = {
  /** Horizontal position as a percentage of the pile canvas. */
  x: number;
  /** Vertical position as a percentage of the pile canvas. */
  y: number;
  /** Width as a percentage of the pile canvas. */
  width: number;
  /** Fixed desktop height in pixels. */
  height: number;
  rotation: number;
  zIndex: number;
};

export const mainWorldLayout = {
  // BACK — large image viewer
  beforeCode: {
    x: 3,
    y: 85,
    width: 32,
    height: 630,
    rotation: 0,
    zIndex: 6,
  },

  // BACK — journey peeking from upper-right
  journey: {
    x: 54,
    y: 46,
    width: 34,
    height: 420,
    rotation: 0,
    zIndex: 9,
  },

  // BACK / MID — editor extending through lower-right
  experience: {
    x: 60,
    y: 85,
    width: 36,
    height: 420,
    rotation: 0,
    zIndex: 13,
  },

  // MIDDLE — primary Open dialog
  projects: {
    x: 23,
    y: 6,
    width: 50,
    height: 600,
    rotation: 0,
    zIndex: 25,
  },

  // FRONT — small but still substantial
  about: {
    x: 8,
    y: 53,
    width: 20,
    height: 248,
    rotation: 0,
    zIndex: 34,
  },

  // FRONT — system dialog
  contact: {
    x: 40,
    y: 64,
    width: 18,
    height: 180,
    rotation: 0,
    zIndex: 38,
  },

  // FRONT — context menu crossing Projects edge
  contextMenu: {
    x: 60,
    y: 30,
    width: 16,
    height: 175,
    rotation: 0,
    zIndex: 32,
  },

  // opened project should dominate
  projectPreview: {
    x: 23,
    y: 9,
    width: 58,
    height: 500,
    rotation: 0,
    zIndex: 50,
  },
} satisfies Record<string, MainWorldWindowLayout>;