import type { PatternConfig } from "../types";
import {
  applySymmetry,
  cellTimeStretch,
  polar,
  setCell,
  type Grid,
} from "../grid";

export function generateCyberWaves(
  g: Grid,
  cfg: PatternConfig,
  t: number,
): void {
  const freq1 = 0.08 + 0.15 * cfg.p1;
  const freq2 = 0.05 + 0.1 * cfg.p2;
  const amp1 = 0.5 + 0.5 * cfg.p3;
  const amp2 = 0.3 + 0.7 * cfg.p4;
  const density = 0.3 + 0.2 * cfg.p5;
  const rays = Math.max(2, cfg.radialRays);
  if (cfg.radialSym) {
    for (let x = 0; x < g.cols; x++)
      for (let y = 0; y < g.rows; y++) {
        const [r, ang] = polar(g, x, y);
        const rr = r * g.cols * 0.5;
        const tLocal = t * cellTimeStretch(x, y, cfg.seed);
        const l1 = Math.sin(rr * freq1 + Math.cos(ang * rays) * amp1 + tLocal * 1.0);
        const l2 = Math.cos(
          rr * freq2 + Math.sin(ang * rays) * amp2 + tLocal * 0.75,
        );
        const l3 = Math.sin(r * 20 + tLocal * 0.5);
        const v = (l1 + l2 + l3) / 3;
        setCell(g, x, y, Math.abs(v) > density ? 1 : 0, Math.abs(v));
      }
  } else {
    const cx = g.cols / 4,
      cy = g.rows / 4;
    for (let x = 0; x < g.cols / 2; x++)
      for (let y = 0; y < g.rows / 2; y++) {
        const dx = x - cx,
          dy = y - cy;
        const rr = Math.sqrt(dx * dx + dy * dy);
        const ang = Math.atan2(dy, dx);
        const tLocal = t * cellTimeStretch(x, y, cfg.seed);
        const l1 = Math.sin(rr * freq1 + Math.cos(ang * rays) * amp1 + tLocal * 1.0);
        const l2 = Math.cos(
          rr * freq2 + Math.sin(ang * rays) * amp2 + tLocal * 0.75,
        );
        const l3 = Math.sin(dx * dy * 0.03 + tLocal * 0.5);
        const v = (l1 + l2 + l3) / 3;
        applySymmetry(g, cfg, x, y, Math.abs(v) > density ? 1 : 0, Math.abs(v));
      }
  }
}
