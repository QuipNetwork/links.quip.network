import type { PatternConfig } from "../types";
import { noiseP } from "../math";
import { rasterLine, setCell, type Grid } from "../grid";

// Finance (alt) — a live ticker line: a layered random walk (trend + mid swings +
// fine jitter) that scrolls right→left like a real-time price, with a faded area
// fill under the curve.
export function generateTicker(g: Grid, cfg: PatternConfig, t: number): void {
  const speed = 0.5 + cfg.p4 * 1.2;
  const scroll = t * speed;
  // Multi-octave price walk: slow trend + swings + faster jagged moves, summed so
  // peaks and valleys vary in height and steepness (not a uniform wave).
  const priceAt = (pos: number) => {
    const a = noiseP(pos * 0.022, 3.1); // slow trend (moves the baseline up/down)
    const b = noiseP(pos * 0.075, 17.7); // swings
    const c = noiseP(pos * 0.19, 41.3); // faster moves
    const d = noiseP(pos * 0.46, 71.9); // jagged ticks
    const p = 0.5 + (a - 0.5) * 0.55 + (b - 0.5) * 0.52 + (c - 0.5) * 0.4 + (d - 0.5) * 0.28;
    return Math.min(0.95, Math.max(0.05, p));
  };
  // Sparse samples connected by straight segments → sharp, angular vertices.
  const step = 5;
  const sy: number[] = [];
  const n = Math.ceil(g.cols / step) + 1;
  for (let i = 0; i <= n; i++) sy[i] = Math.round(g.rows * (1 - priceAt(i * step + scroll)));
  // light area fill under the polyline (interpolated per column)
  for (let x = 0; x < g.cols; x++) {
    const i = Math.floor(x / step);
    const f = (x - i * step) / step;
    const y = Math.round(sy[i] + (sy[i + 1] - sy[i]) * f);
    for (let yy = y + 1; yy < g.rows; yy++) setCell(g, x, yy, 1, 0.3);
  }
  // angular 2px dark line on top
  for (let i = 0; i * step < g.cols; i++) {
    const x0 = i * step, x1 = Math.min((i + 1) * step, g.cols - 1);
    rasterLine(g, x0, sy[i], x1, sy[i + 1], 1);
    rasterLine(g, x0, sy[i] + 1, x1, sy[i + 1] + 1, 1);
  }
}
