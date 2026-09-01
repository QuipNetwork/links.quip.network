import type { PatternConfig } from "./types";
import { noise2 } from "./math";

// ─── Grid & symmetry ─────────────────────────────────────────────
export interface Grid {
  cols: number;
  rows: number;
  grid: Uint8Array;
  gridRaw: Float32Array;
}

export function isDiamondMode(cfg: PatternConfig): boolean {
  return !cfg.mixShapes && cfg.pixelShape === "diamond";
}

export function makeGrid(
  cfg: PatternConfig,
  width: number,
  height: number,
): Grid {
  const ps = cfg.pixelSize;
  const scale = cfg.radialSym ? Math.max(1, cfg.shapeScale) : 1;
  const cols = Math.max(1, Math.ceil((width / ps) * scale));
  const rows = Math.max(1, Math.ceil((height / ps) * scale));
  return {
    cols,
    rows,
    grid: new Uint8Array(cols * rows),
    gridRaw: new Float32Array(cols * rows),
  };
}

export function setCell(
  g: Grid,
  x: number,
  y: number,
  on: number,
  raw?: number,
): void {
  // Coordinates must be integers: a fractional x/y can alias onto a different (often
  // edge) cell because `y * cols + x` can land on an unrelated integer flat index.
  x = Math.round(x);
  y = Math.round(y);
  if (x >= 0 && x < g.cols && y >= 0 && y < g.rows) {
    g.grid[y * g.cols + x] = on ? 1 : 0;
    g.gridRaw[y * g.cols + x] = raw !== undefined ? raw : on ? 1 : 0;
  }
}

export function applySymmetry(
  g: Grid,
  cfg: PatternConfig,
  x: number,
  y: number,
  val: number,
  rawVal?: number,
): void {
  const raw = rawVal !== undefined ? rawVal : val ? 1 : 0;
  if (cfg.radialSym) {
    const cx = g.cols / 2,
      cy = g.rows / 2;
    for (let i = 0; i < cfg.radialRays; i++) {
      const a = ((Math.PI * 2) / cfg.radialRays) * i;
      const c = Math.cos(a),
        s = Math.sin(a);
      const dx = x - cx,
        dy = y - cy;
      setCell(
        g,
        Math.round(cx + dx * c - dy * s),
        Math.round(cy + dx * s + dy * c),
        val,
        raw,
      );
    }
  } else {
    setCell(g, x, y, val, raw);
    setCell(g, g.cols - 1 - x, y, val, raw);
    setCell(g, x, g.rows - 1 - y, val, raw);
    setCell(g, g.cols - 1 - x, g.rows - 1 - y, val, raw);
  }
}

// ─── Polar helpers for radial-symmetry generators ────────────────
export function polar(g: Grid, x: number, y: number): [number, number] {
  const cx = g.cols / 2,
    cy = g.rows / 2;
  const dx = x - cx,
    dy = y - cy;
  const r = Math.sqrt(dx * dx + dy * dy) / (Math.min(g.cols, g.rows) * 0.5);
  const ang = Math.atan2(dy, dx);
  return [r, ang];
}

export function foldAng(ang: number, rays: number): number {
  const step = Math.PI / rays;
  const a = ((ang % (step * 2)) + step * 2) % (step * 2);
  return a < step ? a : step * 2 - a;
}

export function cellTimeStretch(x: number, y: number, seed: number): number {
  return 0.65 + 0.7 * noise2(x * 0.13 + seed * 0.001, y * 0.17);
}

export function rasterLine(
  g: Grid,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  raw: number,
): void {
  let x = Math.round(x0), y = Math.round(y0);
  const xe = Math.round(x1), ye = Math.round(y1);
  const dx = Math.abs(xe - x), dy = -Math.abs(ye - y);
  const sx = x < xe ? 1 : -1, sy = y < ye ? 1 : -1;
  let err = dx + dy;
  // Loop is bounded to the exact segment length, so it cannot overrun the endpoint.
  const steps = Math.max(dx, -dy) + 1;
  for (let i = 0; i < steps; i++) {
    setCell(g, x, y, 1, raw);
    if (x === xe && y === ye) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x += sx; }
    if (e2 <= dx) { err += dx; y += sy; }
  }
}

export function fillDisc(
  g: Grid,
  cx: number,
  cy: number,
  r: number,
  raw: number,
): void {
  const ri = Math.round(r);
  for (let yy = -ri; yy <= ri; yy++) {
    for (let xx = -ri; xx <= ri; xx++) {
      if (xx * xx + yy * yy <= r * r) setCell(g, cx + xx, cy + yy, 1, raw);
    }
  }
}
