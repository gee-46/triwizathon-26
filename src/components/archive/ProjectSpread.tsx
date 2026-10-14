import React from 'react';
import { Project } from '../../data/projects';
import { BookPage } from './BookPage';

interface ProjectSpreadProps {
  project: Project;
  onExplore: (slug: string) => void;
  isFlipping?: boolean;
}

export const ProjectSpread: React.FC<ProjectSpreadProps> = ({
  project,
  onExplore,
  isFlipping = false
}) => {
  return (
    <div
      className="project-spread-wrapper"
      style={{
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        position: 'relative',
        borderRadius: '14px',
        boxShadow:
          '0 28px 70px rgba(0, 0, 0, 0.85), 0 0 30px rgba(212, 175, 55, 0.22), inset 0 0 40px rgba(0, 0, 0, 0.25)',
        background: '#120d08', // Leather cover backing
        padding: '10px',
        border: '1px solid rgba(212, 175, 55, 0.45)'
      }}
    >
      {/* Outer Leather Trim / Spine Ribbing */}
      <div
        style={{
          position: 'absolute',
          top: '-6px',
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24px',
          background: 'linear-gradient(90deg, #18110a, #342514 50%, #18110a)',
          borderRadius: '4px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
          zIndex: 4,
          pointerEvents: 'none'
        }}
      />

      {/* Decorative Golden Spine Bookmark Ribbon */}
      <div
        className="spine-ribbon"
        style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '14px',
          height: '65px',
          background:
            'linear-gradient(180deg, #d4af37, #b8860b 80%, transparent 100%)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          clipPath:
            'polygon(0 0, 100% 0, 100% calc(100% - 8px), 50% 100%, 0 calc(100% - 8px))',
          zIndex: 8,
          pointerEvents: 'none'
        }}
      />

      {/* Inner Parchment Pages Container */}
      <div
        className="parchment-sheet"
        style={{
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          background:
            'url(/images/parchment_spread.jpg) center/cover no-repeat, #f3eedf',
          backgroundColor: '#f3eedf',
          boxShadow:
            'inset 0 0 35px rgba(120, 80, 20, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
          minHeight: '560px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Central Spine Binding Crease Shadow */}
        <div
          className="spine-gutter-shadow"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(50, 30, 10, 0.15) 35%, rgba(20, 10, 5, 0.35) 50%, rgba(50, 30, 10, 0.15) 65%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        {/* Left & Right Page Depth Highlights */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '18px',
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 0.18) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '18px',
            background:
              'linear-gradient(270deg, rgba(0, 0, 0, 0.18) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Actual 2-Page Content */}
        <div style={{ position: 'relative', zIndex: 5, width: '100%', height: '100%' }}>
          <BookPage
            project={project}
            onExplore={onExplore}
            isFlipping={isFlipping}
          />
        </div>
      </div>
    </div>
  );
};
