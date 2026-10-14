import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, RotateCcw } from 'lucide-react';

interface ArchiveControlsProps {
  currentIndex: number;
  totalProjects: number;
  onNext: () => void;
  onPrev: () => void;
  onCloseBook: () => void;
  isFlipping: boolean;
  canGoBack: boolean;
}

export const ArchiveControls: React.FC<ArchiveControlsProps> = ({
  currentIndex,
  totalProjects,
  onNext,
  onPrev,
  onCloseBook,
  isFlipping,
  canGoBack
}) => {
  const currentFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(totalProjects).padStart(2, '0');

  return (
    <motion.nav
      aria-label="Archive Tome Navigation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '2.5rem',
        padding: '0.75rem 1.25rem',
        background: 'rgba(3, 12, 8, 0.82)',
        border: '1px solid var(--gold-border-subtle)',
        borderRadius: '9999px',
        backdropFilter: 'blur(16px)',
        boxShadow:
          '0 8px 32px rgba(0, 0, 0, 0.65), 0 0 16px rgba(212, 175, 55, 0.15)',
        zIndex: 20,
        maxWidth: 'fit-content',
        marginInline: 'auto'
      }}
    >
      {/* Previous Page Button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={isFlipping || !canGoBack}
        aria-label="Turn to previous archive entry"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.5rem 1.1rem',
          background: 'transparent',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: '9999px',
          color: canGoBack && !isFlipping ? 'var(--gold-bright)' : 'var(--text-dim)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          cursor: canGoBack && !isFlipping ? 'pointer' : 'not-allowed',
          opacity: canGoBack && !isFlipping ? 1 : 0.45,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (canGoBack && !isFlipping) {
            e.currentTarget.style.borderColor = 'var(--gold-bright)';
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)';
            e.currentTarget.style.transform = 'translateX(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.3)';
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <ChevronLeft size={16} />
        <span>PREVIOUS PAGE</span>
      </button>

      {/* Page Counter */}
      <div
        aria-live="polite"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.3rem 0.9rem',
          color: 'var(--gold-light)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          borderLeft: '1px solid rgba(197, 160, 89, 0.25)',
          borderRight: '1px solid rgba(197, 160, 89, 0.25)'
        }}
      >
        <BookOpen size={14} style={{ color: 'var(--gold-mid)' }} />
        <span>
          ARCHIVE ENTRY {currentFormatted} / {totalFormatted}
        </span>
      </div>

      {/* Next Page / Random Shuffle Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={isFlipping}
        aria-label="Turn page to reveal next enchanted project"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1.25rem',
          background: isFlipping
            ? 'rgba(212, 175, 55, 0.1)'
            : 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(18, 76, 50, 0.35))',
          border: '1px solid var(--gold-border-bright)',
          borderRadius: '9999px',
          color: 'var(--gold-bright)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          fontWeight: 800,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          cursor: isFlipping ? 'wait' : 'pointer',
          boxShadow: isFlipping
            ? 'none'
            : '0 0 14px rgba(212, 175, 55, 0.25)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (!isFlipping) {
            e.currentTarget.style.background =
              'linear-gradient(135deg, rgba(212, 175, 55, 0.4), rgba(29, 117, 78, 0.5))';
            e.currentTarget.style.boxShadow =
              '0 0 22px rgba(255, 217, 120, 0.55)';
            e.currentTarget.style.transform = 'translateX(2px)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(18, 76, 50, 0.35))';
          e.currentTarget.style.boxShadow =
            '0 0 14px rgba(212, 175, 55, 0.25)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <span>TURN THE PAGE ✦</span>
        <ChevronRight size={16} />
      </button>

      {/* Close Tome Button */}
      <button
        type="button"
        onClick={onCloseBook}
        disabled={isFlipping}
        title="Seal the grimoire and return to floating state"
        aria-label="Close enchanted spellbook"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.5rem 0.85rem',
          background: 'transparent',
          border: '1px solid rgba(197, 160, 89, 0.2)',
          borderRadius: '9999px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.68rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: isFlipping ? 'wait' : 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--gold-light)';
          e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-muted)';
          e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.2)';
        }}
      >
        <RotateCcw size={13} />
        <span>SEAL TOME</span>
      </button>
    </motion.nav>
  );
};
