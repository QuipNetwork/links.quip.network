import type { PatternConfig } from "../types";
import { setCell, type Grid } from "../grid";

export function generateMandala(g: Grid, cfg: PatternConfig, t: number): void {
  const cx = g.cols / 2,
    cy = g.rows / 2;
  const radial1 = 0.05 + cfg.p1 * (0.25 - 0.05);
  const radial2 = 0.03 + cfg.p2 * (0.15 - 0.03);
  const waves1 = 2 + cfg.p3 * (10 - 2);
  const waves2 = 1 + cfg.p4 * (6 - 1);
  const speed1 = 0.2 + cfg.p5 * (1.5 - 0.2);
  const rays = cfg.radialRays;
  for (let x = 0; x < g.cols; x++)
    for (let y = 0; y < g.rows; y++) {
      const dx = x - cx,
        dy = y - cy;
      const r = Math.sqrt(dx * dx + dy * dy);
      const ang = Math.atan2(dy, dx);
      const v1 = Math.sin(r * radial1 * waves1 + t * speed1);
      const v2 = Math.cos(r * radial2 * waves2 - t * speed1 * 0.7);
      const v3 = Math.sin(ang * rays + t * 0.5);
      const val = v1 + v2 + v3;
      setCell(g, x, y, val > 1.0 ? 1 : 0, (val + 3) / 6);
    }
}
