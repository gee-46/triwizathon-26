import { describe, expect, it } from 'vitest';
import { calculateScore, priorityScore, sortBoatsByPriority } from '../modules/harbor/priorityEngine';
import { countFingers, fingersToPercent, pinchToPercent, smooth } from '../modules/gesture/gestureMath';

describe('HarborPulse DWQ', () => {
  it('matches the Python formula', () => {
    expect(calculateScore(4, 10, 3)).toBe(2 + 100 - 6);
  });
  it('emergency > manual override > score, ties go to lighter cargo', () => {
    const base = { waitTime: 1, cargoType: 'Tuna', distance: 1 };
    const boats = [
      { ...base, name: 'heavy', cargoWeight: 9 },
      { ...base, name: 'light', cargoWeight: 1 },
      { ...base, name: 'bump', cargoWeight: 5, manualOverride: true },
      { ...base, name: 'sos', cargoWeight: 5, isEmergency: true }
    ];
    expect(priorityScore(boats[3])).toBe(999);
    expect(sortBoatsByPriority(boats).map((b) => b.name)).toEqual(['sos', 'bump', 'light', 'heavy']);
  });
});

describe('gesture math', () => {
  it('maps pinch ratio to 0-100 and clamps', () => {
    expect(pinchToPercent(0.1)).toBe(0);
    expect(pinchToPercent(0.54)).toBe(50);
    expect(pinchToPercent(2)).toBe(100);
  });
  it('maps finger counts to percent', () => {
    expect(fingersToPercent(3)).toBe(60);
    expect(fingersToPercent(9)).toBe(0);
  });
  it('counts raised fingers on a synthetic open hand', () => {
    const lm = Array.from({ length: 21 }, () => ({ x: 0.5, y: 0.5 }));
    lm[17] = { x: 0.6, y: 0.5 };
    lm[2] = { x: 0.5, y: 0.5 };
    lm[4] = { x: 0.4, y: 0.5 };
    for (const [tip, pip] of [[8, 6], [12, 10], [16, 14], [20, 18]]) lm[tip] = { x: 0.5, y: 0.2 }, (lm[pip] = { x: 0.5, y: 0.4 });
    expect(countFingers(lm)).toBe(5);
  });
  it('smooths toward the target', () => {
    expect(smooth(null, 0.5)).toBe(0.5);
    const s = smooth(0, 1);
    expect(s).toBeGreaterThan(0.8);
    expect(s).toBeLessThan(1);
  });
});
