import type { PatternConfig } from "../types";
import { noiseP } from "../math";
import { setCell, type Grid } from "../grid";

// Finance — red/green candlesticks. Each candle's shape is fixed (a stable price
// series), and the whole series scrolls right→left like a live chart — no flicker.
// Body raw value drives color: 0.2 (down/red) vs 0.85 (up/green) via a 2-color palette.
export function generateCandles(g: Grid, cfg: PatternConfig, t: number): void {
  const bodyW = Math.max(2, Math.round(2 + cfg.p1 * 2)); // thinner candles, fill the width
  const step = bodyW + Math.max(1, Math.round(bodyW * 0.7));
  const freq = 0.22 + cfg.p2 * 0.3;
  const speed = 1.4 + cfg.p4 * 3; // cells per time-unit (slow, smooth)
  const scroll = t * speed;
  const kStart = Math.floor(scroll / step) - 1;
  // contrast-stretch the price series so candles use more of the vertical space
  const price = (k: number) => Math.min(1, Math.max(0, 0.5 + (noiseP(k * freq, 5.3) - 0.5) * 1.8));
  let guard = 0;
  for (let k = kStart; guard++ < 600; k++) {
    const x = Math.round(k * step - scroll);
    if (x > g.cols + step) break;
    if (x < -step) continue;
    // stable price series (open of each candle = close of the previous)
    const o = price(k);
    const cl = price(k + 1);
    const wick = 0.04 + noiseP(k * 0.7 + 1.3, 9.1) * 0.1;
    const up = cl >= o;
    const raw = up ? 0.85 : 0.2;
    const hiY = Math.round(g.rows * (1 - Math.min(1, Math.max(o, cl) + wick)));
    const loY = Math.round(g.rows * (1 - Math.max(0, Math.min(o, cl) - wick)));
    const bodyTop = Math.round(g.rows * (1 - Math.max(o, cl)));
    const bodyBot = Math.round(g.rows * (1 - Math.min(o, cl)));
    const wx = x + Math.floor(bodyW / 2);
    for (let y = hiY; y <= loY; y++) setCell(g, wx, y, 1, raw);
    for (let bx = x; bx < x + bodyW; bx++) {
      for (let y = Math.min(bodyTop, bodyBot); y <= Math.max(bodyTop, bodyBot); y++) {
        setCell(g, bx, y, 1, raw);
      }
    }
  }
}
