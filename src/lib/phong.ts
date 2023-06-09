import { add, cos, dot, multiply, sin, sqrt, subtract } from "mathjs";

const COL = 0xff;
const color = ({ r, g, b, a = 255 }: Color): number => {
  r = Math.min(Math.max(r, 0), 255);
  g = Math.min(Math.max(g, 0), 255);
  b = Math.min(Math.max(b, 0), 255);
  a = Math.min(Math.max(a, 0), 255);
  let abgr =
    ((a & COL) << 24) | ((b & COL) << 16) | ((g & COL) << 8) | (r & COL);
  return abgr;
};

const setPixel = (
  { data, width, height }: FrameBuffer,
  x: number,
  y: number,
  argb: number
): void => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  data[Math.floor(y) * width + Math.floor(x)] = argb;
};

export function drawPhong(
  ctx: CanvasRenderingContext2D,
  phongParams: PhongParams,
  flat?: boolean
): void {
  const width = 200;
  const height = 200;
  const frameBuffer: FrameBuffer = {
    data: new Uint32Array(width * height),
    width,
    height,
  };

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let x = ((i - width / 2) / width) * 2;
      let y = ((j - height / 2) / height) * 2;
      let distance = x ** 2 + y ** 2;
      if (distance < phongParams.rad ** 2) {
        let z = Math.sqrt(phongParams.rad ** 2 - distance);
        let Lm = subtract(phongParams.m, [x, y, z]);

        let LmMagnitude = sqrt(Lm[0] ** 2 + Lm[1] ** 2 + Lm[2] ** 2);
        Lm = multiply(1 / LmMagnitude, Lm);

        let N = [x / phongParams.rad, y / phongParams.rad, z / phongParams.rad];
        if (flat) {
          let yaw = Math.atan2(N[1], N[2]);
          let pitch = Math.atan2(N[0], sqrt(N[1] ** 2 + N[2] ** 2));
          let steps = 3;
          yaw = Math.round(yaw * steps) / steps;
          pitch = Math.round(pitch * steps) / steps;
          let xzLen = cos(pitch);
          N = [xzLen * sin(-yaw), sin(pitch), xzLen * cos(-yaw)];
          N = multiply(1 / sqrt(N[0] ** 2 + N[1] ** 2 + N[2] ** 2), N);
        }

        let rgb: number[] = [0, 0, 0];

        let ambient = multiply(phongParams.ka, phongParams.ia);
        let diffuse = multiply(
          phongParams.id,
          Math.max(multiply(phongParams.kd, dot(Lm, N)), 0)
        );

        let Rm = subtract(multiply(2, multiply(multiply(Lm, N), N)), Lm);
        let specular = multiply(
          phongParams.is,
          phongParams.ks * Math.max(Rm[2], 0) ** phongParams.alpha
        );

        rgb = add(ambient, rgb);
        rgb = add(diffuse, rgb);
        rgb = add(specular, rgb);

        setPixel(frameBuffer, i, j, color({ r: rgb[0], g: rgb[1], b: rgb[2] }));
      } else {
        setPixel(frameBuffer, i, j, COL);
      }
    }
  }

  var iData = new ImageData(
    new Uint8ClampedArray(frameBuffer.data.buffer),
    frameBuffer.width,
    frameBuffer.height
  );
  ctx.putImageData(
    iData,
    (ctx.canvas.width - frameBuffer.width) / 2,
    (ctx.canvas.height - frameBuffer.height) / 2
  );
}
