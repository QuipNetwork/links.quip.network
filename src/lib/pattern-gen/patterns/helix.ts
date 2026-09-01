import type { PatternConfig } from "../types";
import { rasterLine, setCell, type Grid } from "../grid";

// Science — a single DNA double helix: two sine strands a half-phase apart with
// base-pair rungs. Runs along the panel's long axis (vertical in a tall column,
// horizontal in a wide hero).
export function generateHelix(g: Grid, cfg: PatternConfig, t: number): void {
  const vertical = g.rows >= g.cols;
  const along = vertical ? g.rows : g.cols;
  const across = vertical ? g.cols : g.rows;
  const mid = across * 0.5;
  // Scale wavelength & amplitude with the cross dimension so the ovals keep the same
  // proportions in any panel (a wide hero and a tall card look consistent).
  const amp = across * (0.28 + cfg.p1 * 0.04);
  const freq = Math.min(0.3, Math.max(0.05, (6.5 + cfg.p2 * 0.6) / across));
  const rungEvery = Math.max(2, Math.round((Math.PI * 2) / freq / 7)); // ~7 rungs per oval
  for (let u = 0; u < along; u++) {
    const phase = u * freq + t * 1.0;
    const a1 = Math.round(mid + Math.sin(phase) * amp);
    const a2 = Math.round(mid + Math.sin(phase + Math.PI) * amp);
    if (vertical) {
      setCell(g, a1, u, 1, 1);
      setCell(g, a2, u, 1, 0.7);
      if (u % rungEvery === 0) rasterLine(g, a1, u, a2, u, 0.4);
    } else {
      setCell(g, u, a1, 1, 1);
      setCell(g, u, a2, 1, 0.7);
      if (u % rungEvery === 0) rasterLine(g, u, a1, u, a2, 0.4);
    }
  }
}
