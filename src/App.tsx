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
import { Film, BookOpen } from 'lucide-react';

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

      {/* ═══ TOP FIXED CONTROLS (REPLAY ARRIVAL & JUMP TO PENSIEVE) ═══ */}
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
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <Link
            to="/projects"
            aria-label="Open The Pensieve project archive"
            className="interactive-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.45rem 1rem',
              background: 'rgba(3, 11, 7, 0.85)',
              border: '1px solid var(--gold-border-bright)',
              borderRadius: '9999px',
              color: 'var(--gold-bright)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              backdropFilter: 'blur(12px)',
              boxShadow:
                '0 4px 18px rgba(0, 0, 0, 0.6), 0 0 12px rgba(212, 175, 55, 0.25)',
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
            <BookOpen size={14} style={{ color: 'var(--gold-bright)' }} />
            <span>THE PENSIEVE</span>
          </Link>

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
              boxShadow:
                '0 4px 18px rgba(0, 0, 0, 0.6), 0 0 12px rgba(212, 175, 55, 0.25)',
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

        <section
          aria-label="The Pensieve - Enchanted Archive"
          style={{
            padding: '5.5rem 1.5rem',
            textAlign: 'center',
            background: 'var(--bg-emerald-deep)',
            borderTop: '1px solid rgba(197, 160, 89, 0.2)'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.24em',
              color: 'var(--gold-mid)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem'
            }}
          >
            ✦ HORCRUX / THE ARCHIVE OF BUILDS ✦
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-fantasy)',
              color: 'var(--gold-bright)',
              letterSpacing: '0.08em',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              textTransform: 'uppercase',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
            }}
          >
            THE PENSIEVE
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'var(--text-parchment)',
              maxWidth: 580,
              margin: '0.8rem auto 2.2rem',
              lineHeight: 1.6
            }}
          >
            “Ideas are common. Execution is the magic.”
          </p>
          <Link
            to="/projects"
            className="interactive-hover"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.85rem 2.2rem',
              background:
                'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(18, 76, 50, 0.4))',
              border: '2px solid var(--gold-border-bright)',
              borderRadius: 9999,
              color: 'var(--gold-bright)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.84rem',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow:
                '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 175, 55, 0.35)'
            }}
          >
            <BookOpen size={16} />
            <span>OPEN THE ARCHIVE ✦</span>
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