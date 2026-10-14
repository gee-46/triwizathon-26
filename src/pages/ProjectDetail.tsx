import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Github } from 'lucide-react';
import { findProject } from '../data/projects';
import { HarborQueueDemo } from '../modules/harbor/HarborQueueDemo';
import { GestureVolumeDemo } from '../modules/gesture/GestureVolumeDemo';
import { Page, card, pill } from './ui';

const h3: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  color: 'var(--text-parchment)',
  fontSize: '0.95rem',
  letterSpacing: '0.12em',
  marginBottom: '0.7rem'
};
const body: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.88rem',
  lineHeight: 1.7,
  color: 'var(--text-silver)'
};

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams();
  const p = findProject(slug);
  if (!p) return <Navigate to="/projects" replace />;

  return (
    <Page title={p.name} kicker={p.integration === 'live' ? 'LIVE MODULE' : 'SHOWCASE'}>
      <p style={{ ...body, textAlign: 'center', fontSize: '1.05rem', marginBottom: '2rem' }}>{p.tagline}</p>

      {p.slug === 'harborpulse' && <HarborQueueDemo />}
      {p.slug === 'gesture-volume' && <GestureVolumeDemo />}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.2rem',
          marginTop: '1.6rem'
        }}
      >
        <div style={card}>
          <h3 style={h3}>WHAT IT DOES</h3>
          <ul style={{ ...body, paddingLeft: '1.1rem' }}>
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <div style={card}>
          <h3 style={h3}>HOW IT FITS HERE</h3>
          <p style={body}>{p.approach}</p>
          {p.blocker && <p style={{ ...body, marginTop: '0.8rem', color: 'var(--gold-mid)' }}>Blocker: {p.blocker}</p>}
          <p style={{ ...body, marginTop: '0.8rem' }}>License: {p.license}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', margin: '1.6rem 0' }}>
        {p.stack.map((s) => (
          <span key={s} style={pill}>
            {s}
          </span>
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <a
          href={p.repo}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...pill,
            display: 'inline-flex',
            gap: '0.5rem',
            alignItems: 'center',
            color: 'var(--gold-bright)',
            textDecoration: 'none',
            padding: '0.55rem 1.3rem'
          }}
        >
          <Github size={15} /> View on GitHub
        </a>
      </div>
    </Page>
  );
};

export default ProjectDetail;
