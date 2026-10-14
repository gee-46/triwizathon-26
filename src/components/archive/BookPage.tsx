import React from 'react';
import { Project } from '../../data/projects';
import {
  ArrowRight,
  Sparkles,
  Wind,
  Hand,
  Anchor,
  Sprout,
  ShieldAlert,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  FileCode2
} from 'lucide-react';

interface BookPageProps {
  project: Project;
  onExplore: (slug: string) => void;
  isFlipping?: boolean;
}

const getChapter = (slug: string) => {
  switch (slug) {
    case 'aerosense': return 'CHAPTER I';
    case 'gesture-volume': return 'CHAPTER II';
    case 'harborpulse': return 'CHAPTER III';
    case 'nutripalm': return 'CHAPTER IV';
    case 'slumsafe': return 'CHAPTER V';
    case 'safenet': return 'CHAPTER VI';
    default: return 'CHAPTER I';
  }
};

const getCategory = (project: Project) => {
  if (project.integration === 'live') {
    return 'LIVE INTERACTIVE MODULE';
  }
  switch (project.slug) {
    case 'aerosense': return 'UAV ACOUSTIC INTELLIGENCE';
    case 'nutripalm': return 'AGRITECH DIGITAL TWINS';
    case 'slumsafe': return 'GEOSPATIAL PUBLIC SAFETY';
    case 'safenet': return 'UNIFIED CRIME INTELLIGENCE';
    default: return 'ENGINEERED ARTIFACT';
  }
};

const getHeroSymbol = (slug: string) => {
  switch (slug) {
    case 'aerosense': return 'Wind';
    case 'gesture-volume': return 'Hand';
    case 'harborpulse': return 'Anchor';
    case 'nutripalm': return 'Sprout';
    case 'slumsafe': return 'ShieldAlert';
    case 'safenet': return 'Eye';
    default: return 'Sparkles';
  }
};

const getIncantation = (slug: string) => {
  switch (slug) {
    case 'aerosense': return 'Ventus Sensio Maxima';
    case 'gesture-volume': return 'Sonorus Telekinesis';
    case 'harborpulse': return 'Portus Gubernator Arcana';
    case 'nutripalm': return 'Flora Sanatio Revelio';
    case 'slumsafe': return 'Civitas Tutela Arcana';
    case 'safenet': return 'Custodia Ocularis Maxima';
    default: return 'Magica Ingenium';
  }
};

export const BookPage: React.FC<BookPageProps> = ({
  project,
  onExplore,
  isFlipping = false
}) => {
  // Map hero symbols to Lucide icons
  const renderHeroGlyph = (symbol: string) => {
    const size = 52;
    switch (symbol) {
      case 'Wind':
        return <Wind size={size} strokeWidth={1.4} />;
      case 'Hand':
        return <Hand size={size} strokeWidth={1.4} />;
      case 'Anchor':
        return <Anchor size={size} strokeWidth={1.4} />;
      case 'Sprout':
        return <Sprout size={size} strokeWidth={1.4} />;
      case 'ShieldAlert':
        return <ShieldAlert size={size} strokeWidth={1.4} />;
      case 'Eye':
        return <Eye size={size} strokeWidth={1.4} />;
      default:
        return <Sparkles size={size} strokeWidth={1.4} />;
    }
  };

  return (
    <div
      className="book-page-content"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        width: '100%',
        minHeight: '100%',
        color: '#1c150c', // Deep antique ink
        position: 'relative'
      }}
    >
      {/* ══════════════════════════════════════════
          LEFT SPREAD: PROJECT COVER & REVEAL
          ══════════════════════════════════════════ */}
      <div
        className="book-page-left"
        style={{
          padding: '2.5rem 2.8rem 2.5rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid rgba(138, 109, 43, 0.25)',
          position: 'relative'
        }}
      >
        {/* Top Header: Chapter & Category */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.2rem',
              borderBottom: '1px solid rgba(138, 109, 43, 0.2)',
              paddingBottom: '0.6rem'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.24em',
                color: '#7a5a1f',
                textTransform: 'uppercase'
              }}
            >
              ✦ {getChapter(project.slug)} ✦
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#8b6914',
                textTransform: 'uppercase',
                background: 'rgba(212, 175, 55, 0.12)',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                border: '1px solid rgba(138, 109, 43, 0.25)'
              }}
            >
              {getCategory(project)}
            </span>
          </div>

          {/* Project Title */}
          <h2
            style={{
              fontFamily: 'var(--font-fantasy)',
              fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)',
              lineHeight: 1.12,
              fontWeight: 800,
              color: '#1a1309',
              marginBottom: '0.85rem',
              letterSpacing: '0.04em',
              textShadow: '0 1px 1px rgba(255, 255, 255, 0.6)'
            }}
          >
            {project.name}
          </h2>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.12rem',
              fontStyle: 'italic',
              lineHeight: 1.45,
              color: '#423321',
              marginBottom: '1.5rem'
            }}
          >
            “{project.tagline}”
          </p>
        </div>

        {/* Illuminated Emblem & Magical Seal */}
        <div
          style={{
            margin: '1.2rem auto',
            width: '100%',
            maxWidth: '300px',
            aspectRatio: '1 / 1',
            borderRadius: '16px',
            border: '2px solid rgba(138, 109, 43, 0.4)',
            background:
              'radial-gradient(circle at center, rgba(255, 248, 225, 0.85) 0%, rgba(230, 212, 176, 0.5) 70%, rgba(200, 175, 130, 0.35) 100%)',
            boxShadow:
              'inset 0 0 24px rgba(138, 109, 43, 0.25), 0 8px 24px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '1.5rem',
            textAlign: 'center'
          }}
        >
          {/* Decorative Corner Filigree Marks */}
          <span
            style={{
              position: 'absolute',
              top: '8px',
              left: '10px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              color: '#8b6914',
              opacity: 0.6
            }}
          >
            ╔
          </span>
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '10px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              color: '#8b6914',
              opacity: 0.6
            }}
          >
            ╗
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '10px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              color: '#8b6914',
              opacity: 0.6
            }}
          >
            ╚
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '10px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              color: '#8b6914',
              opacity: 0.6
            }}
          >
            ╝
          </span>

          {/* Central Runic Icon */}
          <div
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.18)',
              border: '2px solid rgba(138, 109, 43, 0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5c4013',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.3)',
              marginBottom: '1rem'
            }}
          >
            {renderHeroGlyph(getHeroSymbol(project.slug))}
          </div>

          {/* Incantation Spell Name */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.22em',
              color: '#6e4f16',
              textTransform: 'uppercase',
              marginBottom: '0.35rem'
            }}
          >
            {getIncantation(project.slug)}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.85rem',
              fontStyle: 'italic',
              color: '#6b543b'
            }}
          >
            Enchanted Architecture · Horcrux Archive
          </span>
        </div>

        {/* Bottom Left Note */}
        <div
          style={{
            borderTop: '1px solid rgba(138, 109, 43, 0.2)',
            paddingTop: '0.65rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-display)',
            fontSize: '0.68rem',
            color: '#735b3e',
            letterSpacing: '0.14em'
          }}
        >
          <span>SEAL NO. {project.slug.toUpperCase()}</span>
          <span>ORIGIN: HORCRUX COVEN</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT SPREAD: DEEP TECHNICAL REVELATION
          ══════════════════════════════════════════ */}
      <div
        className="book-page-right"
        style={{
          padding: '2.5rem 2.5rem 2.5rem 2.8rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          {/* WHAT IT DOES */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
                color: '#7a5a1f',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '0.5rem'
              }}
            >
              <Cpu size={14} style={{ color: '#8b6914' }} />
              <span>WHAT IT DOES & ARCHITECTURE</span>
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.98rem',
                lineHeight: 1.5,
                color: '#281e13'
              }}
            >
              {project.approach}
            </p>
          </div>

          {/* KEY FEATS & TECHNICAL ACHIEVEMENTS */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
                color: '#7a5a1f',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '0.55rem'
              }}
            >
              <CheckCircle2 size={14} style={{ color: '#8b6914' }} />
              <span>KEY FEATS & ACHIEVEMENTS</span>
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              {project.highlights.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    lineHeight: 1.45,
                    color: '#2c2217'
                  }}
                >
                  <span
                    style={{
                      color: '#8b6914',
                      fontSize: '0.75rem',
                      lineHeight: '1.3rem'
                    }}
                  >
                    ◆
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TECH STACK ARSENAL */}
          <div style={{ marginBottom: '1.15rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
                color: '#7a5a1f',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '0.5rem'
              }}
            >
              <Layers size={14} style={{ color: '#8b6914' }} />
              <span>TECH STACK</span>
            </h3>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem'
              }}
            >
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    color: '#42311b',
                    background: 'rgba(212, 175, 55, 0.14)',
                    border: '1px solid rgba(138, 109, 43, 0.35)',
                    padding: '0.22rem 0.65rem',
                    borderRadius: '4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* BLOCKER / INTEGRATION WARD */}
          {project.blocker && (
            <div
              style={{
                marginBottom: '1.15rem',
                background: 'rgba(217, 119, 6, 0.08)',
                border: '1px solid rgba(180, 83, 9, 0.3)',
                borderRadius: '6px',
                padding: '0.65rem 0.85rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.55rem'
              }}
            >
              <AlertTriangle
                size={15}
                style={{ color: '#b45309', flexShrink: 0, marginTop: '2px' }}
              />
              <div style={{ fontSize: '0.76rem', color: '#573307', lineHeight: 1.45 }}>
                <strong style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>
                  DEPLOYMENT NOTE:
                </strong>{' '}
                {project.blocker}
              </div>
            </div>
          )}

          {/* LICENSE & RECORD */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-display)',
              fontSize: '0.7rem',
              color: '#6e5436',
              letterSpacing: '0.1em',
              marginBottom: '1.4rem',
              borderTop: '1px dashed rgba(138, 109, 43, 0.25)',
              paddingTop: '0.55rem'
            }}
          >
            <span>RECORD: {project.license}</span>
            <span>STATUS: {project.integration || 'VERIFIED BUILD'}</span>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.85rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(138, 109, 43, 0.3)'
          }}
        >
          {/* Explore Project internal route */}
          <button
            type="button"
            onClick={() => onExplore(project.slug)}
            disabled={isFlipping}
            aria-label={`Explore deep breakdown of ${project.name}`}
            style={{
              flex: 1,
              minWidth: '160px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.15rem',
              background: 'linear-gradient(135deg, #1b261f, #0b1c13)',
              border: '1px solid #c5a059',
              borderRadius: '6px',
              color: '#f5e5a6',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: isFlipping ? 'wait' : 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!isFlipping) {
                e.currentTarget.style.background =
                  'linear-gradient(135deg, #25392d, #142e20)';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(0, 0, 0, 0.3), 0 0 12px rgba(212, 175, 55, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                'linear-gradient(135deg, #1b261f, #0b1c13)';
              e.currentTarget.style.boxShadow =
                '0 4px 14px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>EXPLORE PROJECT</span>
            <ArrowRight size={15} />
          </button>

          {/* Inspect Source Github external link */}
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Inspect source repository for ${project.name} on GitHub`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              padding: '0.65rem 1.15rem',
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(138, 109, 43, 0.4)',
              borderRadius: '6px',
              color: '#3d2b15',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.25)';
              e.currentTarget.style.borderColor = '#8a6d2b';
              e.currentTarget.style.color = '#1c1308';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(138, 109, 43, 0.4)';
              e.currentTarget.style.color = '#3d2b15';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FileCode2 size={15} />
            <span>INSPECT THE SOURCE ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};
