import type { PatternConfig, RenderRuntime } from "./types";
import { noise2, setNoiseSeed } from "./math";
import { CANVAS_SIZE, SHAPE_BY_ID, SHAPE_ID } from "./constants";
import { COLOR_SCHEMES } from "./colorSchemes";
import { isDiamondMode, makeGrid } from "./grid";
import { GENERATORS } from "./patterns";
import { computeLayerDepth, getPixelColor } from "./color";
import { drawPixel } from "./draw";

export function renderPattern(
  ctx: CanvasRenderingContext2D,
  cfg: PatternConfig,
  runtime: RenderRuntime,
  width: number = CANVAS_SIZE,
  height: number = width,
): void {
  setNoiseSeed(cfg.seed);

  const g = makeGrid(cfg, width, height);
  GENERATORS[cfg.mode](g, cfg, runtime.t);

  const cs = COLOR_SCHEMES[cfg.colorScheme];
  const layerDist = cs.layers ? computeLayerDepth(g) : null;

  if (cs.bg === "transparent" || cfg.transparentBg) {
    ctx.clearRect(0, 0, width, height);
  } else {
    ctx.fillStyle = cs.bg;
    ctx.fillRect(0, 0, width, height);
  }

  const ps = cfg.pixelSize;
  const sp = cfg.spacing;
  const zoom = cfg.shapeScale;
  const circR = Math.min(width, height) / 2;
  const gridCX = (g.cols * ps) / 2;
  const gridCY = isDiamondMode(cfg)
    ? (g.rows * ps) / 2 - height / 4
    : (g.rows * ps) / 2;

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-gridCX, -gridCY);

  function inCircle(cx: number, cy: number): boolean {
    if (!cfg.radialSym || !cfg.circleMask) return true;
    const dx = cx - gridCX,
      dy = cy - gridCY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > circR) return false;
    const fadeStart = circR * 0.65;
    if (dist > fadeStart) {
      const tt = (dist - fadeStart) / (circR - fadeStart);
      const keepProb = 1 - Math.pow(tt, 1.5);
      if (noise2(cx * 0.05 + cfg.seed * 0.001, cy * 0.05) > keepProb)
        return false;
    }
    return true;
  }

  const staticShapeId = SHAPE_ID[cfg.pixelShape];

  for (let y = 0; y < g.rows; y++) {
    for (let x = 0; x < g.cols; x++) {
      if (!g.grid[y * g.cols + x]) continue;

      let cellShape: number;
      if (cfg.mixShapes) {
        const nv = noise2(x * 0.2 + cfg.seed * 0.0001, y * 0.2);
        cellShape = SHAPE_ID[SHAPE_BY_ID[Math.floor(nv * SHAPE_BY_ID.length)]];
      } else {
        cellShape = staticShapeId;
      }

      if (cellShape === 1 && !cfg.mixShapes) {
        const rx = Math.max(1, ps / 2 - sp / 2);
        const ry = Math.max(1, ps - sp / 2);
        const cx = x * ps + (y % 2 === 1 ? ps / 2 : 0) + ps / 2;
        const cy = y * ps - height / 4;
        if (cy - ry > height) continue;
        if (!inCircle(cx, cy)) continue;
        ctx.fillStyle = getPixelColor(g, cfg, runtime.colorT, layerDist, x, y);
        ctx.beginPath();
        ctx.moveTo(cx, cy - ry);
        ctx.lineTo(cx + rx, cy);
        ctx.lineTo(cx, cy + ry);
        ctx.lineTo(cx - rx, cy);
        ctx.closePath();
        ctx.fill();
      } else if (cellShape === 1 && cfg.mixShapes) {
        const r = Math.max(1, ps / 2 - sp / 2);
        const cx = x * ps + ps / 2;
        const cy = y * ps + ps / 2;
        if (!inCircle(cx, cy)) continue;
        ctx.fillStyle = getPixelColor(g, cfg, runtime.colorT, layerDist, x, y);
        ctx.beginPath();
        ctx.moveTo(cx, cy - r);
        ctx.lineTo(cx + r, cy);
        ctx.lineTo(cx, cy + r);
        ctx.lineTo(cx - r, cy);
        ctx.closePath();
        ctx.fill();
      } else {
        const pw = Math.max(1, ps - sp);
        const px = x * ps + sp * 0.5;
        const py = y * ps + sp * 0.5;
        const cx = px + pw / 2,
          cy = py + pw / 2;
        if (!inCircle(cx, cy)) continue;
        ctx.fillStyle = getPixelColor(g, cfg, runtime.colorT, layerDist, x, y);
        drawPixel(ctx, px, py, pw, cellShape);
      }
    }
  }

  ctx.restore();
}
