import { randomInt } from "mathjs";

export function rand1(rectsNum: number, maxCord: number): Point[][] {
  const rects: Point[][] = [];
  for (let i = 0; i < rectsNum; i++) {
    const x1 = randomInt(0, maxCord);
    const x2 = randomInt(x1, x1 + maxCord);

    const y1 = randomInt(x2, x2 + maxCord);
    const y2 = randomInt(y1, y1 + maxCord);

    const z1 = randomInt(y2, y2 + maxCord);
    const z2 = randomInt(z1, z1 + maxCord);

    create(rects, x1, x2, y1, y2, z1, z2);
  }
  return rects;
}

export function rand2(rectsNum: number, maxCord: number): Point[][] {
  const rects: Point[][] = [];
  for (let i = 0; i < rectsNum; i++) {
    const x1 = randomInt(0, maxCord);
    const x2 = randomInt(x1, x1 + maxCord);

    const y1 = randomInt(0, maxCord);
    const y2 = randomInt(y1, y1 + maxCord);

    const z1 = randomInt(0, maxCord);
    const z2 = randomInt(z1, z1 + maxCord);

    create(rects, x1, x2, y1, y2, z1, z2);
  }
  return rects;
}

export function grow(rectsNum: number): Point[][] {
  const rects: Point[][] = [];
  const X = 10;
  const Y = 30;
  const Z = 50;
  const J = 4;
  for (let i = 0; i < rectsNum; i++) {
    const x1 = (i + 1) * J * X;
    const x2 = (i + 1) * J * 2 * X;
    const y1 = (i + 1) * J * Y;
    const y2 = (i + 1) * J * 2 * Y;
    const z1 = (i + 1) * J * Z;
    const z2 = (i + 1) * J * 2 * Z;
    create(rects, x1, x2, y1, y2, z1, z2);
  }
  return rects;
}

export function basic(
  iter = 15,
  space = 31,
  len = 3,
  x = 5,
  y = 11,
  z = 23
): Point[][] {
  const rects: Point[][] = [];

  let x1, x2, y1, y2, z1, z2;
  x1 = space;
  y1 = space;
  z1 = space;

  for (let i = 0; i < iter; i++) {
    for (let i = 0; i < len; i++) {
      x1 += space;
      x2 = x1 + x;
      y2 = y1 + y;
      z2 = z1 + z;
      create(rects, x1, x2, y1, y2, z1, z2);
    }

    for (let i = 0; i < len; i++) {
      y1 += space;
      x2 = x1 + x;
      y2 = y1 + y;
      z2 = z1 + z;
      create(rects, x1, x2, y1, y2, z1, z2);
    }

    for (let i = 0; i < len; i++) {
      z1 += space;
      x2 = x1 + x;
      y2 = y1 + y;
      z2 = z1 + z;
      create(rects, x1, x2, y1, y2, z1, z2);
    }
  }

  return rects;
}

function create(
  rects: Point[][],
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  z1: number,
  z2: number
) {
  rects.push([
    { x: x1, y: y2, z: z1 },
    { x: x2, y: y2, z: z1 },
    { x: x2, y: y2, z: z2 },
    { x: x1, y: y2, z: z2 },
    { x: x1, y: y1, z: z1 },
    { x: x2, y: y1, z: z1 },
    { x: x2, y: y1, z: z2 },
    { x: x1, y: y1, z: z2 },
  ]);
}
