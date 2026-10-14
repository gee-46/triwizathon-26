import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EnchantedArchive } from '../components/archive/EnchantedArchive';
import { ArrowLeft } from 'lucide-react';

export const ProjectsHub: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreProject = (slug: string) => {
    navigate(`/projects/${slug}`);
  };

  return (
    <div
      className="projects-hub-page"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-abyss)'
      }}
    >
      {/* Top Floating Return to Home Button */}
      <div
        style={{
          position: 'absolute',
          top: '1.75rem',
          left: '2rem',
          zIndex: 100
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Return to Horcrux Team Sanctuary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.45rem 1.1rem',
            background: 'rgba(3, 11, 7, 0.82)',
            border: '1px solid var(--gold-border-subtle)',
            borderRadius: '9999px',
            color: 'var(--gold-bright)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.6)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-2px)';
            e.currentTarget.style.borderColor = 'var(--gold-bright)';
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.borderColor = 'var(--gold-border-subtle)';
            e.currentTarget.style.background = 'rgba(3, 11, 7, 0.82)';
          }}
        >
          <ArrowLeft size={14} />
          <span>SANCTUARY</span>
        </button>
      </div>

      {/* Cinematic Enchanted Archive: The Pensieve */}
      <EnchantedArchive onExploreProject={handleExploreProject} />
    </div>
  );
};

export default ProjectsHub;
