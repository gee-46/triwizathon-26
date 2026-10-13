import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
  hueShift: number;
}

export const MagicalParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Create 42 elegant magical motes
    const particleCount = prefersReducedMotion ? 16 : 42;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 1.8,
        alpha: Math.random() * 0.7,
        maxAlpha: 0.35 + Math.random() * 0.45,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -0.15 - Math.random() * 0.35, // Soft upward drift like embers
        pulseSpeed: 0.008 + Math.random() * 0.015,
        hueShift: Math.random() > 0.6 ? 48 : 42 // Gold/Amber spectrum
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.pulseSpeed;

          // Pulse opacity
          if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
            p.pulseSpeed = -p.pulseSpeed;
          }

          // Wrap boundaries
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Draw glowing particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
        gradient.addColorStop(0, `hsla(${p.hueShift}, 85%, 75%, ${p.alpha})`);
        gradient.addColorStop(0.4, `hsla(${p.hueShift}, 75%, 55%, ${p.alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core bright pip
        ctx.fillStyle = `rgba(255, 245, 205, ${Math.min(1, p.alpha * 1.3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="magical-particles-canvas" aria-hidden="true" />;
};
