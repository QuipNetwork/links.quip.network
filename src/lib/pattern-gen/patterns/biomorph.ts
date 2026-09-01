import type { PatternConfig } from "../types";
import { noiseP } from "../math";
import {
  applySymmetry,
  cellTimeStretch,
  foldAng,
  polar,
  setCell,
  type Grid,
} from "../grid";

export function generateBiomorph(g: Grid, cfg: PatternConfig, t: number): void {
  const scale = 0.03 + 0.04 * cfg.p1;
  const twist = cfg.p2 * Math.PI * 2;
  const rays = Math.max(1, cfg.radialRays);
  if (cfg.radialSym) {
    for (let x = 0; x < g.cols; x++)
      for (let y = 0; y < g.rows; y++) {
        const [r, ang] = polar(g, x, y);
        const fa = foldAng(ang, rays);
        const tLocal = t * cellTimeStretch(x, y, cfg.seed);
        const n = noiseP(
          r * 60 * scale + tLocal * cfg.p3,
          fa * 60 * scale + tLocal * cfg.p4,
        );
        const n2 = noiseP(
          r * 60 * scale * 2.0 + tLocal * cfg.p2,
          fa * 60 * scale * 2.0 + tLocal * cfg.p5,
        );
        const v =
          Math.sin(n * Math.PI * 4 + twist) * Math.cos(n2 * Math.PI * 4);
        setCell(g, x, y, v > 0.4 ? 1 : 0, (v + 1) / 2);
      }
  } else {
    for (let x = 0; x < g.cols / 2; x++)
      for (let y = 0; y < g.rows / 2; y++) {
        const tLocal = t * cellTimeStretch(x, y, cfg.seed);
        const n = noiseP(x * scale + tLocal * cfg.p3, y * scale + tLocal * cfg.p4);
        const n2 = noiseP(
          x * scale * 2.0 + tLocal * cfg.p2,
          y * scale * 2.0 + tLocal * cfg.p5,
        );
        const v =
          Math.sin(n * Math.PI * 4 + twist) * Math.cos(n2 * Math.PI * 4);
        applySymmetry(g, cfg, x, y, v > 0.4 ? 1 : 0, (v + 1) / 2);
      }
  }
}
