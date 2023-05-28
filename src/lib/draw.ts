import { DEPTH, DEPTH_JUMP, SCREEN } from "../consts";
import { proj, tr } from "./matrix";
import { drawPhongSphere } from "./phong";

export function rerender(
  ctx: CanvasRenderingContext2D,
  rects: Point[][],
  view: View,
  depth: number
) {
  ctx.beginPath();
  ctx.clearRect(0, 0, SCREEN.W, SCREEN.H);
  // ctx.strokeStyle = "orange";
  // ctx.fillStyle = COLOR;

  switch (view) {
    case "mesh":
      const walls: Wall[] = [];
      rects.forEach((rect) => {
        walls.push({ a: rect[0], b: rect[1], c: rect[2], d: rect[3] });
        walls.push({ a: rect[4], b: rect[5], c: rect[6], d: rect[7] });
        walls.push({ a: rect[0], b: rect[4], c: rect[5], d: rect[1] });
        walls.push({ a: rect[3], b: rect[7], c: rect[6], d: rect[2] });
        walls.push({ a: rect[0], b: rect[3], c: rect[7], d: rect[4] });
        walls.push({ a: rect[1], b: rect[2], c: rect[6], d: rect[5] });
      });
      walls.sort((a, b) => countCenter(b) - countCenter(a));
      connectWalls(walls, ctx, depth);
      break;

    case "painted":
      rects.forEach((rect) => drawRect(rect, ctx, depth));
      break;

    case "sphere":
      const sphere: Sphere = {
        center: { x: SCREEN.W / 2, y: SCREEN.H / 2, z: 0 },
        radius: Math.min(SCREEN.W, SCREEN.H) / 2,
      };

      const light: SphereLight = {
        pos: { x: SCREEN.W / 2, y: SCREEN.H / 2, z: -100 },
        ambient: 0.2,
        diffuse: 0.8,
        specular: 0.5,
      };
      drawPhongSphere(ctx, sphere, light);
      break;
    default:
      break;
  }

  drawAxis(ctx, depth);
}

export function handleOnKey(
  key: string,
  rects: Point[][],
  startpos: Point[][],
  setDepth: React.Dispatch<React.SetStateAction<number>>,
  setView: React.Dispatch<React.SetStateAction<View>>
) {
  switch (key) {
    case " ":
      setView((prev) => {
        if (prev === "painted") return "mesh";
        if (prev === "mesh") return "sphere";
        if (prev === "sphere") return "painted";
        return "painted";
      });
      break;

    case "m":
      window.location.reload();
      break;

    case "-":
      setDepth(DEPTH);
      break;

    case "0":
      return startpos;

    case "u":
      setDepth((prev) => prev + DEPTH_JUMP);
      break;

    case "i":
      setDepth((prev) => {
        if (prev <= DEPTH_JUMP) return DEPTH_JUMP;
        else return Math.round(prev - DEPTH_JUMP);
      });
      break;

    case "a":
      return nextPos(rects, "left");

    case "d":
      return nextPos(rects, "right");

    case "w":
      return nextPos(rects, "up");

    case "s":
      return nextPos(rects, "down");

    case "f":
      return nextPos(rects, "front");

    case "b":
      return nextPos(rects, "back");

    case "x":
      return nextPos(rects, "rotX");

    case "y":
      return nextPos(rects, "rotY");

    case "z":
      return nextPos(rects, "rotZ");

    case "1":
      return nextPos(rects, "rotXneg");

    case "2":
      return nextPos(rects, "rotYneg");

    case "3":
      return nextPos(rects, "rotZneg");
  }
}

function nextPos(rects: Point[][], move: Move): Point[][] {
  const newPositions: Point[][] = rects.map((r) => r.map((p) => tr(p, move)));
  return newPositions;
}

function drawRect(rect: Point[], ctx: CanvasRenderingContext2D, depth: number) {
  const projected: Point2D[] = rect.map((r) => proj(r, depth));

  for (let i = 0; i < 4; i++) {
    connect(i, (i + 1) % 4, projected, ctx);
    connect(i + 4, ((i + 1) % 4) + 4, projected, ctx);
    connect(i, i + 4, projected, ctx);
  }
}

function drawRect2(
  rect: Point[],
  ctx: CanvasRenderingContext2D,
  depth: number
) {
  ctx.fillStyle = "yellow";

  const walls: Wall[] = [
    { a: rect[0], b: rect[1], c: rect[2], d: rect[3] },
    { a: rect[4], b: rect[5], c: rect[6], d: rect[7] },
    { a: rect[0], b: rect[4], c: rect[5], d: rect[1] },
    { a: rect[3], b: rect[7], c: rect[6], d: rect[2] },
    { a: rect[0], b: rect[3], c: rect[7], d: rect[4] },
    { a: rect[1], b: rect[2], c: rect[6], d: rect[5] },
  ];

  walls.sort((a, b) => countCenter(b) - countCenter(a));
  const walls_ = walls.slice(-3);
  connectWalls(walls_, ctx, depth);
}

function countCenter(w: Wall): number {
  const x = w.a.x + w.b.x + w.c.x + w.d.x;
  const y = w.a.y + w.b.y + w.c.y + w.d.y;
  const z = w.a.z + w.b.z + w.c.z + w.d.z;

  const p3d: Point = { x: x / 3, y: y / 3, z: z / 3 };
  const center = Math.sqrt(
    Math.pow(p3d.x, 2) + Math.pow(p3d.y, 2) + Math.pow(p3d.z, 2)
  );

  return center;
}

function drawAxis(ctx: CanvasRenderingContext2D, depth: number) {
  const startpos: Point2D = proj(
    {
      x: 0,
      y: 0,
      z: 0,
    },
    depth
  );

  const x: Point2D = proj(
    {
      x: SCREEN.W,
      y: 0,
      z: 0,
    },
    depth
  );
  const y: Point2D = proj(
    {
      x: 0,
      y: SCREEN.W,
      z: 0,
    },
    depth
  );
  // const z: Point2D = proj({
  //     x: 0,
  //     y: 0,
  //     z: window.innerWidth,
  // })

  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.moveTo(startpos.x, startpos.y);
  ctx.lineTo(x.x, x.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.moveTo(startpos.x, startpos.y);
  ctx.lineTo(y.x, y.y);
  ctx.stroke();
}

function connect(
  i: number,
  j: number,
  points: Point2D[],
  ctx: CanvasRenderingContext2D
) {
  const a = points[i];
  const b = points[j];
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function connectWalls(
  walls: Wall[],
  ctx: CanvasRenderingContext2D,
  depth: number
) {
  walls.forEach((w) => {
    ctx.beginPath();
    const a_ = proj(w.a, depth);
    const b_ = proj(w.b, depth);
    const c_ = proj(w.c, depth);
    const d_ = proj(w.d, depth);

    ctx.moveTo(a_.x, a_.y);

    ctx.lineTo(b_.x, b_.y);
    // ctx.stroke();
    ctx.fill();

    ctx.lineTo(c_.x, c_.y);
    // ctx.stroke();
    ctx.fill();

    ctx.lineTo(d_.x, d_.y);
    // ctx.stroke();
    ctx.fill();

    ctx.lineTo(a_.x, a_.y);
    ctx.stroke();
  });
  ctx.closePath();
}

export function getCtx(
  ref: React.RefObject<HTMLCanvasElement>
): CanvasRenderingContext2D {
  if (!ref.current) {
    throw new Error("canvas ref failed");
  }
  const ctx = ref.current.getContext("2d");
  if (!ctx) {
    throw new Error("2d ctx failed");
  }
  return ctx;
}
