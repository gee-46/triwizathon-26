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
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
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

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if mouse is hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, textarea, select, .interactive-hover');
        setIsHovering(Boolean(interactive));
      }
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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
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
        className={`wand-lumos-aura ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`
        }}
      />

      {/* Wand cursor element */}
      <div
        className="custom-wand-container"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      >
        <div
          className={`custom-wand-element ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        >
          <img
            src="/images/wand1.png"
            alt="Wand Cursor"
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
