import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import { MagicalParticles } from '../MagicalParticles';

interface BookEntranceProps {
  onOpenArchive: () => void;
  isOpen: boolean;
}

export const BookEntrance: React.FC<BookEntranceProps> = ({
  onOpenArchive,
  isOpen
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="book-entrance-container"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '780px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem 6rem',
        overflow: 'hidden'
      }}
    >
      {/* Golden Magical Embers Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <MagicalParticles />
      </div>

      {/* Atmospheric Radial Glow & Lighting Cone */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(25, 82, 57, 0.15) 45%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          maxWidth: '820px',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Top Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.35rem 1rem',
            background: 'rgba(5, 18, 12, 0.75)',
            border: '1px solid var(--gold-border-subtle)',
            borderRadius: '9999px',
            marginBottom: '1rem',
            boxShadow: '0 0 16px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Sparkles size={14} style={{ color: 'var(--gold-bright)' }} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--gold-mid)'
            }}
          >
            HORCRUX / THE ARCHIVE OF BUILDS
          </span>
          <Sparkles size={14} style={{ color: 'var(--gold-bright)' }} />
        </div>

        {/* Section Main Title */}
        <h2
          style={{
            fontFamily: 'var(--font-fantasy)',
            fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
            fontWeight: 900,
            letterSpacing: '0.08em',
            lineHeight: 1.05,
            color: 'var(--gold-bright)',
            textTransform: 'uppercase',
            marginBottom: '0.85rem',
            textShadow:
              '0 0 24px rgba(212, 175, 55, 0.45), 0 4px 18px rgba(0, 0, 0, 0.9)'
          }}
        >
          THE PENSIEVE
        </h2>

        {/* Cinematic Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
            fontStyle: 'italic',
            letterSpacing: '0.04em',
            color: 'var(--text-parchment)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
          }}
        >
          “Ideas are common. Execution is the magic.”
        </p>
      </motion.div>

      {/* ══════════════════════════════════════════
          THE 3D ENCHANTED FLOATING SPELLBOOK
          ══════════════════════════════════════════ */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            perspective: '1500px',
            position: 'relative',
            zIndex: 10,
            cursor: 'pointer',
            margin: '1rem 0 3rem'
          }}
          onClick={onOpenArchive}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Floating Spellbook Animation Container */}
          <motion.div
            animate={{
              y: isHovered ? -16 : [-8, 8, -8],
              rotateX: isHovered ? 12 : [8, 12, 8],
              rotateY: isHovered ? -14 : [-10, -4, -10],
              rotateZ: isHovered ? -2 : [-1, 1, -1]
            }}
            transition={{
              y: {
                repeat: isHovered ? 0 : Infinity,
                duration: 5,
                ease: 'easeInOut'
              },
              rotateX: {
                repeat: isHovered ? 0 : Infinity,
                duration: 5,
                ease: 'easeInOut'
              },
              rotateY: {
                repeat: isHovered ? 0 : Infinity,
                duration: 6,
                ease: 'easeInOut'
              },
              rotateZ: {
                repeat: isHovered ? 0 : Infinity,
                duration: 5,
                ease: 'easeInOut'
              }
            }}
            style={{
              width: '320px',
              height: '420px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          >
            {/* Front Leather Cover */}
            <div
              className="spellbook-cover-front"
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px 20px 20px 12px',
                background:
                  'url(/images/enchanted_book_cover.jpg) center/cover no-repeat, linear-gradient(135deg, #0d3822 0%, #06170d 100%)',
                boxShadow:
                  '0 24px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.35), inset 0 0 25px rgba(0, 0, 0, 0.7)',
                border: '2px solid rgba(212, 175, 55, 0.65)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem 1.5rem',
                transform: 'translateZ(18px)',
                overflow: 'hidden'
              }}
            >
              {/* Subtle Gold Shimmer Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(115deg, transparent 40%, rgba(255, 230, 150, 0.22) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  opacity: isHovered ? 0.8 : 0.4,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none'
                }}
              />

              {/* Runic Inscriptions on Cover Borders */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.22em',
                  color: 'var(--gold-bright)',
                  textTransform: 'uppercase',
                  opacity: 0.9,
                  textShadow: '0 0 8px rgba(212, 175, 55, 0.8)'
                }}
              >
                <span>᚛ HORCRUX ᚜</span>
                <span>VOL. XXVI</span>
              </div>

              {/* Center Seal Emblem */}
              <div
                style={{
                  textAlign: 'center',
                  padding: '1.5rem 0'
                }}
              >
                <div
                  style={{
                    width: '92px',
                    height: '92px',
                    margin: '0 auto 1rem',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 217, 120, 0.7)',
                    background:
                      'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(5, 25, 15, 0.8) 70%)',
                    boxShadow:
                      '0 0 24px rgba(212, 175, 55, 0.5), inset 0 0 15px rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-bright)'
                  }}
                >
                  <Compass size={46} strokeWidth={1.5} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-fantasy)',
                    fontSize: '1.6rem',
                    letterSpacing: '0.12em',
                    color: '#fff',
                    textShadow:
                      '0 0 16px rgba(212, 175, 55, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)',
                    marginBottom: '0.35rem'
                  }}
                >
                  THE PENSIEVE
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.24em',
                    color: 'var(--gold-mid)',
                    textTransform: 'uppercase'
                  }}
                >
                  GRIMOIRE OF BUILDS
                </span>
              </div>

              {/* Bottom Inscription */}
              <div
                style={{
                  textAlign: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.78rem',
                  fontStyle: 'italic',
                  color: 'var(--gold-light)',
                  opacity: 0.95
                }}
              >
                ✦ Click to break the ward & reveal the builds ✦
              </div>
            </div>

            {/* Book Spine (Left Side Thickness) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '36px',
                transformOrigin: 'left center',
                transform: 'rotateY(-90deg)',
                background:
                  'linear-gradient(180deg, #092114, #041009 50%, #092114)',
                borderLeft: '1px solid var(--gold-border-bright)',
                borderRight: '1px solid var(--gold-border-bright)',
                boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.28em',
                  color: 'var(--gold-mid)',
                  textTransform: 'uppercase'
                }}
              >
                HORCRUX · ARCHIVE
              </span>
            </div>

            {/* Page Block (Gilded Deckle Edge on Right) */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                bottom: '12px',
                right: '-16px',
                width: '36px',
                transformOrigin: 'left center',
                transform: 'rotateY(90deg)',
                background:
                  'repeating-linear-gradient(180deg, #f5e5a6 0px, #b89742 2px, #f5e5a6 4px)',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.6)',
                borderRadius: '2px'
              }}
            />

            {/* Back Leather Cover Shadow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px 20px 20px 12px',
                background: '#041009',
                transform: 'translateZ(-18px)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9)'
              }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* CTA BUTTON: [ OPEN THE ARCHIVE ✦ ] */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ position: 'relative', zIndex: 12 }}
        >
          <button
            type="button"
            onClick={onOpenArchive}
            aria-label="Open the Horcrux enchanted archive of builds"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '1rem 2.5rem',
              background:
                'linear-gradient(135deg, rgba(212, 175, 55, 0.32) 0%, rgba(18, 76, 50, 0.5) 50%, rgba(212, 175, 55, 0.32) 100%)',
              border: '2px solid var(--gold-border-bright)',
              borderRadius: '9999px',
              color: 'var(--gold-bright)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.92rem',
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              backdropFilter: 'blur(16px)',
              boxShadow:
                '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 24px rgba(212, 175, 55, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
              e.currentTarget.style.boxShadow =
                '0 12px 42px rgba(0, 0, 0, 0.9), 0 0 36px rgba(255, 217, 120, 0.7)';
              e.currentTarget.style.borderColor = 'var(--gold-bright)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow =
                '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 24px rgba(212, 175, 55, 0.4)';
              e.currentTarget.style.borderColor = 'var(--gold-border-bright)';
            }}
          >
            <Sparkles size={18} style={{ color: 'var(--gold-bright)' }} />
            <span>OPEN THE ARCHIVE ✦</span>
            <Sparkles size={18} style={{ color: 'var(--gold-bright)' }} />
          </button>
        </motion.div>
      )}
    </div>
  );
};
