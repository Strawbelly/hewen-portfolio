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

export type CollageMotion = {
  x?: number;
  y?: number;
  rotate?: number;
  duration: number;
  delay?: number;
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
    y: 538,
    width: 130,
    rotation: 0,
    zIndex: 1
  },
  loading: {
    x: 225,
    y: 625,
    width: 440,
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

export const desktopMotion: Partial<Record<keyof typeof desktopLayout, CollageMotion>> = {
  errorStack: {
    y: 2.5,
    duration: 9.2,
    delay: 0.2
  },
  calendar: {
    y: -12,
    rotate: 2,
    duration: 5.1,
    delay: 0.35
  },
  newJess: {
    y: 8,
    rotate: -1.5,
    duration: 6.1,
    delay: 0.8
  },
  cursor: {
    x: 3,
    y: -5,
    duration: 4.7,
    delay: 1.1
  },
  phone: {
    x: 4,
    y: -10,
    rotate: 0.7,
    duration: 6.4,
    delay: 0.15
  },
  music: {
    x: 3.5,
    y: -11,
    rotate: 1,
    duration: 5.3,
    delay: 0.6
  },
  cd: {
    y: 6,
    rotate: -0.5,
    duration: 8.2,
    delay: 0.45
  },
  camera: {
    y: -8,
    rotate: 0.8,
    duration: 7.1,
    delay: 0.95
  },
  folder: {
    y: 9,
    rotate: 1.5,
    duration: 5.7,
    delay: 0.25
  }
};
