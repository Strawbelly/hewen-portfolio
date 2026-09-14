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
  // BACK — journey peeking at the right, tucked beneath the editor
  journey: {
    x: 78,
    y: 30,
    width: 34,
    height: 420,
    rotation: 0,
    zIndex: 42,
  },

  // BACK / MID — editor extending through lower-right
  experience: {
    x: 46,
    y: 70,
    width: 36,
    height: 420,
    rotation: 0,
    zIndex: 41,
  },

  // FRONT — primary Open dialog remains the desktop focal point
  projects: {
    x: 33,
    y: 4,
    width: 50,
    height: 600,
    rotation: 0,
    zIndex: 40,
  },

  // BACK / MID — notepad peeking from the left
  about: {
    x: 10,
    y: 12,
    width: 20,
    height: 248,
    rotation: 0,
    zIndex: 34,
  },

  // FRONT — system dialog
  contact: {
    x: 17,
    y: 74,
    width: 23,
    height: 280,
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

  collages: {
    x: 26,
    y: 12,
    width: 48,
    height: 520,
    rotation: 0,
    zIndex: 51,
  },
} satisfies Record<string, MainWorldWindowLayout>;
