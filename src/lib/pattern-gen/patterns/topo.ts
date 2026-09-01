import type { PatternConfig } from "../types";
import { noiseP } from "../math";
import { setCell, type Grid } from "../grid";

export function generateTopo(g: Grid, cfg: PatternConfig, t: number): void {
  const { cols, rows } = g;
  const seed = cfg.seed * 0.001;
  const scale = (0.052 - cfg.p1 * 0.032) * (90 / Math.max(48, cols));
  const bands = 5 + Math.round(cfg.p2 * 10);
  const lineW = 0.045 + cfg.p3 * 0.085;
  const warp = 0.4 + cfg.p4 * 1.5;
  const drift = t * (0.1 + cfg.p5 * 0.34);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const sx = x * scale + seed;
      const sy = y * scale + seed * 1.7;
      const wx = noiseP(sx * 0.6 + drift, sy * 0.6 - drift * 0.5);
      const wy = noiseP(sx * 0.6 + 19.2, sy * 0.6 + 7.4 + drift * 0.3);
      const h = noiseP(sx + warp * wx, sy + warp * wy + drift * 0.15);
      const band = h * bands;
      const frac = band - Math.floor(band);
      const dist = Math.min(frac, 1 - frac);
      if (dist < lineW) setCell(g, x, y, 1, h);
    }
  }
}
