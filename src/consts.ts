export const JUMP: number = 10;
export const ANGLE_DEG: number = 2;
export const DEPTH: number = 400;
export const DEPTH_JUMP: number = 10;
export const E: number = 0.001;
export const SCREEN = {
  W: window.innerWidth,
  H: window.innerHeight,
};

export const COLOR = "magenta";
export const COLOR_STROKE = "black";

export const phongParams1: PhongParams = {
  ka: 0.2,
  kd: 0.4,
  ks: 0.5,
  ia: [255, 0, 255],
  id: [255, 0, 255],
  is: [0, 0, 0],
  alpha: 64,
  m: [1, 4, 3],
  rad: 1.0,
  label: "szkło",
};

export const phongParams2: PhongParams = {
  ka: 0.2,
  kd: 0.4,
  ks: 0.5,
  ia: [155, 155, 250],
  id: [155, 155, 250],
  is: [0, 0, 0],
  alpha: 64,
  m: [1, 4, 1],
  rad: 1.0,
  label: "nwm2",
};

export const phongParams3: PhongParams = {
  ka: 0.2,
  kd: 0.4,
  ks: 0.5,
  ia: [250, 150, 20],
  id: [240, 140, 15],
  is: [255, 255, 255],
  alpha: 64,
  m: [1, 4, 2],
  rad: 1.0,
  label: "miedź",
};

export const phongParams4: PhongParams = {
  ka: 0.2,
  kd: 0.4,
  ks: 0.5,
  ia: [15, 0, 255],
  id: [20, 10, 245],
  is: [0, 0, 0],
  alpha: 64,
  m: [1, 4, 6],
  rad: 1.0,
  label: "nwm",
};
