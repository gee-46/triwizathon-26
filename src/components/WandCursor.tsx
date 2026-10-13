import React, { useEffect, useState, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  dx: string;
  dy: string;
  size: number;
}

export const WandCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const wandRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const mouseCoordsRef = useRef({ x: -200, y: -200 });
  const isHoveringRef = useRef(false);
  const sparkleIdRef = useRef(0);

  useEffect(() => {
    // Check if device has fine pointer (desktop mouse)
    const mediaFine = window.matchMedia('(pointer: fine) and (hover: hover)');
    const updateEnabled = () => {
      const isFine = mediaFine.matches;
      setEnabled(isFine);
      if (isFine) {
        document.body.classList.add('wand-cursor-enabled');
      } else {
        document.body.classList.remove('wand-cursor-enabled');
      }
    };

    updateEnabled();
    mediaFine.addEventListener('change', updateEnabled);

    return () => {
      document.body.classList.remove('wand-cursor-enabled');
      mediaFine.removeEventListener('change', updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoordsRef.current = { x: e.clientX, y: e.clientY };

      // Check if mouse is hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest('a, button, [role="button"], input, textarea, select, .interactive-hover')
        );
        if (interactive !== isHoveringRef.current) {
          isHoveringRef.current = interactive;
          setIsHovering(interactive);
        }
      }
    };

    const updateCursorPosition = () => {
      const { x, y } = mouseCoordsRef.current;
      if (wandRef.current) {
        wandRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (auraRef.current) {
        auraRef.current.style.left = `${x}px`;
        auraRef.current.style.top = `${y}px`;
      }
      rafId = requestAnimationFrame(updateCursorPosition);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Check reduced motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      // Spawn golden sparkles from wand tip
      const count = 7;
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
        const distance = 16 + Math.random() * 26;
        newSparkles.push({
          id: ++sparkleIdRef.current,
          x: e.clientX,
          y: e.clientY,
          dx: `${Math.cos(angle) * distance}px`,
          dy: `${Math.sin(angle) * distance}px`,
          size: 3 + Math.random() * 3
        });
      }

      setSparkles((prev) => [...prev.slice(-15), ...newSparkles]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    rafId = requestAnimationFrame(updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  // Clean up finished sparkles
  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id > sparkleIdRef.current - 12));
    }, 700);
    return () => clearTimeout(timer);
  }, [sparkles]);

  if (!enabled) return null;

  return (
    <>
      {/* Lumos radial spotlight aura */}
      <div
        ref={auraRef}
        className={`wand-lumos-aura ${isHovering ? 'hovering' : ''}`}
        style={{
          left: '-200px',
          top: '-200px'
        }}
      />

      {/* Wand cursor element */}
      <div
        ref={wandRef}
        className="custom-wand-container"
        style={{
          transform: 'translate3d(-200px, -200px, 0)'
        }}
      >
        <div
          className={`custom-wand-element ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        >
          <img
            src="/images/wand1.png"
            alt=""
            draggable={false}
          />
        </div>
      </div>

      {/* Golden click sparkles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="wand-sparkle"
          style={
            {
              left: `${s.x}px`,
              top: `${s.y}px`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              '--dx': s.dx,
              '--dy': s.dy
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
};
