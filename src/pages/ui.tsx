import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const card: React.CSSProperties = {
  background: 'rgba(3, 11, 7, 0.6)',
  border: '1px solid var(--gold-border-subtle)',
  borderRadius: '14px',
  padding: '1.6rem'
};

export const pill: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.74rem',
  padding: '0.25rem 0.75rem',
  borderRadius: '9999px',
  border: '1px solid var(--gold-border-subtle)',
  color: 'var(--text-parchment)'
};

export const Page: React.FC<{ title: string; kicker: string; children: React.ReactNode }> = ({ title, kicker, children }) => (
  <div style={{ minHeight: '100vh', background: 'var(--bg-emerald-deep)', padding: '5.5rem 1.5rem 4rem' }}>
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            color: 'var(--gold-mid)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.78rem',
            letterSpacing: '0.16em',
            textDecoration: 'none',
            display: 'inline-flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}
        >
          <ArrowLeft size={14} /> SANCTUARY
        </Link>
        <span style={{ color: 'rgba(197, 160, 89, 0.4)' }}>·</span>
        <Link
          to="/projects"
          style={{
            color: 'var(--gold-bright)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.78rem',
            letterSpacing: '0.16em',
            textDecoration: 'none',
            display: 'inline-flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}
        >
          <ArrowLeft size={14} /> THE PENSIEVE ARCHIVE
        </Link>
      </div>
      <div style={{ textAlign: 'center', margin: '2rem 0 2.6rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.24em', color: 'var(--gold-mid)' }}>
          ✦ {kicker} ✦
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem,4vw,3rem)',
            color: 'var(--gold-light)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: '0.6rem'
          }}
        >
          {title}
        </h1>
      </div>
      {children}
    </div>
  </div>
);
