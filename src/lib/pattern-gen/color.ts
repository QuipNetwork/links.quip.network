import type { PatternConfig } from "./types";
import { noise2, noiseP } from "./math";
import { COLOR_VAR_ID } from "./constants";
import { COLOR_SCHEMES } from "./colorSchemes";
import type { Grid } from "./grid";

function hexLerp(hex1: string, hex2: string, tt: number): string {
  const parse = (h: string): [number, number, number] => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = parse(hex1);
  const [r2, g2, b2] = parse(hex2);
  const r = Math.round(r1 + (r2 - r1) * tt);
  const g = Math.round(g1 + (g2 - g1) * tt);
  const b = Math.round(b1 + (b2 - b1) * tt);
  return `rgb(${r},${g},${b})`;
}

function hexSample(colors: string[], weights: number[], nv: number): string {
  const total = weights.reduce((a, b) => a + b, 0);
  const stops: number[] = [];
  let acc = 0;
  for (let i = 0; i < colors.length; i++) {
    stops.push(acc / total);
    acc += weights[i];
  }
  stops.push(1.0);
  const t = Math.max(0, Math.min(0.9999, nv));
  for (let i = 0; i < colors.length - 1; i++) {
    if (t <= stops[i + 1]) {
      const seg = (t - stops[i]) / (stops[i + 1] - stops[i]);
      return hexLerp(colors[i], colors[i + 1], seg);
    }
  }
  return colors[colors.length - 1];
}

function isLightBg(bg: string): boolean {
  return bg.startsWith("#f") || bg.startsWith("#e");
}

export function getPixelColor(
  g: Grid,
  cfg: PatternConfig,
  colorT: number,
  layerDist: Int16Array | null,
  x: number,
  y: number,
): string {
  const cs = COLOR_SCHEMES[cfg.colorScheme];
  const [bh, bs, bl] = cs.fgBase;
  const [rh, , rl] = cs.fgRange;
  const colorVarId = COLOR_VAR_ID[cfg.colorVariation];

  if (cs.vivid || cs.layers) {
    const pal = cs.palette!;
    const n = pal.length;
    let idx: number;
    if (cs.layers) {
      const d = layerDist ? layerDist[y * g.cols + x] : 0;
      const zoneSize = Math.max(2, Math.round(g.cols * 0.08));
      idx = Math.min(n - 1, Math.floor(d / zoneSize));
    } else {
      const raw = g.gridRaw[y * g.cols + x];
      idx = Math.min(n - 1, Math.floor(raw * n));
    }
    const [ph, ps2, pl] = pal[idx];
    return `hsl(${ph},${ps2}%,${pl}%)`;
  }

  if (cs.hexColors) {
    const ns = 0.025 * (80 / g.cols);
    const nv1 = noiseP(x * ns + cfg.seed * 0.0001, y * ns + cfg.seed * 0.0002);
    const nv2 = noiseP(
      x * ns * 3.1 + cfg.seed * 0.0007 + 71.3,
      y * ns * 2.3 + cfg.seed * 0.0004 + 43.7,
    );
    const nv3 = noiseP(
      x * ns * 0.4 + cfg.seed * 0.0003 + 19.1,
      y * ns * 0.5 + cfg.seed * 0.0006 + 83.2,
    );
    const nv = nv1 * 0.5 + nv2 * 0.3 + nv3 * 0.2;

    if (colorVarId === 1) {
      return hexSample(cs.hexColors, cs.hexWeights!, nv);
    }
    if (colorVarId === 5) {
      const dx = (x - g.cols / 2) / (g.cols / 2);
      const dy = (y - g.rows / 2) / (g.rows / 2);
      const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));
      const distNoisy = Math.max(0, Math.min(0.9999, dist * 0.75 + nv * 0.25));
      const colors = cs.hexColors;
      const ti = distNoisy * (colors.length - 1);
      const i0 = Math.floor(ti),
        i1 = Math.min(colors.length - 1, i0 + 1);
      return hexLerp(colors[i0], colors[i1], ti - i0);
    }
    if (colorVarId === 3) {
      const baseColor = hexSample(cs.hexColors, cs.hexWeights!, nv);
      const popN = noise2(
        x * 1.3 + cfg.seed * 0.0011 + 53.1,
        y * 1.3 + cfg.seed * 0.0019 + 37.4,
      );
      if (popN > 0.82) {
        const pickN = noise2(
          x * 2.7 + cfg.seed * 0.0031 + 11.3,
          y * 2.7 + cfg.seed * 0.0023 + 91.7,
        );
        const pickIdx = Math.floor(pickN * cs.hexColors.length);
        return cs.hexColors[Math.min(cs.hexColors.length - 1, pickIdx)];
      }
      return baseColor;
    }
  }

  if (colorVarId === 1 || rh === 0) {
    if (rh === 0) return `hsl(${bh},${bs}%,${bl}%)`;
    const nv = noise2(x * 0.03 + colorT, y * 0.03 + colorT * 0.7);
    const nv2 = noise2(x * 0.025 + 5 + colorT * 0.5, y * 0.025 + colorT * 0.3);
    const hOff = (nv - 0.5) * 2 * rh;
    const lOff = (nv2 - 0.5) * 2 * rl;
    const h = (((bh + hOff) % 360) + 360) % 360;
    const lMin = rl > 25 ? 12 : 10;
    const l = Math.max(lMin, Math.min(95, bl + lOff));
    const sFactor = rl > 25 ? Math.max(0.1, (l - lMin) / 45) : 1;
    const s = Math.round(bs * Math.min(1, sFactor));
    return `hsl(${h | 0},${s}%,${l | 0}%)`;
  }

  if (colorVarId === 5) {
    const dx = (x - g.cols / 2) / (g.cols / 2);
    const dy = (y - g.rows / 2) / (g.rows / 2);
    const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));
    const dist2 = dist * dist;
    const h = (((bh - rh * dist * 1.4) % 360) + 360) % 360;
    let l: number, s: number;
    if (isLightBg(cs.bg)) {
      l = 28 + dist2 * 62;
      s = Math.min(100, bs + 40 - dist2 * 50);
    } else {
      l = 55 + dist2 * 22;
      s = Math.min(100, bs + 15 - dist2 * 20);
    }
    return `hsl(${h | 0},${s | 0}%,${l | 0}%)`;
  }

  // Mix (colorVarId === 3)
  if (isLightBg(cs.bg)) {
    const dx = (x - g.cols / 2) / (g.cols / 2);
    const dy = (y - g.rows / 2) / (g.rows / 2);
    const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));
    const dist2 = dist * dist;
    const h = (((bh - rh * dist * 1.4) % 360) + 360) % 360;
    const l = 28 + dist2 * 62;
    const s = Math.min(100, bs + 40 - dist2 * 50);
    const popN = noise2(
      x * 1.3 + cfg.seed * 0.0011 + 53.1,
      y * 1.3 + cfg.seed * 0.0019 + 37.4,
    );
    if (popN > 0.9) {
      const pickN = noise2(
        x * 2.7 + cfg.seed * 0.0031 + 11.3,
        y * 2.7 + cfg.seed * 0.0023 + 91.7,
      );
      const popH = (((h + 90 + pickN * 180) % 360) + 360) % 360;
      return `hsl(${popH | 0},${Math.round(s * 1.2)}%,${l | 0}%)`;
    }
    return `hsl(${h | 0},${s | 0}%,${l | 0}%)`;
  }

  const nv = noise2(x * 0.04 + colorT, y * 0.04 + colorT * 0.6);
  let hOff = (nv - 0.5) * 2 * rh;
  let lOff = (noise2(x * 0.03 + 5, y * 0.03) - 0.5) * 2 * rl;
  const popN2 = noise2(x * 0.8 + cfg.seed * 0.001, y * 0.8 + cfg.seed * 0.002);
  if (popN2 > 0.72) {
    const pd = noise2(x * 0.5 + 300, y * 0.5 + 300);
    hOff += (pd > 0.5 ? 1 : -1) * rh * 0.6;
    lOff = (noise2(x * 0.5 + 400, y * 0.5 + 400) - 0.5) * 2 * rl * 1.4;
  }
  const h = (((bh + hOff) % 360) + 360) % 360;
  const l = Math.max(10, Math.min(95, bl + lOff));
  return `hsl(${h | 0},${bs}%,${l | 0}%)`;
}

export function computeLayerDepth(g: Grid): Int16Array {
  const dist = new Int16Array(g.cols * g.rows).fill(-1);
  const queue: number[] = [];
  for (let y = 0; y < g.rows; y++) {
    for (let x = 0; x < g.cols; x++) {
      if (!g.grid[y * g.cols + x]) continue;
      let onEdge = false;
      for (const [dx, dy] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ] as const) {
        const nx = x + dx,
          ny = y + dy;
        if (
          nx < 0 ||
          nx >= g.cols ||
          ny < 0 ||
          ny >= g.rows ||
          !g.grid[ny * g.cols + nx]
        ) {
          onEdge = true;
          break;
        }
      }
      if (onEdge) {
        dist[y * g.cols + x] = 0;
        queue.push(y * g.cols + x);
      }
    }
  }
  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const x = idx % g.cols,
      y = (idx / g.cols) | 0;
    for (const [dx, dy] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ] as const) {
      const nx = x + dx,
        ny = y + dy;
      if (nx < 0 || nx >= g.cols || ny < 0 || ny >= g.rows) continue;
      const ni = ny * g.cols + nx;
      if (g.grid[ni] && dist[ni] === -1) {
        dist[ni] = dist[idx] + 1;
        queue.push(ni);
      }
    }
  }
  return dist;
}
