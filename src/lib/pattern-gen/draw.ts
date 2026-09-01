export function drawPixel(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pw: number,
  shape: number,
): void {
  const x0 = Math.round(px),
    y0 = Math.round(py),
    s = Math.round(pw);
  switch (shape) {
    case 0: // Square
      ctx.fillRect(x0, y0, s, s);
      break;
    case 2: // Circle
      ctx.beginPath();
      ctx.arc(x0 + s / 2, y0 + s / 2, s / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 3: // Plus
      ctx.fillRect(x0 + s * 0.38, y0 - 1, s * 0.24, s + 2);
      ctx.fillRect(x0 - 1, y0 + s * 0.38, s + 2, s * 0.24);
      break;
  }
}
