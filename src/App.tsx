import React, { Suspense, lazy, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HogwartsCinematicIntro } from './components/HogwartsCinematicIntro';
import { HorcruxIntro } from './components/HorcruxIntro';
import { WizardMemberIntro } from './components/WizardMemberIntro';
import { Link, Route, Routes } from 'react-router-dom';
const ProjectsHub = lazy(() => import('./pages/ProjectsHub'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
import { ArchivalFooter } from './components/ArchivalFooter';
import { WandCursor } from './components/WandCursor';
import { TEAM_MEMBERS } from './data/teamMembers';
import { Film } from 'lucide-react';

const Home: React.FC = () => {
  const [showCinematicIntro, setShowCinematicIntro] = useState(true);

  const handleCinematicComplete = () => {
    setShowCinematicIntro(false);
  };

  const handleReplayCinematic = () => {
    setShowCinematicIntro(true);
  };

  return (
    <div className="triwizathon-app">
      {/* Custom Desktop Wand Cursor with Lumos Glow & Sparkle Burst */}
      <WandCursor />

      {/* ═══ SCENE 1 & 2: HOGWARTS CINEMATIC OPENING EXPERIENCE ═══ */}
      <AnimatePresence>
        {showCinematicIntro && (
          <motion.div
            key="hogwarts-intro"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: 'brightness(1.5) blur(10px)'
            }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99990
            }}
          >
            <HogwartsCinematicIntro onComplete={handleCinematicComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ REPLAY CINEMATIC BUTTON (AVAILABLE ONCE PORTFOLIO IS ENTERED) ═══ */}
      {!showCinematicIntro && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            position: 'fixed',
            top: '1.75rem',
            right: '2rem',
            zIndex: 999,
            display: 'block'
          }}
        >
          <button
            type="button"
            onClick={handleReplayCinematic}
            aria-label="Replay Hogwarts cinematic camera flight"
            className="interactive-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.45rem 1rem',
              background: 'rgba(3, 11, 7, 0.78)',
              border: '1px solid var(--gold-border-bright)',
              borderRadius: '9999px',
              color: 'var(--gold-bright)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.6), 0 0 12px rgba(212, 175, 55, 0.25)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              e.currentTarget.style.boxShadow =
                '0 6px 24px rgba(0, 0, 0, 0.8), 0 0 18px rgba(212, 175, 55, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow =
                '0 4px 18px rgba(0, 0, 0, 0.6), 0 0 12px rgba(212, 175, 55, 0.25)';
            }}
          >
            <Film size={14} style={{ color: 'var(--gold-bright)' }} />
            <span>REPLAY ARRIVAL</span>
          </button>
        </motion.div>
      )}

      {/* ═══ SCENE 3 & SUBSEQUENT: EXISTING HORCRUX WEBSITE ═══ */}
      <main>
        {/* HORCRUX Cinematic Team Introduction Section */}
        <HorcruxIntro />

        {/* ═══ INDIVIDUAL WIZARD INTRODUCTIONS ═══ */}
        {TEAM_MEMBERS.map((member) => (
          <WizardMemberIntro key={member.id} member={member} />
        ))}

        <section aria-label="Enchanted artifacts" style={{ padding: '5rem 1.5rem', textAlign: 'center', background: 'var(--bg-emerald-deep)', borderTop: '1px solid rgba(197, 160, 89, 0.15)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', letterSpacing: '0.12em', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>ENCHANTED ARTIFACTS</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-silver)', maxWidth: 560, margin: '1rem auto 1.8rem', lineHeight: 1.6 }}>
            Six projects from the HORCRUX archive, including live gesture-volume and harbor-queue modules.
          </p>
          <Link to="/projects" className="interactive-hover" style={{ padding: '0.65rem 1.6rem', border: '1px solid var(--gold-border-bright)', borderRadius: 9999, color: 'var(--gold-bright)', fontFamily: 'var(--font-display)', fontSize: '0.78rem', letterSpacing: '0.18em', textDecoration: 'none' }}>
            OPEN THE ARCHIVE
          </Link>
        </section>
      </main>

      {/* Archival Footer */}
      <ArchivalFooter />
    </div>
  );
};

export const App: React.FC = () => (
  <Suspense fallback={<div role="status" style={{ minHeight: '100vh', background: 'var(--bg-abyss)', color: 'var(--gold-mid)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', letterSpacing: '0.2em' }}>LOADING…</div>}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<ProjectsHub />} />
    <Route path="/projects/:slug" element={<ProjectDetail />} />
    <Route path="*" element={<ProjectsHub />} />
  </Routes>
  </Suspense>
);

export default App;