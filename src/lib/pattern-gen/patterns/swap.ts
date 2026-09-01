import type { PatternConfig } from "../types";
import { hash } from "../math";
import { rasterLine, setCell, type Grid } from "../grid";

/**
 * Bridgeless swap — two chains, and the two claims that cross between them.
 *
 * HISTORY, because this generator has been wrong twice in opposite directions.
 *
 * v1 flew assets across the gap and met them in the middle. It looked good and
 * it was a picture of a bridge: in an atomic swap no asset ever leaves its own
 * chain, so that version drew the exact mechanism the product does not use.
 *
 * v2 fixed the accuracy by removing the crossing entirely and shooting a single
 * pixel across for the key reveal. Accurate, and inert: one small mark sliding
 * over empty space reads as a sprite, not a protocol.
 *
 * v3, here, gets both. The thing that genuinely crosses in a swap is not value
 * but REACH: you claim on your counterparty's chain, and they claim on yours.
 * Two claims, each reaching to the opposite ledger, crossing at one point in
 * the middle. That is a true X, and it is the same X that made v1 legible.
 * Nothing of value traverses; each asset changes owner where it already sits.
 *
 * The crossing is drawn as two lines that extend, meet, and complete, so the
 * motion is the reach itself rather than an object in transit.
 *
 *   p1  swaps in flight per channel    p2  ceremony speed
 *   p3  ledger block density           p4  how wide the X opens
 */
export function generateSwap(g: Grid, cfg: PatternConfig, t: number): void {
  const { cols, rows } = g;
  if (cols < 12 || rows < 5) return;

  /** A sealed escrow: a hollow ring around what it holds. */
  const ring = (x: number, y: number, r: number, raw: number) => {
    for (let yy = -r; yy <= r; yy++) {
      for (let xx = -r; xx <= r; xx++) {
        if (Math.abs(xx) === r || Math.abs(yy) === r) {
          setCell(g, x + xx, y + yy, 1, raw);
        }
      }
    }
  };

  /** An asset on a chain. raw carries who owns it. */
  const asset = (x: number, y: number, raw: number) => {
    for (let yy = -1; yy <= 1; yy++) {
      for (let xx = -1; xx <= 1; xx++) setCell(g, x + xx, y + yy, 1, raw);
    }
  };

  const laneH = Math.max(16, Math.round(26 - cfg.p1 * 10));
  const lanes = Math.max(1, Math.floor(rows / laneH));
  const laneSpace = rows / lanes;
  const rate = 0.11 + cfg.p2 * 0.15;

  const nRails = Math.max(
    2,
    Math.min(5, Math.floor(cols / Math.max(48, laneSpace * 2.0))),
  );
  // Rails run edge to edge rather than sitting inside half-gaps, but inset by
  // the width of a ledger block so the outermost chains are drawn whole. A
  // block is three cells wide plus its escrow ring, so a rail sitting exactly
  // on column 0 or cols-1 gets its outer half clipped by the canvas edge.
  const edge = 3;
  const railXs: number[] = [];
  for (let i = 0; i < nRails; i++) {
    railXs.push(Math.round(edge + (i / (nRails - 1)) * (cols - 1 - edge * 2)));
  }

  // The chains: a dotted spine with evenly spaced blocks advancing. Strictly
  // regular, because a ledger that skips blocks reads as broken.
  const blockGap = Math.max(5, Math.round(11 - cfg.p3 * 5));
  const drift = t * 1.9;
  railXs.forEach((rx, ri) => {
    for (let y = 0; y < rows; y += 2) setCell(g, rx, y, 1, 0.22);
    const phase = (drift + ri * blockGap * 0.37) % blockGap;
    for (let k = -1; k * blockGap < rows + blockGap; k++) {
      const by = Math.round(k * blockGap + phase);
      for (let yy = -1; yy <= 1; yy++) {
        setCell(g, rx - 1, by + yy, 1, 0.4);
        setCell(g, rx, by + yy, 1, 0.52);
        setCell(g, rx + 1, by + yy, 1, 0.4);
      }
    }
  });

  for (let ci = 0; ci < railXs.length - 1; ci++) {
    const xL = railXs[ci];
    const xR = railXs[ci + 1];
    const span = xR - xL;
    if (span < 24) continue;
    const xMid = (xL + xR) / 2;

    for (let li = 0; li < lanes; li++) {
      const yc = ((li + 0.5) / lanes) * rows;
      // Enough rise against the run that the X reads as a crossing rather than
      // two near-parallel lines.
      const spread =
        Math.min(laneSpace * 0.4, span * 0.3) * (0.7 + cfg.p4 * 0.6);
      const yTop = yc - spread;
      const yBot = yc + spread;

      const key = ci * 17 + li * 5;
      const c = (((t * rate + hash(key, 11.7)) % 1) + 1) % 1;

      const HELD = 0.5;
      const CLAIMED = 1;

      if (c < 0.1) continue; // between swaps the channel is empty

      // COMMIT — an escrow closes on each chain, left then right. Never in the
      // same instant: two chains cannot agree on one.
      const committedL = c >= 0.1;
      const committedR = c >= 0.2;
      if (committedL) {
        asset(xL, yTop, HELD);
        ring(xL, Math.round(yTop), 2, 0.62);
      }
      if (committedR) {
        asset(xR, yTop, HELD);
        ring(xR, Math.round(yTop), 2, 0.62);
      }

      // LOCKED — one hash binds the two escrows. A static sparse tie, never a
      // moving channel: it is a shared value, not a pipe.
      if (c >= 0.3 && c < 0.44) {
        for (let x = xL + 4; x < xR - 3; x += 4) {
          setCell(g, x, Math.round(yTop), 1, 0.24);
        }
      }

      // THE CROSSING — each side reaches across to claim on the other's chain.
      // Two lines extending toward opposite ledgers, meeting at one point.
      if (c >= 0.44 && c < 0.86) {
        const u = Math.min(1, (c - 0.44) / 0.34);
        // Left party reaches to the right chain; right party reaches to the
        // left. Mirrored endpoints put both at xMid at the same instant.
        const axe = xL + (xR - xL) * u;
        const aye = yTop + (yBot - yTop) * u;
        const bxe = xR - (xR - xL) * u;
        const bye = yTop + (yBot - yTop) * u;
        rasterLine(g, xL, yTop, axe, aye, 0.72);
        rasterLine(g, xR, yTop, bxe, bye, 0.72);

        // The instant both reaches meet. Marked, not exploded.
        if (u > 0.46 && u < 0.54) {
          for (let d = -2; d <= 2; d++) {
            setCell(g, Math.round(xMid + d), Math.round(yc), 1, 1);
            setCell(g, Math.round(xMid), Math.round(yc + d), 1, 1);
          }
        }
      }

      // SETTLED — both claims complete. Each asset changed owner on the chain
      // it was already sitting on; the escrows are open.
      if (c >= 0.86) {
        rasterLine(g, xL, yTop, xR, yBot, 0.36);
        rasterLine(g, xR, yTop, xL, yBot, 0.36);
        asset(xR, yBot, CLAIMED);
        asset(xL, yBot, CLAIMED);
      }
    }
  }
}
