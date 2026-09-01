import type { PatternConfig } from "../types";
import { noise2 } from "../math";
import {
  applySymmetry,
  cellTimeStretch,
  foldAng,
  polar,
  setCell,
  type Grid,
} from "../grid";

export function generateCrystal(g: Grid, cfg: PatternConfig, t: number): void {
  const sc = 0.06 + cfg.p1 * 0.1;
  const rays = Math.max(1, cfg.radialRays);
  if (cfg.radialSym) {
    for (let x = 0; x < g.cols; x++)
      for (let y = 0; y < g.rows; y++) {
        const [r, ang] = polar(g, x, y);
        const fa = foldAng(ang, rays);
        const px = r * 60 * sc,
          py = fa * 60 * sc;
        const warp =
          noise2(px * 0.3 + cfg.seed * 0.001, py * 0.3 + cfg.seed * 0.002) *
          1.8;
        const tLocal = t * cellTimeStretch(x, y, cfg.seed);
        const n1 = Math.sin((px + warp + tLocal * cfg.p3) * Math.PI * 2);
        const n2 = Math.sin((py + warp * 0.7 + tLocal * cfg.p4) * Math.PI * 2);
        const n3 = Math.sin(
          (px + py) * 0.7 * Math.PI * 2 + warp * 0.5 + tLocal * cfg.p5,
        );
        const v = (n1 + n2 + n3) / 3;
        setCell(g, x, y, v > 0.2 - cfg.p2 * 0.4 ? 1 : 0, (v + 1) / 2);
      }
  } else {
    for (let x = 0; x < g.cols / 2; x++)
      for (let y = 0; y < g.rows / 2; y++) {
        const nx = x * sc,
          ny = y * sc;
        const warp =
          noise2(nx * 0.4 + cfg.seed * 0.001, ny * 0.4 + cfg.seed * 0.002) *
          1.6;
        const tLocal = t * cellTimeStretch(x, y, cfg.seed);
        const n1 = Math.sin((nx + warp + tLocal * cfg.p4) * Math.PI * 2);
        const n2 = Math.sin((ny + warp * 0.7 + tLocal * cfg.p3) * Math.PI * 2);
        const n3 = Math.sin(
          (nx + ny) * 0.7 * Math.PI * 2 + warp * 0.5 + tLocal * cfg.p5,
        );
        const n4 = Math.sin(
          (nx - ny) * 0.5 * Math.PI * 2 + warp * 0.3 + tLocal * cfg.p5 * 0.7,
        );
        const v = (n1 + n2 + n3 + n4) / 4;
        applySymmetry(
          g,
          cfg,
          x,
          y,
          v > 0.2 - cfg.p2 * 0.4 ? 1 : 0,
          (v + 1) / 2,
        );
      }
  }
}
