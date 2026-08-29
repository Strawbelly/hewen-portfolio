export const DESIGN_WIDTH = 1648;
export const DESIGN_HEIGHT = 866;

export type CollageLayoutItem = {
  x: number;
  y: number;
  width: number;
  height?: number;
  rotation: number;
  zIndex: number;
  scale?: number;
  transformOrigin?: string;
};

export const desktopLayout = {
  errorStack: {
    x: -70,
    y: 240,
    width: 490,
    rotation: 0,
    zIndex: 1
  },
  calendar: {
    x: 320,
    y: 282,
    width: 145,
    rotation: 11,
    zIndex: 8
  },
  newJess: {
    x: 315,
    y: 335,
    width: 335,
    rotation: 0,
    zIndex: 4
  },
  cursor: {
    x: 460,
    y: 532,
    width: 130,
    rotation: 0,
    zIndex: 1
  },
  loading: {
    x: 220,
    y: 595,
    width: 480,
    rotation: 0,
    zIndex: 2
  },
  phone: {
    x: 620,
    y: 100,
    width: 330,
    rotation: 14,
    zIndex: 20,
    scale: 1.125,
    transformOrigin: "center 46%"
  },
  music: {
    x: 940,
    y: 425,
    width: 100,
    rotation: 0,
    zIndex: 9
  },
  cd: {
    x: 810,
    y: 525,
    width: 430,
    rotation: -15,
    zIndex: 3
  },
  camera: {
    x: 1080,
    y: 352,
    width: 417,
    rotation: -9,
    zIndex: 10
  },
  folder: {
    x: 1338,
    y: 558,
    width: 145,
    rotation: 16,
    zIndex: 12
  }
} satisfies Record<string, CollageLayoutItem>;
