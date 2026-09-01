import type { PatternConfig } from "../types";
import { hash } from "../math";
import { setCell, type Grid } from "../grid";

export function generateLattice(g: Grid, cfg: PatternConfig, t: number): void {
  const { cols, rows } = g;
  const block = Math.max(3, Math.round(4 + cfg.p1 * 8));
  const speed = 0.22 + cfg.p2 * 0.7;
  const fill = 0.32 + cfg.p3 * 0.3;
  const lean = cfg.p4 * 0.9;
  for (let y = 0; y < rows; y++) {
    const by = Math.floor(y / block);
    const edgeY = y % block === 0;
    for (let x = 0; x < cols; x++) {
      if (edgeY || x % block === 0) continue;
      const bx = Math.floor(x / block);
      const h = hash(bx, by);
      const phase = (bx + by * lean) * 0.5 - t * speed;
      const tri = Math.abs((((phase % 2) + 2) % 2) - 1);
      if (h * 0.45 + tri * 0.55 > 1 - fill) {
        setCell(g, x, y, 1, 0.55 + 0.45 * h);
      }
    }
  }
}
