import type { PatternConfig } from "../types";
import { setCell, type Grid } from "../grid";

// Industrial — a centered meshing gear train: a central gear with satellites tangent
// around it. Tooth pitch is matched and satellites counter-rotate at speeds inversely
// proportional to radius, so the whole cluster drives itself.
export function generateGears(g: Grid, _cfg: PatternConfig, t: number): void {
  const m = Math.min(g.cols, g.rows);
  const cx = g.cols * 0.5, cy = g.rows * 0.5;
  // stack the train along the panel's long axis (vertical in a tall column)
  const vertical = g.rows > g.cols;
  const Ra = m * (vertical ? 0.36 : 0.3); // bigger in the vertical/strip version
  const baseTeeth = 11;
  const base = 1.2;
  const gears: [number, number, number, number, number][] = [[cx, cy, Ra, baseTeeth, base]];
  // in the vertical version, offset the satellites to the sides (staggered, dynamic)
  const sats: [number, number][] = vertical
    ? [[75, m * 0.24], [250, m * 0.2]]
    : [[22, m * 0.2], [200, m * 0.17]];
  for (const [deg, R] of sats) {
    const ang = (deg * Math.PI) / 180;
    const dist = (Ra + R) * 0.92;
    gears.push([
      cx + dist * Math.cos(ang),
      cy + dist * Math.sin(ang),
      R,
      Math.max(5, Math.round(baseTeeth * (R / Ra))),
      -base * (Ra / R),
    ]);
  }
  for (let y = 0; y < g.rows; y++) {
    for (let x = 0; x < g.cols; x++) {
      let on = 0, raw = 0;
      for (let gi = 0; gi < gears.length; gi++) {
        const [gx, gy, R, teeth, omega] = gears[gi];
        const dx = x - gx, dy = y - gy;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r > R * 1.18) continue;
        const ang = Math.atan2(dy, dx);
        const rot = t * omega;
        const tooth = Math.cos((ang + rot) * teeth) > 0 ? R * 0.13 : 0;
        const rimIn = R * 0.6, rimOut = R * 0.84 + tooth;
        if (r >= rimIn && r <= rimOut) { on = 1; raw = 0.9; break; }
        if (r < R * 0.24) { on = 1; raw = 0.6; break; } // solid hub
        if (r >= R * 0.24 && r < rimIn && Math.abs(Math.cos((ang + rot) * 2)) > 0.92) { on = 1; raw = 0.5; break; } // 4 straight spokes
      }
      if (on) setCell(g, x, y, 1, raw);
    }
  }
}
