import type { ColorScheme, ColorSchemeName } from "./types";

export const COLOR_SCHEMES: Record<ColorSchemeName, ColorScheme> = {
  Chalk: {
    name: "Chalk",
    bg: "#ffffff",
    grad: "linear-gradient(135deg,hsl(0,0%,5%),hsl(0,0%,5%))",
    fgBase: [0, 0, 0],
    fgRange: [0, 0, 0],
  },
  Coral: {
    name: "Coral",
    bg: "#f8f0f0",
    grad: "linear-gradient(135deg,hsl(10,70%,58%),hsl(340,60%,64%))",
    fgBase: [6, 65, 52],
    fgRange: [38, 0, 10],
  },
  Sky: {
    name: "Sky",
    bg: "#f0f7ff",
    grad: "linear-gradient(135deg,hsl(210,54%,56%),hsl(228,46%,62%))",
    fgBase: [214, 50, 55],
    fgRange: [26, 0, 10],
  },
  // Restrained teal for the evaluate section: same narrow-band family as
  // Sky/Sage, tuned to the Enterprises cyan tint without the BrandCyan
  // rainbow spread.
  Teal: {
    name: "Teal",
    bg: "#eff7f8",
    grad: "linear-gradient(135deg,hsl(190,46%,48%),hsl(205,40%,56%))",
    fgBase: [190, 44, 48],
    fgRange: [24, 0, 10],
  },
  Sage: {
    name: "Sage",
    bg: "#f2faf4",
    grad: "linear-gradient(135deg,hsl(138,44%,44%),hsl(158,38%,50%))",
    fgBase: [142, 40, 44],
    fgRange: [30, 0, 10],
  },
  Violet: {
    name: "Violet",
    bg: "#f4f0ff",
    grad: "linear-gradient(135deg,hsl(272,52%,52%),hsl(300,44%,58%))",
    fgBase: [275, 48, 50],
    fgRange: [50, 0, 10],
  },
  Peach: {
    name: "Peach",
    bg: "#fff5ee",
    grad: "linear-gradient(135deg,hsl(28,60%,58%),hsl(14,55%,62%))",
    fgBase: [24, 55, 54],
    fgRange: [28, 0, 10],
  },
  White: {
    name: "White",
    bg: "#000000",
    grad: "linear-gradient(135deg,#ffffff,#ffffff)",
    fgBase: [0, 0, 100],
    fgRange: [0, 0, 0],
    hexColors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
    hexWeights: [100, 0, 0, 0],
  },
  Glitch: {
    name: "Glitch",
    bg: "#0c0c18",
    grad: "linear-gradient(135deg,hsl(240,32%,22%),hsl(240,38%,65%),hsl(0,0%,93%))",
    fgBase: [240, 30, 58],
    fgRange: [60, 10, 36],
    hexColors: [
      "#FEF278",
      "#FFDE53",
      "#EEFF64",
      "#CAFDFB",
      "#BCF4FF",
      "#E6D7FF",
    ],
    hexWeights: [25, 18, 15, 8, 8, 26],
  },
  Aurora: {
    name: "Aurora",
    bg: "#080f0d",
    grad: "linear-gradient(135deg,hsl(195,36%,22%),hsl(185,42%,62%),hsl(0,0%,92%))",
    fgBase: [192, 34, 56],
    fgRange: [50, 12, 34],
    hexColors: ["#4BE0FF", "#E9FFE2", "#C4E4FC", "#E6D7FF", "#FFC643"],
    hexWeights: [38, 20, 12, 8, 22],
  },
  Prism: {
    name: "Prism",
    bg: "#0e080e",
    grad: "linear-gradient(135deg,hsl(280,32%,22%),hsl(300,38%,62%),hsl(0,0%,93%))",
    fgBase: [288, 30, 56],
    fgRange: [80, 10, 34],
    hexColors: [
      "#FFE2DA",
      "#FFCDE4",
      "#FF6C78",
      "#C7FBFC",
      "#EDFFCA",
      "#FFE159",
    ],
    hexWeights: [18, 22, 28, 8, 16, 8],
  },
  Smog: {
    name: "Smog",
    bg: "#0c0c0c",
    grad: "linear-gradient(135deg,hsl(0,0%,18%),hsl(210,22%,52%),hsl(0,0%,90%))",
    fgBase: [210, 18, 52],
    fgRange: [30, 8, 32],
    hexColors: [
      "#CEEBF5",
      "#69E14D",
      "#E1FA4B",
      "#BCF4FF",
      "#CAFDFB",
      "#FEF278",
    ],
    hexWeights: [18, 28, 18, 14, 12, 10],
  },
  Flare: {
    name: "Flare",
    bg: "#100606",
    grad: "linear-gradient(135deg,hsl(5,48%,24%),hsl(15,52%,54%),hsl(0,0%,90%))",
    fgBase: [8, 46, 50],
    fgRange: [20, 10, 30],
    hexColors: [
      "#FFC643",
      "#FFE159",
      "#E9FFE2",
      "#E6D7FF",
      "#C4E4FC",
      "#4BE0FF",
    ],
    hexWeights: [28, 22, 15, 14, 12, 9],
  },
  Jan: {
    name: "Jan",
    bg: "#000000",
    grad: "linear-gradient(135deg,hsl(210,70%,72%),hsl(180,60%,78%),hsl(220,65%,68%))",
    fgBase: [210, 65, 72],
    fgRange: [30, 0, 14],
    palette: [
      [210, 65, 72],
      [185, 58, 78],
      [225, 60, 66],
    ],
    vivid: true,
  },
  Feb: {
    name: "Feb",
    bg: "#050510",
    grad: "linear-gradient(135deg,hsl(140,60%,72%),hsl(20,65%,78%),hsl(155,55%,68%))",
    fgBase: [140, 58, 72],
    fgRange: [20, 0, 14],
    palette: [
      [140, 58, 72],
      [18, 62, 76],
      [150, 52, 68],
    ],
    vivid: true,
  },
  Mar: {
    name: "Mar",
    bg: "#080008",
    grad: "linear-gradient(135deg,hsl(300,55%,82%),hsl(60,60%,84%),hsl(180,50%,86%))",
    fgBase: [300, 52, 82],
    fgRange: [20, 0, 10],
    palette: [
      [300, 52, 82],
      [62, 56, 84],
      [178, 48, 86],
    ],
    vivid: true,
  },
  Apr: {
    name: "Apr",
    bg: "#0a0010",
    grad: "linear-gradient(135deg,hsl(30,65%,80%),hsl(195,58%,78%),hsl(350,55%,82%))",
    fgBase: [30, 60, 80],
    fgRange: [20, 0, 12],
    palette: [
      [30, 60, 80],
      [195, 55, 78],
      [348, 52, 82],
    ],
    vivid: true,
  },
  May: {
    name: "May",
    bg: "#000a08",
    grad: "linear-gradient(135deg,hsl(160,62%,74%),hsl(270,58%,76%),hsl(40,60%,80%))",
    fgBase: [160, 58, 74],
    fgRange: [20, 0, 12],
    palette: [
      [160, 58, 74],
      [268, 55, 76],
      [40, 56, 80],
    ],
    vivid: true,
  },
  Jun: {
    name: "Jun",
    bg: "#0a0800",
    grad: "linear-gradient(135deg,hsl(40,70%,76%),hsl(10,65%,74%),hsl(300,58%,78%))",
    fgBase: [30, 62, 76],
    fgRange: [20, 0, 12],
    palette: [
      [40, 66, 76],
      [10, 62, 74],
      [300, 55, 78],
    ],
    vivid: true,
  },
  ChalkPantone: {
    name: "ChalkPantone",
    bg: "#ffffff",
    grad: "linear-gradient(135deg,hsl(35,6%,34%),hsl(35,5%,18%))",
    fgBase: [35, 6, 24],
    fgRange: [0, 0, 18],
    palette: [
      [35, 46, 28],
      [35, 43, 32],
      [35, 34, 44],
      [35, 18, 63],
      [35, 0, 90],
    ],
    vivid: true,
  },
  CoralPantone: {
    name: "CoralPantone",
    bg: "#ffffff",
    grad: "linear-gradient(135deg,hsl(6,65%,58%),hsl(344,65%,64%))",
    fgBase: [6, 65, 52],
    fgRange: [38, 0, 10],
    palette: [
      [6, 100, 28],
      [353, 100, 32],
      [339, 93, 44],
      [326, 77, 63],
      [313, 55, 90],
    ],
    vivid: true,
  },
  SkyPantone: {
    name: "SkyPantone",
    bg: "#ffffff",
    grad: "linear-gradient(135deg,hsl(214,50%,56%),hsl(228,46%,62%))",
    fgBase: [214, 50, 55],
    fgRange: [26, 0, 10],
    palette: [
      [214, 90, 28],
      [205, 87, 32],
      [196, 78, 44],
      [187, 62, 63],
      [178, 40, 90],
    ],
    vivid: true,
  },
  SagePantone: {
    name: "SagePantone",
    bg: "#ffffff",
    grad: "linear-gradient(135deg,hsl(142,40%,44%),hsl(158,38%,50%))",
    fgBase: [142, 40, 44],
    fgRange: [30, 0, 10],
    palette: [
      [142, 80, 28],
      [132, 77, 32],
      [121, 68, 44],
      [111, 52, 63],
      [100, 30, 90],
    ],
    vivid: true,
  },
  VioletPantone: {
    name: "VioletPantone",
    bg: "#ffffff",
    grad: "linear-gradient(135deg,hsl(275,48%,52%),hsl(325,48%,58%))",
    fgBase: [275, 48, 50],
    fgRange: [50, 0, 10],
    palette: [
      [275, 88, 28],
      [258, 85, 32],
      [240, 76, 44],
      [223, 60, 63],
      [205, 38, 90],
    ],
    vivid: true,
  },
  PeachPantone: {
    name: "PeachPantone",
    bg: "#ffffff",
    grad: "linear-gradient(135deg,hsl(24,55%,58%),hsl(52,55%,62%))",
    fgBase: [24, 55, 54],
    fgRange: [28, 0, 10],
    palette: [
      [24, 95, 28],
      [14, 92, 32],
      [4, 83, 44],
      [355, 67, 63],
      [345, 45, 90],
    ],
    vivid: true,
  },
  // Zinc-on-zinc: zinc-900 fg on zinc-800 bg, monochrome (matches the site's Problem section).
  Zinc: {
    name: "Zinc",
    bg: "#27272a",
    fgBase: [240, 6, 10],
    fgRange: [0, 0, 0],
  },
  // Light grey fg on white bg, monochrome.
  Mist: {
    name: "Mist",
    bg: "#ffffff",
    fgBase: [240, 6, 90],
    fgRange: [0, 0, 0],
  },
  // Transparent bg (so a CSS gradient behind the canvas shows through) with
  // warm mid-tone shapes. Designed to sit under mix-blend-soft-light.
  Rose: {
    name: "Rose",
    bg: "transparent",
    fgBase: [18, 48, 58],
    fgRange: [0, 0, 0],
  },
  // Red/green two-tone for candlesticks: low raw → red (down), high raw → green (up).
  // Pastel palette — lower saturation and higher lightness so the candles read
  // as soft brand-leaning tones rather than aggressive trading-screen red/green.
  Candle: {
    name: "Candle",
    bg: "#f4f8f5",
    fgBase: [146, 38, 64],
    fgRange: [0, 0, 0],
    palette: [
      [354, 56, 72],
      [146, 38, 64],
    ],
    vivid: true,
  },
  // Flat metallic grey for machined parts (gears).
  Silver: {
    name: "Silver",
    bg: "#f1f2f4",
    fgBase: [222, 10, 50],
    fgRange: [0, 0, 0],
  },
  // Two-tone teal-green for the finance ticker: pale area fill + dark line on top.
  Ticker: {
    name: "Ticker",
    bg: "#f2faf4",
    fgBase: [160, 52, 40],
    fgRange: [0, 0, 0],
    palette: [
      [150, 32, 84],
      [160, 54, 38],
    ],
    vivid: true,
  },
  // Transparent ground with a vivid brand-spectrum palette — colourful shapes show
  // directly on a light page (no washout, no box). For the hero animation.
  Halo: {
    name: "Halo",
    bg: "transparent",
    fgBase: [262, 58, 60],
    fgRange: [0, 0, 0],
    palette: [
      [262, 58, 62],
      [212, 64, 60],
      [152, 46, 54],
      [32, 74, 62],
      [330, 54, 66],
    ],
    vivid: true,
  },
  // Brand cyan: saturated cyan-leaning blues on a near-white bg. Wider hue
  // range so a small share of pixels drift into violet/pink territory,
  // giving an occasional accent without losing the cyan dominance.
  BrandCyan: {
    name: "BrandCyan",
    bg: "#f0fcff",
    fgBase: [188, 70, 50],
    fgRange: [110, 20, 25],
  },
  // Silver-dominant palette with sky-blue and gold-yellow sprinkles
  // interleaved between the silver tones so the accents distribute across
  // the whole pattern rather than clustering at one edge of the noise field.
  MistAccent: {
    name: "MistAccent",
    bg: "#ffffff",
    fgBase: [240, 6, 75],
    fgRange: [40, 10, 15],
    hexColors: [
      "#a1a1aa",
      "#4BE0FF",
      "#71717a",
      "#FFDE53",
      "#d4d4d8",
      "#BCF4FF",
    ],
    hexWeights: [25, 14, 25, 8, 20, 8],
  },
  // Dusty rose / muted mauve palette: pink-adjacent without leaning saccharine.
  // Tones range from light powder-pink to deeper terracotta-mauve so the card
  // reads warm and feminine-leaning but stays grown-up.
  Rosy: {
    name: "Rosy",
    bg: "#fdf3f6",
    fgBase: [342, 32, 60],
    fgRange: [16, 8, 14],
    hexColors: ["#d4a8b5", "#b97b8c", "#e5c0c9", "#a06472", "#cb95a3"],
    hexWeights: [28, 24, 22, 14, 12],
  },
};

/**
 * Returns a visible pastel "loading tint" derived from a scheme's fgBase HSL.
 * Each scheme's `bg` is intentionally near-white (so the pattern's pixels
 * stand out when rendered), which means the bare bg can't be perceived
 * during the canvas-hydration window. This derives a clearly-tinted preview
 * by capping saturation and lifting lightness to a pastel band, so the card
 * reads as the right colour family before the pattern paints.
 */
export function getSchemeLoadingTint(schemeName: ColorSchemeName): string {
  const scheme = COLOR_SCHEMES[schemeName];
  const [h, s, l] = scheme.fgBase;
  const tintS = Math.min(s, 38);
  const tintL = Math.min(Math.max(l + 35, 82), 90);
  return `hsl(${h}, ${tintS}%, ${tintL}%)`;
}
