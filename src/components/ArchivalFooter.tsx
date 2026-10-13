import React from 'react';

export const ArchivalFooter: React.FC = () => {
  return (
    <footer
      id="archives-footer"
      style={{
        width: '100%',
        backgroundColor: 'var(--bg-abyss)',
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(197, 160, 89, 0.12)',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            letterSpacing: '0.22em',
            color: 'var(--gold-mid)',
            marginBottom: '0.6rem',
            textTransform: 'uppercase'
          }}
        >
          ✦ TRIWIZATHON 2026 · SGU KOLHAPUR ✦
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.05rem',
            fontStyle: 'italic',
            color: 'var(--text-silver)',
            marginBottom: '1.2rem'
          }}
        >
          Mischief Managed · Team HORCRUX · All Magic Reserved
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.74rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.04em'
          }}
        >
          Built for high-stakes competition. Designed with deep emerald dark mode & Harry Potter-inspired fantasy typography.
        </p>
      </div>
    </footer>
  );
};
