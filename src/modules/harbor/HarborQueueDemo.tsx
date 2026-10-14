import React, { useMemo, useState } from 'react';
import { Boat, PERISHABILITY_INDEX, perishabilityOf, priorityScore, sortBoatsByPriority } from './priorityEngine';
import { card } from '../../pages/ui';

const CARGO = Object.keys(PERISHABILITY_INDEX).filter((c) => c !== 'Default');
const SEED: Boat[] = [
  { name: 'Sea Pearl', waitTime: 3, cargoType: 'Tuna', distance: 8, cargoWeight: 4 },
  { name: 'Blue Mariner', waitTime: 6, cargoType: 'Crabs', distance: 2, cargoWeight: 2 },
  { name: 'Lakshmi', waitTime: 1, cargoType: 'Shrimp', distance: 3, cargoWeight: 3 }
];

const input: React.CSSProperties = {
  background: 'rgba(0,0,0,0.4)',
  border: '1px solid var(--gold-border-subtle)',
  borderRadius: 8,
  color: 'var(--text-parchment)',
  padding: '0.45rem 0.6rem',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.85rem',
  width: '100%'
};
const cell: React.CSSProperties = {
  padding: '0.5rem 0.6rem',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.85rem',
  color: 'var(--text-silver)',
  textAlign: 'left'
};

export const HarborQueueDemo: React.FC = () => {
  const [boats, setBoats] = useState<Boat[]>(SEED);
  const [draft, setDraft] = useState({ name: '', waitTime: '0', cargoType: 'Tuna', distance: '5', cargoWeight: '1' });
  const queue = useMemo(() => sortBoatsByPriority(boats), [boats]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const name = draft.name.trim();
    const nums = [draft.waitTime, draft.distance, draft.cargoWeight].map(Number);
    if (!name || boats.some((b) => b.name === name) || nums.some((n) => !Number.isFinite(n) || n < 0)) return;
    setBoats((b) => [
      ...b,
      { name, cargoType: draft.cargoType, waitTime: nums[0], distance: nums[1], cargoWeight: nums[2] }
    ]);
    setDraft({ ...draft, name: '' });
  };
  const toggle = (name: string, key: 'isEmergency' | 'manualOverride') =>
    setBoats((b) => b.map((x) => (x.name === name ? { ...x, [key]: !x[key] } : x)));

  return (
    <div style={card}>
      <form
        onSubmit={add}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.6rem', marginBottom: '1.2rem' }}
      >
        <input aria-label="Vessel name" placeholder="Vessel name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} style={input} required />
        <select aria-label="Cargo" value={draft.cargoType} onChange={(e) => setDraft({ ...draft, cargoType: e.target.value })} style={input}>
          {CARGO.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input aria-label="Wait (hours)" title="Wait (hours)" type="number" min="0" step="0.5" value={draft.waitTime} onChange={(e) => setDraft({ ...draft, waitTime: e.target.value })} style={input} />
        <input aria-label="Distance (km)" title="Distance (km)" type="number" min="0" step="0.5" value={draft.distance} onChange={(e) => setDraft({ ...draft, distance: e.target.value })} style={input} />
        <input aria-label="Cargo weight" title="Cargo weight" type="number" min="0" step="0.5" value={draft.cargoWeight} onChange={(e) => setDraft({ ...draft, cargoWeight: e.target.value })} style={input} />
        <button type="submit" style={{ ...input, cursor: 'pointer', color: 'var(--gold-bright)', borderColor: 'var(--gold-border-bright)' }}>
          Add vessel
        </button>
      </form>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
          <thead>
            <tr>
              {['#', 'Vessel', 'Cargo', 'Wait h', 'Dist km', 'Score', 'Emergency', 'Bump', ''].map((h) => (
                <th key={h} style={{ ...cell, color: 'var(--gold-mid)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queue.map((b, i) => (
              <tr key={b.name} style={{ borderTop: '1px solid var(--gold-border-subtle)' }}>
                <td style={cell}>{i + 1}</td>
                <td style={{ ...cell, color: 'var(--text-parchment)' }}>{b.name}</td>
                <td style={cell}>
                  {b.cargoType} ({perishabilityOf(b.cargoType)})
                </td>
                <td style={cell}>{b.waitTime}</td>
                <td style={cell}>{b.distance}</td>
                <td style={{ ...cell, color: 'var(--gold-bright)' }}>{priorityScore(b).toFixed(1)}</td>
                <td style={cell}>
                  <input type="checkbox" aria-label={`Emergency ${b.name}`} checked={!!b.isEmergency} onChange={() => toggle(b.name, 'isEmergency')} />
                </td>
                <td style={cell}>
                  <input type="checkbox" aria-label={`Bump ${b.name}`} checked={!!b.manualOverride} onChange={() => toggle(b.name, 'manualOverride')} />
                </td>
                <td style={cell}>
                  <button
                    type="button"
                    onClick={() => setBoats((x) => x.filter((v) => v.name !== b.name))}
                    aria-label={`Remove ${b.name}`}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {queue.length === 0 && <p style={{ ...cell, textAlign: 'center' }}>The harbor is clear.</p>}
    </div>
  );
};

export default HarborQueueDemo;
