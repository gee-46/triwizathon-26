// Port of NEURAL-CAPITALS-HarborPulse/priority_engine.py (Dynamic Weighted Queueing).

export const PERISHABILITY_INDEX: Record<string, number> = {
  Tuna: 10,
  Shrimp: 10,
  Prawns: 10,
  Crabs: 4,
  Default: 0
};

export interface Boat {
  name: string;
  waitTime: number; // hours
  cargoType: string;
  distance: number; // km
  cargoWeight: number;
  isEmergency?: boolean;
  manualOverride?: boolean;
}

/** S = (T_w * 0.5) + (P_i * 10) - (D * 2) */
export function calculateScore(waitTime: number, perishability: number, distance: number): number {
  return waitTime * 0.5 + perishability * 10 - distance * 2;
}

export function perishabilityOf(cargoType: string): number {
  return PERISHABILITY_INDEX[cargoType] ?? PERISHABILITY_INDEX.Default;
}

export function priorityScore(b: Boat): number {
  if (b.isEmergency) return 999;
  if (b.manualOverride) return 100;
  return calculateScore(b.waitTime, perishabilityOf(b.cargoType), b.distance);
}

/** Highest score first; ties go to the lighter cargo. */
export function sortBoatsByPriority(boats: Boat[]): Boat[] {
  return [...boats].sort(
    (a, b) => priorityScore(b) - priorityScore(a) || a.cargoWeight - b.cargoWeight
  );
}
