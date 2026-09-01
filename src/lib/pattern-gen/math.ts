let _noiseSeed = 0;

export function setNoiseSeed(s: number): void {
  _noiseSeed = s;
}

export function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + _noiseSeed * 74.3) * 43758.5453;
  return n - Math.floor(n);
}

function _fade(f: number): number {
  return f * f * f * (f * (f * 6 - 15) + 10);
}

export function noise2(x: number, y: number): number {
  const ix = Math.floor(x),
    iy = Math.floor(y);
  const fx = x - ix,
    fy = y - iy;
  const ux = _fade(fx),
    uy = _fade(fy);
  const a = hash(ix, iy),
    b = hash(ix + 1, iy),
    c = hash(ix, iy + 1),
    d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c + (d - c) * ux - (a + (b - a) * ux)) * uy;
}

export function noiseP(x: number, y: number): number {
  let v = 0,
    amp = 1,
    freq = 1,
    max = 0;
  for (let o = 0; o < 4; o++) {
    v += noise2(x * freq, y * freq) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2.0;
  }
  return v / max;
}
