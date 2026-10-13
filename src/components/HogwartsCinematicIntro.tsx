import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, ChevronRight, Eye, Sparkles } from 'lucide-react';

interface HogwartsCinematicIntroProps {
  onComplete: () => void;
  isCompleted?: boolean;
}

interface BeatInfo {
  tag: string;
  title: string;
  subtitle: string;
}

const BEATS: { range: [number, number]; info: BeatInfo }[] = [
  {
    range: [0, 0.28],
    info: {
      tag: "BEAT I · THE ANCIENT VIADUCT",
      title: "APPROACHING HOGWARTS",
      subtitle: "Across the chasm of time and stone, the forbidden fortress awakens."
    }
  },
  {
    range: [0.28, 0.55],
    info: {
      tag: "BEAT II · FORWARD FLIGHT",
      title: "THE EMBERS OF ENCHANTMENT",
      subtitle: "Blazing torches guide the path toward the citadel of ancient magic."
    }
  },
  {
    range: [0.55, 0.80],
    info: {
      tag: "BEAT III · THROUGH THE STORM",
      title: "PIERCING THE SHADOW VEIL",
      subtitle: "Volumetric emerald clouds billow as ancient wards yield passage."
    }
  },
  {
    range: [0.80, 1.0],
    info: {
      tag: "BEAT IV · THE GRAND SANCTUM",
      title: "ENTERING HORCRUX",
      subtitle: "Step through the golden portal into the Triwizathon 2026 archives."
    }
  }
];

export const HogwartsCinematicIntro: React.FC<HogwartsCinematicIntroProps> = ({
  onComplete,
  isCompleted = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Journey progress (0.0 to 1.0)
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  // Loaded images storage
  const imagesRef = useRef<{
    establishing: HTMLImageElement | null;
    approach: HTMLImageElement | null;
    clouds: HTMLImageElement | null;
    entrance: HTMLImageElement | null;
  }>({
    establishing: null,
    approach: null,
    clouds: null,
    entrance: null
  });

  // Preload all high-res cinematic keyframe assets
  useEffect(() => {
    let loadedCount = 0;
    const totalToLoad = 4;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalToLoad) {
        setIsLoaded(true);
      }
    };

    const img1 = new Image();
    img1.src = '/intro/bridge-establishing.jpg';
    img1.onload = () => {
      imagesRef.current.establishing = img1;
      checkAllLoaded();
    };

    const img2 = new Image();
    img2.src = '/intro/bridge-approach.jpg';
    img2.onload = () => {
      imagesRef.current.approach = img2;
      checkAllLoaded();
    };

    const img3 = new Image();
    img3.src = '/intro/clouds-overlay.jpg';
    img3.onload = () => {
      imagesRef.current.clouds = img3;
      checkAllLoaded();
    };

    const img4 = new Image();
    img4.src = '/intro/castle-entrance.jpg';
    img4.onload = () => {
      imagesRef.current.entrance = img4;
      checkAllLoaded();
    };
  }, []);

  // Autonomous camera journey loop
  useEffect(() => {
    if (!isLoaded || isCompleted || !isAutoplay) return;

    // 7.5 seconds total cinematic flight
    const duration = 7500;
    const startTime = performance.now();

    let animId: number;

    const animateJourney = (time: number) => {
      const elapsed = time - startTime;
      const rawProg = Math.min(1, elapsed / duration);

      // Smooth cinematic easeInOutCubic
      const easedProg =
        rawProg < 0.5
          ? 4 * rawProg * rawProg * rawProg
          : 1 - Math.pow(-2 * rawProg + 2, 3) / 2;

      progressRef.current = easedProg;
      setProgress(easedProg);

      if (rawProg < 1) {
        animId = requestAnimationFrame(animateJourney);
      } else {
        // Complete journey and transition smoothly
        setTimeout(() => {
          onComplete();
        }, 350);
      }
    };

    animId = requestAnimationFrame(animateJourney);

    return () => cancelAnimationFrame(animId);
  }, [isLoaded, isCompleted, isAutoplay, onComplete]);

  // Interactive mouse parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    setMouseParallax({ x, y });
  }, []);

  // Interactive wheel scroll scrub
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      setIsAutoplay(false); // Switch to manual scroll exploration
      const delta = e.deltaY * 0.0008;
      const newProg = Math.max(0, Math.min(1, progressRef.current + delta));
      progressRef.current = newProg;
      setProgress(newProg);

      if (newProg >= 0.99) {
        onComplete();
      }
    },
    [onComplete]
  );

  // Render cinematic camera scene onto Canvas with genuine 3D perspective layers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      ctx.clearRect(0, 0, width, height);

      const p = progressRef.current;
      const { establishing, approach, clouds, entrance } = imagesRef.current;

      // Parallax offsets
      const px = mouseParallax.x * 24;
      const py = mouseParallax.y * 18;

      // Helper function for perspective draw
      const drawLayer = (
        img: HTMLImageElement | null,
        zoom: number,
        alpha: number,
        offsetX: number = 0,
        offsetY: number = 0
      ) => {
        if (!img || alpha <= 0.001) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        const targetW = width * zoom;
        const targetH = height * zoom;
        const dx = (width - targetW) / 2 + px * offsetX;
        const dy = (height - targetH) / 2 + py * offsetY;

        ctx.drawImage(img, dx, dy, targetW, targetH);
        ctx.restore();
      };

      // ═══ CAMERA BEATS CROSS-PROJECTION ═══
      // Beat A -> B: Establishing viaduct -> bridge approach
      if (p <= 0.55) {
        const localP = p / 0.55;
        const zoom1 = 1.0 + 0.24 * localP;
        const alpha1 = Math.max(0, 1 - localP * 1.6);
        drawLayer(establishing, zoom1, alpha1, 0.6, 0.4);

        if (localP > 0.2) {
          const blendIn = (localP - 0.2) / 0.8;
          const zoom2 = 1.0 + 0.28 * blendIn;
          drawLayer(approach, zoom2, blendIn, 0.9, 0.6);
        }
      } else {
        // Beat B -> C -> D: Approach -> Clouds -> Castle Entrance
        const localP = (p - 0.55) / 0.45;

        // Bridge fades into entrance
        const zoom2 = 1.28 + 0.18 * localP;
        const alpha2 = Math.max(0, 1 - localP * 2.2);
        drawLayer(approach, zoom2, alpha2, 0.9, 0.6);

        // Volumetric storm cloud sweep during mid-flight
        if (clouds) {
          const cloudP = Math.sin(localP * Math.PI);
          const cloudZoom = 1.0 + 0.35 * localP;
          drawLayer(clouds, cloudZoom, cloudP * 0.72, 1.4, 0.9);
        }

        // Castle entrance emerges majestically
        if (localP > 0.15) {
          const entranceP = (localP - 0.15) / 0.85;
          const entranceZoom = 1.0 + 0.26 * Math.pow(entranceP, 1.4);
          drawLayer(entrance, entranceZoom, entranceP, 0.4, 0.3);
        }
      }

      // ═══ CINEMATIC POST-PROCESSING OVERLAYS ═══
      // 1. Deep emerald vignette
      const vignetteGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.28,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.78
      );
      vignetteGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignetteGrad.addColorStop(0.65, 'rgba(2, 8, 5, 0.45)');
      vignetteGrad.addColorStop(1, 'rgba(2, 6, 4, 0.94)');
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Entrance Golden Portal Bloom at journey finale
      if (p > 0.78) {
        const bloomP = (p - 0.78) / 0.22;
        const bloomGrad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          width * 0.6
        );
        bloomGrad.addColorStop(0, `rgba(255, 225, 140, ${bloomP * 0.45})`);
        bloomGrad.addColorStop(0.4, `rgba(212, 175, 55, ${bloomP * 0.25})`);
        bloomGrad.addColorStop(1, 'rgba(10, 40, 25, 0)');
        ctx.fillStyle = bloomGrad;
        ctx.fillRect(0, 0, width, height);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [mouseParallax]);

  // Current beat info
  const currentBeat =
    BEATS.find((b) => progress >= b.range[0] && progress <= b.range[1])?.info ||
    BEATS[0].info;

  if (isCompleted) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99990,
        backgroundColor: '#020704',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* ═══ REAL-TIME 3D PERSPECTIVE CANVAS ═══ */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />

      {/* ═══ TOP STATUS BAR & CONTROLS ═══ */}
      <header
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          right: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}
      >
        {/* Hogwarts Archives Seal */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid var(--gold-border-bright)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-bright)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
            }}
          >
            <Sparkles size={18} />
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.22em',
                color: 'var(--gold-light)',
                textTransform: 'uppercase'
              }}
            >
              HOGWARTS ARRIVAL SEQUENCE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.86rem',
                fontStyle: 'italic',
                color: 'var(--text-silver)',
                letterSpacing: '0.04em'
              }}
            >
              Triwizathon 2026 · Cinematic Chamber Entrance
            </div>
          </div>
        </div>

        {/* Action Controls: Skip & Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          {/* Autoplay / Scrub Status */}
          <button
            type="button"
            onClick={() => setIsAutoplay((prev) => !prev)}
            aria-label="Toggle camera flight mode"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              background: 'rgba(4, 15, 10, 0.7)',
              border: '1px solid var(--gold-border-subtle)',
              borderRadius: '9999px',
              color: 'var(--gold-mid)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease'
            }}
          >
            <Eye size={14} />
            <span>{isAutoplay ? 'CAMERA FLIGHT: AUTO' : 'SCROLL TO EXPLORE'}</span>
          </button>

          {/* Instant Skip Intro Button */}
          <button
            type="button"
            onClick={onComplete}
            aria-label="Skip Hogwarts intro and view portfolio immediately"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.6rem 1.4rem',
              background: 'rgba(212, 175, 55, 0.14)',
              border: '1px solid var(--gold-border-bright)',
              borderRadius: '9999px',
              color: 'var(--gold-bright)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              backdropFilter: 'blur(14px)',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.28)',
              transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.3)';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.14)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Wand2 size={15} />
            <span>SKIP INTRO</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </header>

      {/* ═══ BEAT CAPTION & NARRATIVE OVERLAY ═══ */}
      <div
        style={{
          position: 'absolute',
          bottom: '5.5rem',
          left: '2rem',
          right: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBeat.tag}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55 }}
            style={{ maxWidth: '780px' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.3em',
                color: 'var(--gold-bright)',
                textTransform: 'uppercase',
                marginBottom: '0.45rem',
                textShadow: '0 0 14px rgba(212, 175, 55, 0.6)'
              }}
            >
              ✦ {currentBeat.tag} ✦
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3.8vw, 2.6rem)',
                fontWeight: 900,
                letterSpacing: '0.14em',
                color: 'var(--text-parchment)',
                textTransform: 'uppercase',
                textShadow: '0 3px 20px rgba(0, 0, 0, 0.9)',
                marginBottom: '0.5rem'
              }}
            >
              {currentBeat.title}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                fontStyle: 'italic',
                color: 'var(--text-silver)',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.95)',
                margin: 0
              }}
            >
              “{currentBeat.subtitle}”
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══ BOTTOM ANTIQUE GOLD TIMELINE & SCRUBBER ═══ */}
      <footer
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2.5rem',
          right: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.4rem',
          zIndex: 10
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.16em',
            color: 'var(--gold-mid)',
            minWidth: '55px'
          }}
        >
          {Math.round(progress * 100)}%
        </span>

        {/* Interactive Scrub Track */}
        <div
          onClick={(e) => {
            setIsAutoplay(false);
            const rect = e.currentTarget.getBoundingClientRect();
            const clickP = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            progressRef.current = clickP;
            setProgress(clickP);
          }}
          style={{
            flex: 1,
            height: '4px',
            background: 'rgba(212, 175, 55, 0.18)',
            borderRadius: '9999px',
            position: 'relative',
            cursor: 'pointer',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: `${progress * 100}%`,
              background: 'linear-gradient(90deg, var(--gold-mid), var(--gold-bright))',
              borderRadius: '9999px',
              boxShadow: '0 0 10px rgba(255, 217, 120, 0.7)'
            }}
          />
        </div>

        {/* Beats Navigation Markers */}
        <div
          style={{
            display: 'flex',
            gap: '0.8rem',
            color: 'var(--text-silver)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            letterSpacing: '0.16em'
          }}
        >
          <span>VIADUCT</span>
          <span style={{ color: 'var(--gold-mid)' }}>·</span>
          <span>CLOUDS</span>
          <span style={{ color: 'var(--gold-mid)' }}>·</span>
          <span>PORTAL</span>
        </div>
      </footer>
    </div>
  );
};
