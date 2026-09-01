import type { PatternConfig } from "../types";
import { rasterLine, setCell, type Grid } from "../grid";

// Digital assets — a core asset wrapped in nested, counter-rotating square shells.
// The static core is a diamond (rotated square) to echo the Crypto Investors
// persona icon; the surrounding shells are the original axis-aligned squares
// that rotate over time, unchanged from the prior pattern.
export function generateWrap(g: Grid, _cfg: PatternConfig, t: number): void {
  const cx = g.cols / 2, cy = g.rows / 2;
  const m = Math.min(g.cols, g.rows);
  // Solid core asset, drawn as a symmetric diamond (|x| + |y| ≤ r). Sized a hair
  // larger than the prior square block so it reads as a clean diamond and not
  // as a low-resolution star at small pattern scales.
  const core = Math.max(2, Math.round(m * 0.1));
  for (let yy = -core; yy <= core; yy++) {
    for (let xx = -core; xx <= core; xx++) {
      if (Math.abs(xx) + Math.abs(yy) <= core) {
        setCell(g, cx + xx, cy + yy, 1, 0.95);
      }
    }
  }
  // Three nested squares. Each inner square is scaled by 0.66 of the one outside it,
  // so its corner reach (s·√2 ≈ 0.93·outer) stays inside the outer square's edge at
  // every rotation — inner corners never poke past the outermost square's border.
  const N = 3;
  const outer = m * 0.42;
  for (let i = 0; i < N; i++) {
    const s = outer * Math.pow(0.66, N - 1 - i);
    const dir = i % 2 === 0 ? 1 : -1;
    const ang = (i + 1) * 0.4 + t * 0.5 * dir;
    const c = Math.cos(ang), sn = Math.sin(ang);
    const corners: [number, number][] = [
      [-s, -s],
      [s, -s],
      [s, s],
      [-s, s],
    ].map(([px, py]) => [cx + px * c - py * sn, cy + px * sn + py * c]);
    for (let k = 0; k < 4; k++) {
      const a = corners[k], b = corners[(k + 1) % 4];
      rasterLine(g, a[0], a[1], b[0], b[1], 0.5 + 0.12 * i);
    }
  }
}
