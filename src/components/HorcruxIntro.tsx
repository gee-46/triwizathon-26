import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Trophy,
  Compass,
  Shield,
  BookOpen,
  Scroll,
  Zap,
  Flame,
  Star
} from 'lucide-react';
import { MagicalParticles } from './MagicalParticles';

interface HorcruxIntroProps {
  onScrollToWizards?: () => void;
}

export const HorcruxIntro: React.FC<HorcruxIntroProps> = ({ onScrollToWizards }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setIsInside(true);
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      } else {
        setIsInside(false);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleScrollClick = () => {
    if (onScrollToWizards) {
      onScrollToWizards();
    } else {
      const element = document.getElementById('wizards-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const cities = [
    { city: "Belagavi", status: "Been there.", state: "Karnataka", icon: "🏰" },
    { city: "Bengaluru", status: "We pulled up.", state: "Karnataka", icon: "⚡" },
    { city: "Mangaluru", status: "Made our move.", state: "Karnataka", icon: "🌊" },
    { city: "Coimbatore", status: "Left our mark.", state: "Tamil Nadu", icon: "⚔️" }
  ];

  return (
    <section
      ref={sectionRef}
      id="horcrux-intro"
      aria-label="HORCRUX Team Manifesto & Introduction"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-abyss)',
        padding: '5.5rem 1.5rem 5rem'
      }}
    >
      {/* ═══ 1. AMBIENT SHADOWY SLYTHERIN COMMON ROOM (BASE LAYER) ═══ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/slytherin_common_room.png)',
          backgroundPosition: 'center 38%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.2) saturate(1.05) contrast(1.15)',
          transform: mousePos
            ? `scale(1.04) translate3d(${(mousePos.x / (sectionRef.current?.clientWidth || 1) - 0.5) * -16}px, ${(mousePos.y / (sectionRef.current?.clientHeight || 1) - 0.5) * -12}px, 0)`
            : 'scale(1.02)',
          transition: 'transform 0.15s ease-out',
          zIndex: 0
        }}
        aria-hidden="true"
      />

      {/* ═══ 2. DYNAMIC LUMOS SPOTLIGHT REVEAL (BRIGHT COMMON ROOM ILLUMINATED BY CURSOR) ═══ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/slytherin_common_room.png)',
          backgroundPosition: 'center 38%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(1.18) saturate(1.25) contrast(1.2)',
          transform: mousePos
            ? `scale(1.04) translate3d(${(mousePos.x / (sectionRef.current?.clientWidth || 1) - 0.5) * -16}px, ${(mousePos.y / (sectionRef.current?.clientHeight || 1) - 0.5) * -12}px, 0)`
            : 'scale(1.02)',
          transition: 'transform 0.15s ease-out, opacity 0.25s ease',
          WebkitMaskImage: mousePos && isInside
            ? `radial-gradient(circle 420px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.25) 70%, transparent 100%)`
            : 'radial-gradient(circle 460px at 50% 35%, rgba(0,0,0,0.7) 0%, transparent 80%)',
          maskImage: mousePos && isInside
            ? `radial-gradient(circle 420px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.25) 70%, transparent 100%)`
            : 'radial-gradient(circle 460px at 50% 35%, rgba(0,0,0,0.7) 0%, transparent 80%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />

      {/* ═══ 3. WAND LUMOS EMERALD & GOLDEN LIGHT BEAM FOLLOWING CURSOR ═══ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: mousePos && isInside
            ? `radial-gradient(circle 450px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 230, 160, 0.28) 0%, rgba(32, 140, 85, 0.18) 42%, rgba(10, 45, 25, 0.08) 68%, transparent 85%)`
            : 'none',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'background 0.08s ease-out'
        }}
        aria-hidden="true"
      />

      {/* Layered Cinematic Vignette & Deep Emerald Fog */}
      <div className="cinematic-vignette" aria-hidden="true" />
      <div className="cinematic-emerald-glow" aria-hidden="true" />

      {/* Floating Ambient Stardust Particles */}
      <MagicalParticles />

      {/* ═══ TOP FLOATING ARCHIVAL DOCK ═══ */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          zIndex: 10
        }}
      >
        <nav
          aria-label="Archive navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.45rem 1rem',
            background: 'rgba(3, 11, 7, 0.76)',
            border: '1px solid var(--gold-border-subtle)',
            borderRadius: '9999px',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          <a
            href="#horcrux-intro"
            aria-label="Horcrux Sanctum"
            className="interactive-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid var(--gold-border-bright)',
              color: 'var(--gold-bright)',
              transition: 'all 0.2s ease'
            }}
          >
            <Compass size={17} />
          </a>
          <a
            href="#wizards-section"
            aria-label="The Four Wizards"
            className="interactive-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(10, 30, 20, 0.5)',
              border: '1px solid var(--gold-border-subtle)',
              color: 'var(--text-silver)',
              transition: 'all 0.2s ease'
            }}
          >
            <Shield size={16} />
          </a>
          <a
            href="#team-mission"
            aria-label="Forbidden Grimoire"
            className="interactive-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(10, 30, 20, 0.5)',
              border: '1px solid var(--gold-border-subtle)',
              color: 'var(--text-silver)',
              transition: 'all 0.2s ease'
            }}
          >
            <BookOpen size={16} />
          </a>
          <a
            href="#archives-footer"
            aria-label="Archives Scrolls"
            className="interactive-hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(10, 30, 20, 0.5)',
              border: '1px solid var(--gold-border-subtle)',
              color: 'var(--text-silver)',
              transition: 'all 0.2s ease'
            }}
          >
            <Scroll size={16} />
          </a>
        </nav>
      </motion.header>

      {/* ═══ SLYTHERIN / CHAMPIONS CORNER CREST BADGE ═══ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{
          position: 'absolute',
          top: '1.75rem',
          right: '2rem',
          zIndex: 10,
          display: 'none'
        }}
        className="crest-badge-desktop"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.9rem',
            background: 'rgba(4, 15, 10, 0.7)',
            border: '1px solid var(--gold-border-subtle)',
            borderRadius: '9999px',
            backdropFilter: 'blur(10px)',
            color: 'var(--gold-mid)',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase'
          }}
        >
          <span style={{ color: 'var(--gold-bright)' }}>✦</span>
          <span>SGU KOLHAPUR</span>
        </div>
      </motion.div>

      {/* ═══ MAIN HORCRUX HERO & MANIFESTO COMPOSITION ═══ */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '980px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '1.5rem',
          marginBottom: '2.5rem'
        }}
      >
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            marginBottom: '1rem'
          }}
        >
          <span
            style={{
              width: '28px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--gold-primary))',
              display: 'inline-block'
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.72rem, 1.5vw, 0.88rem)',
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--gold-mid)',
              textShadow: '0 0 14px rgba(212, 175, 55, 0.45)'
            }}
          >
            TRIWIZATHON 2026 · Team Name
          </span>
          <span
            style={{
              width: '28px',
              height: '1px',
              background: 'linear-gradient(90deg, var(--gold-primary), transparent)',
              display: 'inline-block'
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* ═══ DRAMATIC HARRY POTTER TITLE: HORCRUX ⚡ ═══ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            display: 'inline-block',
            margin: '0.1rem 0 0.8rem'
          }}
        >
          <div className="title-backlight" aria-hidden="true" />
          <h1
            className="fantasy-title"
            style={{
              fontSize: 'clamp(3.8rem, 10vw, 8.4rem)',
              margin: 0,
              padding: '0 0.4rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            <span>HORCRUX</span>
            <span
              style={{
                fontSize: '0.7em',
                color: 'var(--gold-bright)',
                filter: 'drop-shadow(0 0 20px #ffd978)'
              }}
            >
              ⚡
            </span>
          </h1>
        </motion.div>

        {/* ═══ SUBTITLE: Different cities. Different states. Same winning spell. 🥶 ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{
            marginBottom: '2rem'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.05rem, 2.3vw, 1.45rem)',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold-light)',
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.8), 0 0 24px rgba(212, 175, 55, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap'
            }}
          >
            <span>Different cities.</span>
            <span style={{ color: 'var(--gold-bright)' }}>·</span>
            <span>Different states.</span>
            <span style={{ color: 'var(--gold-bright)' }}>·</span>
            <span>Same winning spell.</span>
            <span>🥶</span>
          </h2>
        </motion.div>

        {/* ═══ 4 CONQUERED CITIES CARDS ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}
        >
          {cities.map((c) => (
            <div
              key={c.city}
              className="interactive-hover"
              style={{
                background: 'rgba(5, 18, 12, 0.75)',
                border: '1px solid var(--gold-border-subtle)',
                borderRadius: '12px',
                padding: '1.1rem 1.2rem',
                backdropFilter: 'blur(12px)',
                textAlign: 'left',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-border-bright)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow =
                  '0 8px 25px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.4rem'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{c.icon}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)'
                  }}
                >
                  {c.state}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: 'var(--gold-light)',
                  letterSpacing: '0.1em'
                }}
              >
                {c.city}?
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--text-silver)',
                  marginTop: '0.2rem'
                }}
              >
                {c.status}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ═══ TRACK RECORD & LEGACY PARCHMENT BOX ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.85 }}
          style={{
            width: '100%',
            background: 'rgba(4, 14, 9, 0.82)',
            border: '1px solid var(--gold-border-bright)',
            borderRadius: '16px',
            padding: '2.2rem 2rem',
            backdropFilter: 'blur(16px)',
            boxShadow:
              '0 12px 35px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(212, 175, 55, 0.08)',
            marginBottom: '2.5rem',
            textAlign: 'center'
          }}
        >
          {/* Headline quote */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
              lineHeight: 1.65,
              color: 'var(--text-parchment)',
              marginBottom: '1.4rem'
            }}
          >
            Four cities. Two states. Multiple national-level hackathons.
            <br />
            And guess what?{' '}
            <strong
              style={{
                color: 'var(--gold-bright)',
                textShadow: '0 0 16px rgba(255, 217, 120, 0.6)'
              }}
            >
              We've never returned to Hogwarts empty-handed. 🏆
            </strong>
          </p>

          {/* Achievements Ribbon Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
              justifyContent: 'center',
              marginBottom: '1.6rem'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid var(--gold-border-bright)',
                color: 'var(--gold-light)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.12em'
              }}
            >
              <Trophy size={15} style={{ color: 'var(--gold-bright)' }} />
              <span>TOP 30 to 2ND RUNNER-UP</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                background: 'rgba(6, 24, 16, 0.7)',
                border: '1px solid var(--gold-border-subtle)',
                color: 'var(--text-silver)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.12em'
              }}
            >
              <Star size={15} style={{ color: 'var(--gold-mid)' }} />
              <span>SCALER FINALS · BENGALURU</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                background: 'rgba(6, 24, 16, 0.7)',
                border: '1px solid var(--gold-border-subtle)',
                color: 'var(--text-silver)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.12em'
              }}
            >
              <Zap size={15} style={{ color: 'var(--gold-bright)' }} />
              <span>ECONOMIC TIMES AI HACKATHON 2.0 SEMI-FINALISTS</span>
            </div>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontStyle: 'italic',
              color: 'var(--text-silver)',
              lineHeight: 1.6,
              maxWidth: '820px',
              margin: '0 auto 1.2rem'
            }}
          >
            “From cracking the Top 30 to securing 2nd Runner-Up, we're not just collecting badges
            like Chocolate Frog cards — we're building a legacy.”
          </p>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.92rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              maxWidth: '750px',
              margin: '0 auto'
            }}
          >
            Different challenges. Unforgivable deadlines. Sleepless nights. A little controlled
            chaos. Still, we show up. We build. We deliver.{' '}
            <em style={{ color: 'var(--gold-mid)', fontFamily: 'var(--font-serif)' }}>
              Mischief managed? Not quite.
            </em>
          </p>
        </motion.div>

        {/* ═══ THE TRIWIZATHON 2026 WAR DECLARATION ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.0 }}
          style={{
            width: '100%',
            background:
              'radial-gradient(ellipse at center, rgba(16, 68, 44, 0.45) 0%, rgba(3, 12, 8, 0.88) 75%)',
            border: '2px solid var(--gold-border-bright)',
            borderRadius: '18px',
            padding: '2.5rem 2rem',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 175, 55, 0.28)',
            marginBottom: '2.5rem',
            textAlign: 'center'
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.45rem 1.2rem',
              borderRadius: '9999px',
              background: 'rgba(212, 175, 55, 0.16)',
              border: '1px solid var(--gold-border-bright)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.22em',
              color: 'var(--gold-bright)',
              textTransform: 'uppercase',
              marginBottom: '1.2rem'
            }}
          >
            <span>TRIWIZATHON 2026.</span>
            <span>👀⚡</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.35rem, 3.2vw, 2.1rem)',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: 'var(--gold-light)',
              textTransform: 'uppercase',
              textShadow: '0 2px 18px rgba(0, 0, 0, 0.8)',
              marginBottom: '1.2rem'
            }}
          >
            Sanjay Ghodawat University, Kolhapur — you're next.
          </h3>

          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              fontStyle: 'italic',
              color: 'var(--text-parchment)',
              lineHeight: 1.7,
              maxWidth: '720px',
              margin: '0 auto 1.8rem'
            }}
          >
            <p style={{ margin: '0 0 0.4rem' }}>
              We're not apparating all the way there just for the experience.
            </p>
            <p style={{ margin: '0 0 0.4rem' }}>
              We're not entering the Triwizard Tournament just to participate.
            </p>
            <p
              style={{
                margin: 0,
                color: 'var(--gold-bright)',
                fontWeight: 600
              }}
            >
              We've got our wands ready, our spells memorised, and our eyes on the Cup.
            </p>
          </div>

          {/* ACCIO VICTORY CHANT */}
          <div
            style={{
              padding: '1.4rem 1.8rem',
              background: 'rgba(2, 8, 5, 0.8)',
              borderRadius: '12px',
              border: '1px solid var(--gold-border-bright)',
              display: 'inline-block',
              margin: '0.5rem auto 1.2rem'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4.2vw, 2.8rem)',
                fontWeight: 900,
                letterSpacing: '0.18em',
                background: 'linear-gradient(180deg, #fff3c4 0%, #ffd978 40%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(255, 217, 120, 0.6))',
                marginBottom: '0.4rem'
              }}
            >
              ACCIO VICTORY. 🏆
            </div>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.88rem, 1.8vw, 1.15rem)',
                fontWeight: 800,
                letterSpacing: '0.2em',
                color: 'var(--text-silver)',
                textTransform: 'uppercase'
              }}
            >
              HORCRUX is pulling up to win.{' '}
              <span style={{ color: 'var(--gold-bright)' }}>PERIOD.</span>
            </div>
          </div>
        </motion.div>

        {/* ═══ INTERACTIVE CALL-TO-ACTIONS ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}
        >
          <button
            type="button"
            onClick={handleScrollClick}
            className="gold-pill-button interactive-hover"
            aria-label="Scroll down to meet the team wizards"
          >
            <Flame size={16} style={{ color: 'var(--gold-bright)' }} />
            <span>MEET THE FOUR BEHIND THE MADNESS</span>
          </button>

          <a
            href="#team-mission"
            className="gold-pill-button gold-pill-secondary interactive-hover"
            aria-label="Learn about team mission charter"
          >
            <BookOpen size={16} />
            <span>OUR SACRED CHARTER</span>
          </a>
        </motion.div>
      </div>

      {/* ═══ CLOSING PROMPT & ANIMATED DOWNWARD INDICATOR ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        style={{
          marginTop: 'auto',
          zIndex: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.45rem',
          paddingTop: '1.5rem',
          paddingBottom: '1rem'
        }}
      >
        <button
          type="button"
          onClick={handleScrollClick}
          className="interactive-hover"
          aria-label="Scroll to meet the four behind the madness"
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--gold-mid)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            transition: 'color 0.25s ease, transform 0.25s ease',
            padding: '0.5rem 1rem'
          }}
        >
          <span
            style={{
              textShadow: '0 0 14px rgba(212, 175, 55, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>↓</span>
            <span>Scroll down. Meet the four behind the madness.</span>
          </span>
          <div className="animate-scroll-indicator">
            <ChevronDown
              size={22}
              style={{
                color: 'var(--gold-bright)',
                filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.8))'
              }}
            />
          </div>
        </button>
      </motion.div>

      {/* Media query styling inline for corner badge */}
      <style>{`
        @media (min-width: 768px) {
          .crest-badge-desktop {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};
