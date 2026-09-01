export type PatternMode =
  | "noiseLines"
  | "cyberWaves"
  | "biomorph"
  | "mandala"
  | "crystal"
  | "plasma"
  // Domain-representative generators (one per use case):
  | "candles"
  | "ticker"
  | "routes"
  | "gears"
  | "helix"
  | "wrap"
  | "interference"
  | "topo"
  | "lattice"
  | "settle"
  | "swap";

export type PixelShape = "square" | "diamond" | "circle" | "plus";

export type ColorVariation = "noise" | "mix" | "radial";

export type HSL = [number, number, number];

export interface ColorScheme {
  name: string;
  bg: string;
  grad?: string;
  fgBase: HSL;
  fgRange: HSL;
  hexColors?: string[];
  hexWeights?: number[];
  palette?: HSL[];
  vivid?: boolean;
  layers?: boolean;
}

export type ColorSchemeName =
  | "Chalk"
  | "Coral"
  | "Sky"
  | "Sage"
  | "Violet"
  | "Peach"
  | "White"
  | "Glitch"
  | "Aurora"
  | "Prism"
  | "Smog"
  | "Flare"
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "ChalkPantone"
  | "CoralPantone"
  | "SkyPantone"
  | "SagePantone"
  | "VioletPantone"
  | "PeachPantone"
  | "Zinc"
  | "Mist"
  | "Rose"
  | "Candle"
  | "Silver"
  | "Halo"
  | "Ticker"
  | "BrandCyan"
  | "MistAccent"
  | "Rosy"
  | "Teal";

export interface PatternConfig {
  mode: PatternMode;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  pixelSize: number;
  spacing: number;
  shapeScale: number;
  pixelShape: PixelShape;
  mixShapes: boolean;
  colorScheme: ColorSchemeName;
  colorVariation: ColorVariation;
  radialSym: boolean;
  radialRays: number;
  circleMask: boolean;
  seed: number;
  /** Force a transparent canvas background (only the shapes draw, no filled rectangle). */
  transparentBg?: boolean;
}

export interface RenderRuntime {
  t: number;
  colorT: number;
}
