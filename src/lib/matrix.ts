import { Unit, cos, matrix, multiply, sin, unit } from "mathjs";
import { ANGLE_DEG, E, JUMP } from "../consts";

export function tr(
  point: Point,
  move: Move,
  jump = JUMP,
  angle = ANGLE_DEG
): Point {
  const ANGLE_POS: Unit = unit(angle, "deg");
  const ANGLE_NEG: Unit = unit(-angle, "deg");

  const p = matrix([point.x, point.y, point.z, 1]);
  const base = matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);

  switch (move) {
    case "left":
      base.set([0, 3], jump);
      break;

    case "right":
      base.set([0, 3], -jump);
      break;

    case "up":
      base.set([2, 3], -jump);
      break;

    case "down":
      base.set([2, 3], jump);
      break;

    case "front":
      base.set([1, 3], -jump);
      break;

    case "back":
      base.set([1, 3], jump);
      break;

    case "rotX":
      base.set([1, 1], cos(ANGLE_POS));
      base.set([1, 2], sin(ANGLE_POS));
      base.set([2, 1], -sin(ANGLE_POS));
      base.set([2, 2], cos(ANGLE_POS));
      break;
    case "rotY":
      base.set([0, 0], cos(ANGLE_POS));
      base.set([0, 2], -sin(ANGLE_POS));
      base.set([2, 0], sin(ANGLE_POS));
      base.set([2, 2], cos(ANGLE_POS));
      break;
    case "rotZ":
      base.set([0, 0], cos(ANGLE_POS));
      base.set([0, 1], sin(ANGLE_POS));
      base.set([1, 0], -sin(ANGLE_POS));
      base.set([1, 1], cos(ANGLE_POS));
      break;
    case "rotXneg":
      base.set([1, 1], cos(ANGLE_NEG));
      base.set([1, 2], sin(ANGLE_NEG));
      base.set([2, 1], -sin(ANGLE_NEG));
      base.set([2, 2], cos(ANGLE_NEG));
      break;
    case "rotYneg":
      base.set([0, 0], cos(ANGLE_NEG));
      base.set([0, 2], -sin(ANGLE_NEG));
      base.set([2, 0], sin(ANGLE_NEG));
      base.set([2, 2], cos(ANGLE_NEG));
      break;
    case "rotZneg":
      base.set([0, 0], cos(ANGLE_NEG));
      base.set([0, 1], sin(ANGLE_NEG));
      base.set([1, 0], -sin(ANGLE_NEG));
      base.set([1, 1], cos(ANGLE_NEG));
      break;
  }

  const mul = multiply(base, p);
  const res: Point = {
    x: mul.get([0]),
    y: mul.get([1]),
    z: mul.get([2]),
  };

  return res;
}

export function proj(p: Point, d: number): Point2D {
  // const depth = d > 0 ? d : E;
  // const projScale = depth / (depth + p.z)
  // const p2d: Point2D = {
  //     x: window.innerWidth / 2 + projScale * p.x,
  //     y: window.innerHeight / 2 + projScale * p.y,
  // }
  // return p2d

  // const depth = d > 0 ? d : E;
  const Z = p.z > 0 ? p.z : E;
  const f = d / Z;
  const p2d: Point2D = {
    x: window.innerWidth / 2 + f * p.x,
    y: window.innerHeight / 2 + f * p.y,
  };

  return p2d;
}
