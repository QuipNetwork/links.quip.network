import type { PatternConfig } from "../types";
import { hash } from "../math";
import { setCell, type Grid } from "../grid";

export function generateSettle(g: Grid, cfg: PatternConfig, t: number): void {
  const { cols, rows } = g;
  const block = Math.max(3, Math.round(4 + cfg.p1 * 8));
  const dropRate = 1.6 + cfg.p2 * 4;
  const fill = 0.32 + cfg.p3 * 0.3;
  const restGap = 3 + cfg.p4 * 8;
  const brows = Math.max(1, Math.ceil(rows / block));
  const period = brows + restGap;
  for (let y = 0; y < rows; y++) {
    const by = Math.floor(y / block);
    const edgeY = y % block === 0;
    for (let x = 0; x < cols; x++) {
      if (edgeY || x % block === 0) continue;
      const bx = Math.floor(x / block);
      const h = hash(bx, by);
      if (h > fill) continue;
      const colOffset = hash(bx, 137) * period;
      const progress = (((t * dropRate - colOffset) % period) + period) % period;
      if (brows - by <= progress) setCell(g, x, y, 1, 0.55 + 0.45 * h);
    }
  }
}
