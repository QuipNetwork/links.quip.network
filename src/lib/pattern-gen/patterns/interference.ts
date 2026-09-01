import type { PatternConfig } from "../types";
import { setCell, type Grid } from "../grid";

export function generateInterference(
  g: Grid,
  cfg: PatternConfig,
  t: number,
): void {
  const { cols, rows } = g;
  const m = Math.min(cols, rows);
  const srcs: [number, number][] = [
    [cols * (0.74 + 0.07 * Math.sin(t * 0.31)), rows * (0.26 + 0.06 * Math.cos(t * 0.23))],
    [cols * (0.97 + 0.04 * Math.cos(t * 0.19)), rows * (0.74 + 0.06 * Math.sin(t * 0.27))],
    [cols * (0.58 + 0.06 * Math.sin(t * 0.21 + 1.3)), rows * (0.6 + 0.06 * Math.cos(t * 0.25 + 2.1))],
    [cols * (0.86 + 0.05 * Math.cos(t * 0.29 + 0.7)), rows * (0.44 + 0.07 * Math.sin(t * 0.33 + 1.1))],
  ];
  const k = (Math.PI * 2) / Math.max(4, m * (0.12 + cfg.p1 * 0.05));
  const speed = 1.4 + cfg.p2 * 1.1;
  const thresh = 0.58;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let s = 0;
      for (let i = 0; i < srcs.length; i++) {
        const dx = x - srcs[i][0];
        const dy = y - srcs[i][1];
        const d = Math.sqrt(dx * dx + dy * dy);
        s += Math.sin(d * k - t * speed + i * 1.7);
      }
      s /= srcs.length;
      const v = (s + 1) / 2;
      if (v > thresh) setCell(g, x, y, 1, v);
    }
  }
}
