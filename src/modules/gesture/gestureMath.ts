// Ported from gesture-volume-control (Gesture_Controll.py / Finger_controll.py).

export interface Pt {
  x: number;
  y: number;
}

export const MIN_PINCH_RATIO = 0.18; // fingertips touching -> 0%
export const MAX_PINCH_RATIO = 0.9; // fingers spread -> 100%

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);

/** Scale-invariant pinch ratio: thumb-tip/index-tip distance over palm size. */
export function pinchRatio(lm: Pt[]): number {
  const palmLen = dist(lm[0], lm[9]);
  const palmWidth = dist(lm[5], lm[17]);
  const ref = Math.max(palmLen, palmWidth, 1e-6);
  return dist(lm[4], lm[8]) / ref;
}

export function pinchToPercent(ratio: number): number {
  const t = (ratio - MIN_PINCH_RATIO) / (MAX_PINCH_RATIO - MIN_PINCH_RATIO);
  return Math.round(clamp(t, 0, 1) * 100);
}

/** Count raised fingers (0-5) from 21 normalized hand landmarks. */
export function countFingers(lm: Pt[]): number {
  if (lm.length < 21) return 0;
  let n = 0;
  for (const [tip, pip] of [[8, 6], [12, 10], [16, 14], [20, 18]]) {
    if (lm[tip].y < lm[pip].y) n++;
  }
  if (lm[17].x > lm[2].x) {
    if (lm[4].x < lm[2].x) n++;
  } else if (lm[4].x > lm[2].x) n++;
  return clamp(n, 0, 5);
}

export function fingersToPercent(n: number): number {
  return ({ 0: 0, 1: 20, 2: 40, 3: 60, 4: 80, 5: 100 } as Record<number, number>)[n] ?? 0;
}

/** Adaptive EMA smoothing, as in the Python OneEuro-style filter (alpha 0.40-0.90). */
export function smooth(prev: number | null, next: number, minA = 0.4, maxA = 0.9): number {
  if (prev === null) return next;
  const alpha = minA + Math.min(1, Math.abs(next - prev) / 0.12) * (maxA - minA);
  return prev + alpha * (next - prev);
}
