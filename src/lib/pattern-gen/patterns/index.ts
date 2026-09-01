import type { PatternConfig, PatternMode } from "../types";
import type { Grid } from "../grid";
import { generateNoiseLines } from "./noiseLines";
import { generateCyberWaves } from "./cyberWaves";
import { generateBiomorph } from "./biomorph";
import { generateMandala } from "./mandala";
import { generateCrystal } from "./crystal";
import { generatePlasma } from "./plasma";
import { generateCandles } from "./candles";
import { generateTicker } from "./ticker";
import { generateRoutes } from "./routes";
import { generateGears } from "./gears";
import { generateHelix } from "./helix";
import { generateWrap } from "./wrap";
import { generateInterference } from "./interference";
import { generateTopo } from "./topo";
import { generateLattice } from "./lattice";
import { generateSettle } from "./settle";
import { generateSwap } from "./swap";

export const GENERATORS: Record<
  PatternMode,
  (g: Grid, cfg: PatternConfig, t: number) => void
> = {
  noiseLines: generateNoiseLines,
  cyberWaves: generateCyberWaves,
  biomorph: generateBiomorph,
  mandala: generateMandala,
  crystal: generateCrystal,
  plasma: generatePlasma,
  candles: generateCandles,
  ticker: generateTicker,
  routes: generateRoutes,
  gears: generateGears,
  helix: generateHelix,
  wrap: generateWrap,
  interference: generateInterference,
  topo: generateTopo,
  lattice: generateLattice,
  settle: generateSettle,
  swap: generateSwap,
};
