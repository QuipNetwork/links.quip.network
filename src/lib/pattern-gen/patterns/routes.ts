import type { PatternConfig } from "../types";
import { noise2 } from "../math";
import { fillDisc, rasterLine, setCell, type Grid } from "../grid";

// Logistics — a roadway network. Junctions are spread on a jittered grid across the
// whole rectangle (so nothing clusters and the bottom fills), joined by thin right-angle
// roads, with small junction blocks and vehicles travelling the roads.
export function generateRoutes(g: Grid, cfg: PatternConfig, t: number): void {
  // The hero panel is much wider than the cards; give it a denser network so the
  // elements read smaller and more of the routes show. Cards keep their density.
  const wide = g.cols / g.rows > 1.85;
  const gcX = wide
    ? Math.max(4, Math.min(7, Math.round(g.cols / 24)))
    : Math.max(2, Math.min(4, Math.round(g.cols / 16)));
  const gcY = wide
    ? Math.max(3, Math.min(5, Math.round(g.rows / 20)))
    : Math.max(2, Math.min(4, Math.round(g.rows / 12)));
  const nodes: [number, number][] = [];
  for (let b = 0; b < gcY; b++) {
    for (let a = 0; a < gcX; a++) {
      const jx = noise2(a * 7.1 + b * 3.3 + cfg.seed * 0.01, 1.7);
      const jy = noise2(a * 5.7 + b * 9.1 + cfg.seed * 0.02, 4.2);
      const x = Math.round(((a + 0.18 + 0.64 * jx) / gcX) * (g.cols - 1));
      const y = Math.round(((b + 0.18 + 0.64 * jy) / gcY) * (g.rows - 1));
      nodes.push([x, y]);
    }
  }
  // Connect junctions with a minimum spanning tree (Prim's): every junction is
  // linked with the fewest roads possible and no redundant, near-parallel corridors.
  const N = nodes.length;
  const roads: [number, number, number, number][] = [];
  const inTree = new Array(N).fill(false);
  inTree[0] = true;
  for (let e = 0; e < N - 1; e++) {
    let bi = -1, bj = -1, bd = Infinity;
    for (let i = 0; i < N; i++) {
      if (!inTree[i]) continue;
      for (let j = 0; j < N; j++) {
        if (inTree[j]) continue;
        const d = (nodes[i][0] - nodes[j][0]) ** 2 + (nodes[i][1] - nodes[j][1]) ** 2;
        if (d < bd) { bd = d; bi = i; bj = j; }
      }
    }
    if (bj < 0) break;
    inTree[bj] = true;
    roads.push([nodes[bi][0], nodes[bi][1], nodes[bj][0], nodes[bj][1]]);
  }
  for (const [x0, y0, x1, y1] of roads) {
    rasterLine(g, x0, y0, x1, y0, 0.38);
    rasterLine(g, x1, y0, x1, y1, 0.38);
  }
  // small square junctions
  const jr = 1;
  for (const [x, y] of nodes) {
    for (let yy = -jr; yy <= jr; yy++) for (let xx = -jr; xx <= jr; xx++) setCell(g, x + xx, y + yy, 1, 0.95);
  }
  // vehicles travelling the L-shaped roads
  for (let ri = 0; ri < roads.length; ri++) {
    const [x0, y0, x1, y1] = roads[ri];
    const adx = Math.abs(x1 - x0), ady = Math.abs(y1 - y0);
    const len = adx + ady;
    if (len < 2) continue;
    const sx = x1 >= x0 ? 1 : -1, sy = y1 >= y0 ? 1 : -1;
    const pos = (((t * 14 + ri * 7) % len) + len) % len;
    let px: number, py: number;
    if (pos < adx) { px = x0 + sx * pos; py = y0; }
    else { px = x1; py = y0 + sy * (pos - adx); }
    fillDisc(g, Math.round(px), Math.round(py), 1, 1);
  }
}
