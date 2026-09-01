import type { PatternConfig } from "../types";
import {
  applySymmetry,
  cellTimeStretch,
  foldAng,
  polar,
  setCell,
  type Grid,
} from "../grid";

export function generatePlasma(g: Grid, cfg: PatternConfig, t: number): void {
  const f1 = 0.08 + cfg.p1 * 0.12;
  const f2 = 0.06 + cfg.p2 * 0.1;
  const f3 = 0.05 + cfg.p3 * 0.08;
  const density = 0.5 + cfg.p4 * 0.45;
  const bands = 2 + cfg.p5 * 5;
  const rays = Math.max(1, cfg.radialRays);
  if (cfg.radialSym) {
    for (let x = 0; x < g.cols; x++)
      for (let y = 0; y < g.rows; y++) {
        const [r, ang] = polar(g, x, y);
        const fa = foldAng(ang, rays);
        const rr = r * g.cols * 0.5;
        const tLocal = t * cellTimeStretch(x, y, cfg.seed);
        const p =
          (Math.sin(rr * f1 + tLocal * 0.3) +
            Math.sin(fa * 40 * f2 + tLocal * 0.2) +
            Math.sin((rr + fa * 20) * f3 + tLocal * 0.15) +
            Math.sin(rr * 0.07 - tLocal * 0.25)) /
          4;
        const v = Math.abs(Math.sin(p * Math.PI * bands));
        setCell(g, x, y, v > density ? 1 : 0, v);
      }
  } else {
    for (let x = 0; x < g.cols / 2; x++)
      for (let y = 0; y < g.rows / 2; y++) {
        const dx = x - g.cols / 4,
          dy = y - g.rows / 4;
        const rr = Math.sqrt(dx * dx + dy * dy);
        const tLocal = t * cellTimeStretch(x, y, cfg.seed);
        const p =
          (Math.sin(x * f1 + tLocal * 0.3) +
            Math.sin(y * f2 + tLocal * 0.2) +
            Math.sin((x + y) * f3 + tLocal * 0.15) +
            Math.sin(rr * 0.07 - tLocal * 0.25)) /
          4;
        const v = Math.abs(Math.sin(p * Math.PI * bands));
        applySymmetry(g, cfg, x, y, v > density ? 1 : 0, v);
      }
  }
}
