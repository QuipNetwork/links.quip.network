import { useEffect, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { renderPattern } from "./render";
import type {
  PatternConfig,
  PatternMode,
  PixelShape,
  ColorVariation,
  ColorSchemeName,
} from "./types";

// Module-level paint queue that batches first-paint calls from all
// concurrently-mounting PatternCanvas instances into a single rAF
// callback. Without this, each canvas does its sync first-paint inside
// its own useEffect — React processes the effects serially and the heavy
// renderPattern call blocks the main thread per canvas, so the user sees
// 50+ms of staggered pop-in across the grid. Batching makes all
// first-paints commit in the same browser frame.
const pendingFirstPaints: Array<() => void> = [];
let scheduledPaintFrame = 0;

function scheduleBatchedFirstPaint(paintFn: () => void): void {
  pendingFirstPaints.push(paintFn);
  if (scheduledPaintFrame !== 0) return;
  scheduledPaintFrame = requestAnimationFrame(() => {
    scheduledPaintFrame = 0;
    const queue = pendingFirstPaints.slice();
    pendingFirstPaints.length = 0;
    for (const fn of queue) {
      try {
        fn();
      } catch {
        // Don't let one bad paint break the others in the batch.
      }
    }
  });
}

export interface PatternCanvasProps {
  /** Pattern algorithm. */
  mode?: PatternMode;
  /** Generator params, each 0..1. Semantics vary per mode — see MODE_PARAM_LABELS. */
  p1?: number;
  p2?: number;
  p3?: number;
  p4?: number;
  p5?: number;
  /** Grid cell size in CSS px. Larger = chunkier pixels. */
  pixelSize?: number;
  /** Gap between pixels. `true` = 2px gap, `false` = flush. */
  spacing?: boolean;
  /** Zoom multiplier, 0.3–2.0. */
  shapeScale?: number;
  /** Shape of each "pixel". */
  pixelShape?: PixelShape;
  /** If true, shape per cell is picked by noise. */
  mixShapes?: boolean;
  /** Name of a scheme in COLOR_SCHEMES. */
  colorScheme?: ColorSchemeName;
  /** How color is distributed across the grid. */
  colorVariation?: ColorVariation;
  /** Enable rotational symmetry. */
  radialSym?: boolean;
  /** Number of rays for radial symmetry (3–24). */
  radialRays?: number;
  /** Circular mask with soft edge (only visible when radialSym is on). */
  circleMask?: boolean;
  /** Run the time-based animation. Color still drifts slowly regardless. */
  animate?: boolean;
  /** Animation speed — typical values 0.015 / 0.02 / 0.025. */
  speed?: number;
  /** RNG seed controlling pattern variation. */
  seed?: number;
  /** Force a transparent canvas background (only the shapes draw). */
  transparentBg?: boolean;
  /** Initial value of the animation time `t`. Defaults to 0; set to a
   *  non-zero value when the chosen mode/seed combination produces a sparse
   *  first frame and you want the static "at rest" render to look fuller. */
  startT?: number;
  className?: string;
  style?: CSSProperties;
}

export function PatternCanvas({
  mode = "noiseLines",
  p1 = 0.5,
  p2 = 0.5,
  p3 = 0.5,
  p4 = 0.5,
  p5 = 0.5,
  pixelSize = 6,
  spacing = false,
  shapeScale = 1.0,
  pixelShape = "square",
  mixShapes = false,
  colorScheme = "Chalk",
  colorVariation = "noise",
  radialSym = false,
  radialRays = 6,
  circleMask = true,
  animate = true,
  speed = 0.02,
  seed = 1,
  transparentBg = false,
  startT = 0,
  className,
  style,
}: PatternCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configRef = useRef<PatternConfig>({
    mode,
    p1,
    p2,
    p3,
    p4,
    p5,
    pixelSize,
    spacing: spacing ? 2 : 0,
    shapeScale,
    pixelShape,
    mixShapes,
    colorScheme,
    colorVariation,
    radialSym,
    radialRays,
    circleMask,
    seed,
    transparentBg,
  });
  const animateRef = useRef(animate);
  const speedRef = useRef(speed);
  const tRef = useRef(startT);
  const colorTRef = useRef(0);
  // Tracks whether the canvas needs to be repainted. Set on every React
  // render (so prop changes always trigger one paint) and again on resize,
  // then cleared by the rAF loop after a paint. Keeps idle canvases from
  // burning CPU re-painting the same static frame at 60fps.
  const dirtyRef = useRef(true);
  const reducedMotion = useReducedMotion();

  // Keep the latest prop values visible to the running rAF loop without
  // tearing it down between renders.
  configRef.current = {
    mode,
    p1,
    p2,
    p3,
    p4,
    p5,
    pixelSize,
    spacing: spacing ? 2 : 0,
    shapeScale,
    pixelShape,
    mixShapes,
    colorScheme,
    colorVariation,
    radialSym,
    radialRays,
    circleMask,
    seed,
    transparentBg,
  };
  // Force animation off when the user prefers reduced motion. Color drift
  // is also gated below so the pattern is fully static for those users.
  animateRef.current = animate && !reducedMotion;
  speedRef.current = speed;
  // Any React render means at least one prop changed — schedule a repaint.
  dirtyRef.current = true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cssW = 0,
      cssH = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextW = Math.max(1, Math.round(rect.width));
      const nextH = Math.max(1, Math.round(rect.height));
      if (nextW === cssW && nextH === cssH) return;
      cssW = nextW;
      cssH = nextH;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      // Size changed — the previous paint (if any) is now stale.
      dirtyRef.current = true;
    };
    resize();

    // Schedule first paint via the module-level batched queue. When several
    // PatternCanvas instances mount concurrently (e.g. the team grid), all
    // their first-paints land inside the same rAF callback and the browser
    // commits the whole batch in one frame instead of staggering them
    // across 50+ms of serialised effects.
    scheduleBatchedFirstPaint(() => {
      if (cssW > 0 && cssH > 0) {
        renderPattern(
          ctx,
          configRef.current,
          { t: tRef.current, colorT: colorTRef.current },
          cssW,
          cssH,
        );
        dirtyRef.current = false;
      }
    });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (cssW <= 0 || cssH <= 0) return;
      // While animating, advance time and paint every frame. While idle,
      // paint only when something has invalidated the previous frame
      // (initial mount, prop change, or resize) — otherwise skip the
      // expensive render entirely.
      if (animateRef.current) {
        tRef.current += speedRef.current;
        colorTRef.current += 0.004;
      } else if (!dirtyRef.current) {
        return;
      }
      renderPattern(
        ctx,
        configRef.current,
        { t: tRef.current, colorT: colorTRef.current },
        cssW,
        cssH,
      );
      dirtyRef.current = false;
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        imageRendering: "pixelated",
        ...style,
      }}
    />
  );
}
