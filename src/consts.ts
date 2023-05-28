export const JUMP: number = 10;
export const ANGLE_DEG: number = 2;
export const DEPTH: number = 400;
export const DEPTH_JUMP: number = 10;
export const E: number = 0.001;
export const SCREEN = {
  W: window.innerWidth / 4,
  H: window.innerHeight / 4,
};
export const SPHERE_SIZE = {
  W: Math.floor(SCREEN.W / 3),
  H: Math.floor(SCREEN.H / 3),
};
export const SPHERE_DATA: Sphere = {
  center: { x: SPHERE_SIZE.W / 2, y: SPHERE_SIZE.H / 2, z: 0 },
  radius: Math.min(SPHERE_SIZE.W, SPHERE_SIZE.H) / 4,
};

export const SPHERE_LIGHT: SphereLight = {
  pos: { x: SPHERE_SIZE.W / 2, y: SPHERE_SIZE.H / 2, z: -100 },
  ambient: 0.9,
  diffuse: 0.7,
  specular: 0.8,
};

export const COLOR = "green";
export const COLOR_STROKE = "black";
