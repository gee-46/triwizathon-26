import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { Page, card, pill } from './ui';

export const ProjectsHub: React.FC = () => (
  <Page title="Enchanted Artifacts" kicker="THE ARCHIVE">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.4rem' }}>
      {PROJECTS.map((p) => (
        <Link key={p.slug} to={`/projects/${p.slug}`} style={{ ...card, textDecoration: 'none', display: 'block' }}>
          <span style={{ ...pill, color: p.integration === 'live' ? 'var(--gold-bright)' : 'var(--text-silver)' }}>
            {p.integration === 'live' ? 'LIVE DEMO' : 'SHOWCASE'}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--gold-light)',
              fontSize: '1.2rem',
              letterSpacing: '0.1em',
              margin: '0.9rem 0 0.4rem'
            }}
          >
            {p.name}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: 'var(--text-silver)', lineHeight: 1.6 }}>
            {p.tagline}
          </p>
        </Link>
      ))}
    </div>
  </Page>
);

export default ProjectsHub;
