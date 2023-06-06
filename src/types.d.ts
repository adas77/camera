type Move =
  | "left"
  | "right"
  | "up"
  | "down"
  | "front"
  | "back"
  | "rotX"
  | "rotY"
  | "rotZ"
  | "rotXneg"
  | "rotYneg"
  | "rotZneg"
  | "zoomIn"
  | "zoomOut";

type Point = {
  x: number;
  y: number;
  z: number;
};

type Point2D = {
  x: number;
  y: number;
};

type Wall = {
  a: Point;
  b: Point;
  c: Point;
  d: Point;
};

type Data = {
  rects: Point[][];
  label: string;
};

type Sphere = {
  center: Point;
  radius: number;
};

type SphereLight = {
  pos: Point;
  ambient: number;
  diffuse: number;
  specular: number;
};

type View = "painted" | "painted2" | "mesh" | "sphere" | "flat";

type Color = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

type FrameBuffer = {
  data: Uint32Array;
  width: number;
  height: number;
};

type PhongParams = {
  ka: number;
  kd: number;
  ks: number;
  ia: number[];
  id: number[];
  is: number[];
  alpha: number;
  m: number[];
  rad: number;
};
