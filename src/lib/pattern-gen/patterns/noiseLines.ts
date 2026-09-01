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

export function generateNoiseLines(
  g: Grid,
  cfg: PatternConfig,
  t: number,
): void {
  const scale = 0.03 + cfg.p1 * 0.06;
  const thick = 0.015 + cfg.p2 * 0.06;
  const layers = 1 + Math.floor(cfg.p3 * 3);
  const rays = Math.max(1, cfg.radialRays);
  if (cfg.radialSym) {
    for (let x = 0; x < g.cols; x++)
      for (let y = 0; y < g.rows; y++) {
        const [r, ang] = polar(g, x, y);
        const fa = foldAng(ang, rays);
        const tLocal = t * cellTimeStretch(x, y, cfg.seed);
        let on = 0,
          raw = 0;
        for (let l = 0; l < layers; l++) {
          const n = noiseP(
            r * scale * (1 + l * 0.5) * 60 + tLocal * cfg.p5,
            fa * scale * (1 + l * 0.5) * 60 + tLocal * cfg.p4,
          );
          const d = Math.abs(n - Math.floor(n * 6.0) / 6.0);
          if (d < thick) {
            on = 1;
            raw = Math.max(raw, 1 - d / thick);
          }
        }
        setCell(g, x, y, on, raw);
      }
  } else {
    for (let x = 0; x < g.cols / 2; x++)
      for (let y = 0; y < g.rows / 2; y++) {
        const tLocal = t * cellTimeStretch(x, y, cfg.seed);
        let on = 0,
          raw = 0;
        for (let l = 0; l < layers; l++) {
          const n = noiseP(
            x * scale * (1 + l * 0.5) + tLocal * cfg.p5,
            y * scale * (1 + l * 0.5) + tLocal * cfg.p4,
          );
          const d = Math.abs(n - Math.floor(n * 6.0) / 6.0);
          if (d < thick) {
            on = 1;
            raw = Math.max(raw, 1 - d / thick);
          }
        }
        applySymmetry(g, cfg, x, y, on, raw);
      }
  }
}
