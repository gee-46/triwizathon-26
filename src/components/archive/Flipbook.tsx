import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../data/projects';
import { ProjectSpread } from './ProjectSpread';

interface FlipbookProps {
  projects: Project[];
  currentIndex: number;
  isOpen: boolean;
  isFlipping: boolean;
  onExplore: (slug: string) => void;
  previewProject: Project | null;
  flipDirection: 'forward' | 'backward';
}

export const Flipbook: React.FC<FlipbookProps> = ({
  projects,
  currentIndex,
  isOpen,
  isFlipping,
  onExplore,
  previewProject,
  flipDirection
}) => {
  const currentProject = projects[currentIndex] || projects[0];
  const displayedProject = isFlipping && previewProject ? previewProject : currentProject;

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div
      className="flipbook-perspective-stage"
      style={{
        width: '100%',
        maxWidth: '1120px',
        margin: '0 auto',
        perspective: '2200px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '620px'
      }}
    >
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="open-grimoire"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.88,
                    rotateX: 15,
                    rotateY: -8,
                    y: 40
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              y: 0
            }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.9,
                    y: 30,
                    rotateX: 10
                  }
            }
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.85,
              ease: [0.2, 0.8, 0.2, 1]
            }}
            style={{
              width: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* 3D Physical Flipping Page Layer */}
            {isFlipping && !prefersReducedMotion && (
              <div
                className="flipping-page-layer"
                style={{
                  position: 'absolute',
                  top: '10px',
                  bottom: '10px',
                  right: '10px',
                  width: 'calc(50% - 10px)',
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                  zIndex: 30,
                  pointerEvents: 'none'
                }}
              >
                {/* Multi-layered dynamic flipping sheet */}
                <motion.div
                  initial={{
                    rotateY: flipDirection === 'forward' ? 0 : -180
                  }}
                  animate={{
                    rotateY: flipDirection === 'forward' ? -180 : 0
                  }}
                  transition={{
                    duration: 0.38,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut'
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                    borderRadius: '0 8px 8px 0',
                    background:
                      'linear-gradient(135deg, #f7f1e1 0%, #ebe2cb 100%)',
                    boxShadow:
                      '0 15px 35px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(120, 80, 20, 0.15)',
                    border: '1px solid rgba(138, 109, 43, 0.3)'
                  }}
                >
                  {/* Front side of flipping page: Rapid Project Preview Flash */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      padding: '2.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      background:
                        'radial-gradient(circle at center, #faf6ec 0%, #ebdcc0 100%)',
                      color: '#281c0f'
                    }}
                  >
                    <div
                      style={{
                        padding: '0.3rem 0.8rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(138, 109, 43, 0.4)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        color: '#8b6914',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        marginBottom: '1rem'
                      }}
                    >
                      ✦ TURNING TOME ✦
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-fantasy)',
                        fontSize: '1.9rem',
                        color: '#1a1208',
                        marginBottom: '0.5rem',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {previewProject ? previewProject.name : currentProject.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '0.95rem',
                        fontStyle: 'italic',
                        color: '#5c4327',
                        maxWidth: '280px'
                      }}
                    >
                      {previewProject
                        ? previewProject.tagline
                        : currentProject.tagline}
                    </p>
                  </div>

                  {/* Back side of flipping page */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      padding: '2.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      background:
                        'radial-gradient(circle at center, #faf6ec 0%, #e8d7b7 100%)',
                      color: '#281c0f'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.2em',
                        color: '#7a5a1f',
                        textTransform: 'uppercase'
                      }}
                    >
                      ᚛ HORCRUX ARCHIVE ᚜
                    </span>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Main Open Project Spread */}
            <motion.div
              animate={{
                filter: isFlipping ? 'blur(1px)' : 'blur(0px)',
                opacity: isFlipping ? 0.88 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <ProjectSpread
                project={displayedProject}
                onExplore={onExplore}
                isFlipping={isFlipping}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
