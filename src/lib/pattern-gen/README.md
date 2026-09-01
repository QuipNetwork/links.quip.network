# pattern-gen (vendored)

Mirrored verbatim from `quip-website/packages/pattern-gen/src` (the `@quip/pattern-gen`
workspace package that renders the pixel backdrops on quip.network, including the
QuipSwap hero). It is copied rather than imported because the package is private to
the website monorepo and there is no registry build for Netlify to install from.

Do not edit these files here. Fix them upstream in quip-website and re-copy:

    cp -R ../quip-website/packages/pattern-gen/src/. src/lib/pattern-gen/

Everything is plain TypeScript + Canvas 2D with no runtime dependency beyond React,
and it is SSR-safe: canvas and matchMedia are only touched inside effects.

## Local deltas

- `constants.ts`: added the missing `swap` entry to `MODE_PARAM_LABELS`. Upstream
  added `"swap"` to the `PatternMode` union without a label, which does not compile
  under this repo's `tsc`. Fix it upstream and drop the delta on the next copy.
