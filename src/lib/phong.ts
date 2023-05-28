import { SCREEN } from "../consts";

const COLOR = "#FF0000";

export function drawSphere(ctx: CanvasRenderingContext2D) {
  const radius = Math.min(SCREEN.W, SCREEN.H) / 2;
  const centerX = SCREEN.W / 2;
  const centerY = SCREEN.H / 2;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = COLOR;
  ctx.fill();
  ctx.closePath();
}

export function drawPhongSphere(
  ctx: CanvasRenderingContext2D,
  sphere: Sphere,
  light: SphereLight
) {
  for (let x = 0; x < SCREEN.W; x++) {
    for (let y = 0; y < SCREEN.H; y++) {
      const point: Point = { x, y, z: calculateZOnSphere(x, y, sphere) };
      const color = calculatePhongColor(point, sphere, light);
      drawPixel(ctx, x, y, color);
    }
  }
}

function calculateZOnSphere(x: number, y: number, sphere: Sphere): number {
  const { center, radius } = sphere;
  const dx = x - center.x;
  const dy = y - center.y;
  const dz = Math.sqrt(radius ** 2 - dx ** 2 - dy ** 2);
  return center.z + dz;
}

function calculatePhongColor(
  point: Point,
  sphere: Sphere,
  light: SphereLight
): string {
  const { center } = sphere;
  const { pos, ambient, diffuse, specular } = light;

  // Calculate the normal vector at the point on the sphere
  const normal: Point = normalizeVector(subtractVectors(point, center));

  const lightDirection: Point = normalizeVector(subtractVectors(pos, point));
  const ambientColor = multiplyColor(COLOR, ambient);
  const diffuseFactor = Math.max(dotProduct(normal, lightDirection), 0);
  const diffuseColor = multiplyColor(COLOR, diffuse * diffuseFactor);

  const reflectionDirection: Point = normalizeVector(
    subtractVectors(
      multiplyVector(normal, 2 * dotProduct(normal, lightDirection)),
      lightDirection
    )
  );

  const viewDirection: Point = normalizeVector(
    subtractVectors({ x: SCREEN.W / 2, y: SCREEN.H / 2, z: -100 }, point)
  );

  const specularFactor = Math.pow(
    Math.max(dotProduct(reflectionDirection, viewDirection), 0),
    32
  );
  const specularColor = multiplyColor("#FFFFFF", specular * specularFactor);

  const finalColor = addColors(
    addColors(ambientColor, diffuseColor),
    specularColor
  );

  return finalColor;
}

function normalizeVector(vector: Point): Point {
  const { x, y, z } = vector;
  const length = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  return { x: x / length, y: y / length, z: z / length };
}

function subtractVectors(a: Point, b: Point): Point {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function multiplyVector(vector: Point, scalar: number): Point {
  return { x: vector.x * scalar, y: vector.y * scalar, z: vector.z * scalar };
}

function dotProduct(a: Point, b: Point): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function multiplyColor(color: string, scalar: number): string {
  const r = parseInt(color.substring(2, 4), 16);
  const g = parseInt(color.substring(3, 6), 16);
  const b = parseInt(color.substring(6, 8), 16);
  console.log(r, g, b);
  const multipliedR = Math.round(r * scalar);
  const multipliedG = Math.round(g * scalar);
  const multipliedB = Math.round(b * scalar);
  return `#${multipliedR.toString(16)}${multipliedG.toString(
    16
  )}${multipliedB.toString(16)}`;
}

function addColors(color1: string, color2: string): string {
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  const addedR = Math.min(r1 + r2, 255);
  const addedG = Math.min(g1 + g2, 255);
  const addedB = Math.min(b1 + b2, 255);
  return `#${addedR.toString(16)}${addedG.toString(16)}${addedB.toString(16)}`;
}

function drawPixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}
