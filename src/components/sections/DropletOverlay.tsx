import React, { useEffect, useRef } from 'react';

/**
 * Canvas overlay of chrome-style droplets that live around the hero ring.
 * Idle: droplets sit on a virtual ring, breathing slowly.
 * On cursor near: they scatter outward away from the cursor.
 * On cursor leave: spring back to their home ring position (surface tension).
 */
export const DropletOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement as HTMLDivElement;

    const resize = () => {
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      buildDroplets();
    };

    type Drop = {
      home: { x: number; y: number };
      pos:  { x: number; y: number };
      vel:  { x: number; y: number };
      r: number;
      phase: number;
    };
    let drops: Drop[] = [];

    const buildDroplets = () => {
      const cx = W / 2, cy = H / 2;
      const ringR = Math.min(W, H) * 0.42;
      const N = 22;
      drops = Array.from({ length: N }, (_, i) => {
        const a = (i / N) * Math.PI * 2 + Math.random() * 0.05;
        const r = ringR + (Math.random() - 0.5) * 14;
        const home = { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
        return {
          home,
          pos: { ...home },
          vel: { x: 0, y: 0 },
          r: 3 + Math.random() * 4,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const mouse = { x: -9999, y: -9999, inside: false };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside = mouse.x >= 0 && mouse.x <= rect.width && mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onLeave = () => { mouse.inside = false; };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf = 0;
    let last = performance.now();

    const paintDrop = (d: Drop, t: number) => {
      const breathe = 1 + Math.sin(t * 0.002 + d.phase) * 0.08;
      const rr = d.r * breathe;
      const grad = ctx.createRadialGradient(d.pos.x, d.pos.y, 0, d.pos.x, d.pos.y, rr * 2.2);
      grad.addColorStop(0.0, 'rgba(255,255,255,0.95)');
      grad.addColorStop(0.4, 'rgba(220,220,225,0.55)');
      grad.addColorStop(1.0, 'rgba(200,200,210,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(d.pos.x, d.pos.y, rr * 2.2, 0, Math.PI * 2);
      ctx.fill();
      // hot core
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      ctx.arc(d.pos.x, d.pos.y, rr * 0.55, 0, Math.PI * 2);
      ctx.fill();
    };

    const step = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const scatterR = 140;
      const scatterForce = 900;
      const spring = 6.5;      // pull back to home
      const damping = 3.5;     // velocity damping

      for (const d of drops) {
        // Spring toward home
        const ax = (d.home.x - d.pos.x) * spring;
        const ay = (d.home.y - d.pos.y) * spring;

        // Repulsion from cursor
        let rx = 0, ry = 0;
        if (mouse.inside) {
          const dx = d.pos.x - mouse.x;
          const dy = d.pos.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < scatterR * scatterR) {
            const dist = Math.max(4, Math.sqrt(dist2));
            const strength = (1 - dist / scatterR) * scatterForce;
            rx = (dx / dist) * strength;
            ry = (dy / dist) * strength;
          }
        }

        d.vel.x += (ax + rx) * dt;
        d.vel.y += (ay + ry) * dt;
        d.vel.x -= d.vel.x * damping * dt;
        d.vel.y -= d.vel.y * damping * dt;
        d.pos.x += d.vel.x * dt;
        d.pos.y += d.vel.y * dt;

        paintDrop(d, now);
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};
