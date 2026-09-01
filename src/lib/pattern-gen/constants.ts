import type {
  ColorVariation,
  PatternConfig,
  PatternMode,
  PixelShape,
} from "./types";

export const CANVAS_SIZE = 640;

export const MODES: readonly PatternMode[] = [
  "noiseLines",
  "cyberWaves",
  "biomorph",
  "mandala",
  "crystal",
  "plasma",
  "candles",
  "ticker",
  "routes",
  "gears",
  "helix",
  "wrap",
];

export const MODE_PARAM_LABELS: Record<
  PatternMode,
  [string, string, string, string, string]
> = {
  noiseLines: ["Scale", "Thickness", "Layers", "Time Y", "Time X"],
  cyberWaves: ["Freq 1", "Freq 2", "Amp 1", "Amp 2", "Thresh"],
  biomorph: ["Scale", "Twist", "Time X", "Time Y", "Detail"],
  mandala: ["Ring Freq", "Twist", "Rings", "Density", "—"],
  crystal: ["Scale", "Sharpness", "Time Y", "Time X", "Depth"],
  plasma: ["Freq 1", "Freq 2", "Freq 3", "Density", "Bands"],
  candles: ["Body width", "Frequency", "—", "Speed", "—"],
  ticker: ["Trend freq", "Mid freq", "—", "Speed", "—"],
  routes: ["—", "Junction size", "Node count", "—", "—"],
  gears: ["—", "—", "—", "—", "—"],
  helix: ["Amplitude", "Wave freq", "—", "—", "—"],
  wrap: ["—", "—", "—", "—", "—"],
  interference: ["Sources", "Freq", "Speed", "—", "—"],
  topo: ["Land scale", "Levels", "Line weight", "Warp", "Drift"],
  lattice: ["Block size", "Speed", "Fill", "Lean", "—"],
  settle: ["Block size", "Drop speed", "Fill", "Rest gap", "—"],
  // LOCAL DELTA: upstream's MODE_PARAM_LABELS is missing the "swap" mode it
  // added to PatternMode, which fails this repo's `tsc`. Fix upstream and drop
  // this line on the next copy.
  swap: ["—", "—", "—", "—", "—"],
};

export const SHAPE_ID: Record<PixelShape, number> = {
  square: 0,
  diamond: 1,
  circle: 2,
  plus: 3,
};
export const SHAPE_BY_ID: PixelShape[] = ["square", "diamond", "circle", "plus"];

export const COLOR_VAR_ID: Record<ColorVariation, number> = {
  noise: 1,
  mix: 3,
  radial: 5,
};

export const DEFAULT_CONFIG: PatternConfig = {
  mode: "noiseLines",
  p1: 0.5,
  p2: 0.5,
  p3: 0.5,
  p4: 0.5,
  p5: 0.5,
  pixelSize: 6,
  spacing: 0,
  shapeScale: 1.0,
  pixelShape: "square",
  mixShapes: false,
  colorScheme: "Chalk",
  colorVariation: "noise",
  radialSym: false,
  radialRays: 6,
  circleMask: true,
  seed: 0,
};
