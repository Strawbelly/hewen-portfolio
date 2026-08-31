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
    x: 22,
    y: 65,
    width: 32,
    height: 630,
    rotation: 0,
    zIndex: 6,
  },

  // BACK — journey peeking from upper-right
  journey: {
    x: 64,
    y: 18,
    width: 34,
    height: 420,
    rotation: 0,
    zIndex: 9,
  },

  // BACK / MID — editor extending through lower-right
  experience: {
    x: 50,
    y: 50,
    width: 36,
    height: 420,
    rotation: 0,
    zIndex: 35,
  },

  // MIDDLE — primary Open dialog
  projects: {
    x: 33,
    y: 6,
    width: 50,
    height: 600,
    rotation: 0,
    zIndex: 25,
  },

  // FRONT — small but still substantial
  about: {
    x: 16,
    y: 30,
    width: 20,
    height: 248,
    rotation: 0,
    zIndex: 34,
  },

  // FRONT — system dialog
  contact: {
    x: 10,
    y: 72,
    width: 18,
    height: 180,
    rotation: 0,
    zIndex: 22,
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