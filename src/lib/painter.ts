import { proj } from "./matrix";

export function swapArray(Array: any, Swap1: number, Swap2: number): any {
  const temp = Array[Swap1];
  Array[Swap1] = Array[Swap2];
  Array[Swap2] = temp;
  return Array;
}

export function testVisibility(rect1: Wall, rect2: Wall, d: number): boolean {
  const rect1BoundingRect = getBoundingRect(rect1);
  const rect2BoundingRect = getBoundingRect(rect2);

  const rect1Projection = getProjection(rect1, d);
  const rect2Projection = getProjection(rect2, d);

  const observer: Point = { x: 0, y: 0, z: 0 };

  if (
    areRectanglesOverlapping(rect1BoundingRect, rect2BoundingRect) ||
    areRectanglesOverlapping(rect1Projection, rect2Projection) ||
    isCompletelyOnOppositeSide(rect2, observer, rect1) ||
    isCompletelyOnSameSide(rect1, observer, rect2)
  )
    return true;

  return false;
}

function getBoundingRect(rect: {
  a: Point2D;
  b: Point2D;
  c: Point2D;
  d: Point2D;
}): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} {
  const minX = Math.min(
    Number.MAX_VALUE,
    rect.a.x,
    rect.b.x,
    rect.c.x,
    rect.d.x
  );
  const minY = Math.min(
    Number.MAX_VALUE,
    rect.a.y,
    rect.b.y,
    rect.c.y,
    rect.d.y
  );
  const maxX = Math.max(
    Number.MIN_VALUE,
    rect.a.x,
    rect.b.x,
    rect.c.x,
    rect.d.x
  );
  const maxY = Math.max(
    Number.MIN_VALUE,
    rect.a.y,
    rect.b.y,
    rect.c.y,
    rect.d.y
  );

  return { minX, minY, maxX, maxY };
}

function areRectanglesOverlapping(
  rectangle1: { minX: number; minY: number; maxX: number; maxY: number },
  rectangle2: { minX: number; minY: number; maxX: number; maxY: number }
): boolean {
  return (
    rectangle1.minX <= rectangle2.maxX &&
    rectangle1.maxX >= rectangle2.minX &&
    rectangle1.minY <= rectangle2.maxY &&
    rectangle1.maxY >= rectangle2.minY
  );
}

function getProjection(
  rect: Wall,
  d: number
): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} {
  const projection = {
    a: proj(rect.a, d),
    b: proj(rect.b, d),
    c: proj(rect.c, d),
    d: proj(rect.d, d),
  };

  return getBoundingRect(projection);
}

function isCompletelyOnOppositeSide(
  poly: Wall,
  observer: Point,
  plane: Wall
): boolean {
  const planeNormal = calculatePlaneNormal(plane);

  const rectCenter = calculateRectangleCenter(poly);

  const vectorToObserver = {
    x: observer.x - rectCenter.x,
    y: observer.y - rectCenter.y,
    z: observer.z - rectCenter.z,
  };

  const dotProduct = dotProduct3D(vectorToObserver, planeNormal);

  return dotProduct > 0;
}

function isCompletelyOnSameSide(
  poly: Wall,
  observer: Point,
  plane: Wall
): boolean {
  const planeNormal = calculatePlaneNormal(plane);

  const rectCenter = calculateRectangleCenter(poly);

  const vectorToObserver = {
    x: observer.x - rectCenter.x,
    y: observer.y - rectCenter.y,
    z: observer.z - rectCenter.z,
  };

  const dotProduct = dotProduct3D(vectorToObserver, planeNormal);

  return dotProduct < 0;
}

function calculatePlaneNormal(plane: Wall): Point {
  const vectorAB = subtractPoints(plane.a, plane.b);
  const vectorAC = subtractPoints(plane.a, plane.c);

  return crossProduct3D(vectorAB, vectorAC);
}

function calculateRectangleCenter(rect: Wall): Point {
  const centerX = (rect.a.x + rect.b.x + rect.c.x + rect.d.x) / 4;
  const centerY = (rect.a.y + rect.b.y + rect.c.y + rect.d.y) / 4;
  const centerZ = (rect.a.z + rect.b.z + rect.c.z + rect.d.z) / 4;

  return { x: centerX, y: centerY, z: centerZ };
}

function subtractPoints(point1: Point, point2: Point): Point {
  return {
    x: point1.x - point2.x,
    y: point1.y - point2.y,
    z: point1.z - point2.z,
  };
}

function dotProduct3D(vector1: Point, vector2: Point): number {
  return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
}

function crossProduct3D(vector1: Point, vector2: Point): Point {
  return {
    x: vector1.y * vector2.z - vector1.z * vector2.y,
    y: vector1.z * vector2.x - vector1.x * vector2.z,
    z: vector1.x * vector2.y - vector1.y * vector2.x,
  };
}
