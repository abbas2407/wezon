import React from 'react';
import { AnimatedHeroBackground } from './AnimatedHeroBackground';

const navItems = [
  { id: '01', label: 'HOME', href: '#hero' },
  { id: '02', label: 'SERVICES', href: '#system' },
  { id: '03', label: 'WORK', href: '#work' },
  { id: '04', label: 'RESULTS', href: '#build' },
  { id: '05', label: 'ABOUT', href: '#strategy' },
];

export function Hero() {
  return (
    <>
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-scatter-text {
          color: rgba(255, 255, 255, 0.55);
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(20px, 3.2vw, 44px);
          letter-spacing: -0.02em;
          text-transform: uppercase;
          transition: color 0.35s ease, text-shadow 0.35s ease;
          cursor: default;
        }
        .hero-scatter-text:hover {
          color: #ffffff;
          text-shadow:
            0 0 12px rgba(255, 255, 255, 0.9),
            0 0 28px rgba(255, 255, 255, 0.55),
            0 0 60px rgba(255, 255, 255, 0.35);
        }

        .hero-side-nav a {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Syne', sans-serif;
          font-weight: 500;
          font-size: clamp(12px, 0.95vw, 14px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .hero-side-nav a:hover {
          color: #ffffff;
          transform: translateX(6px);
        }
        .hero-side-nav .num {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.85em;
          opacity: 0.7;
        }

        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.03);
        }
        .hero-pill .dot {
          width: 8px; height: 8px; border-radius: 999px;
          background: #7CFF9C;
          box-shadow: 0 0 8px rgba(124,255,156,0.7);
        }

        .hero-arrow {
          width: 40px; height: 40px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          display: inline-flex; align-items: center; justify-content: center;
          color: #fff; text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .hero-arrow:hover { background: rgba(255,255,255,0.08); transform: translate(2px,-2px); }

        .hero-ring {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      <section
        id="hero"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100svh',
          background: '#080808',
          padding: 'clamp(20px, 3vw, 40px) clamp(24px, 5vw, 64px)',
          boxSizing: 'border-box',
          overflow: 'hidden',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Background video */}
        <AnimatedHeroBackground />

        {/* Concentric decorative rings behind video */}
        <div className="hero-ring" style={{ width: '60vmin', height: '60vmin', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
        <div className="hero-ring" style={{ width: '90vmin', height: '90vmin', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.6 }} />

        {/* Top bar */}
        <header
          style={{
            position: 'relative', zIndex: 10,
            display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
            gap: 16, animation: 'heroFadeIn 0.8s ease both 0.1s',
          }}
        >
          <div>
            <span className="hero-pill"><span className="dot" /> open for projects</span>
          </div>
          <a href="#hero" style={{
            color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 900,
            fontSize: 'clamp(22px, 2.2vw, 32px)', letterSpacing: '-0.03em',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 2, lineHeight: 1,
          }}>
            <span>we</span>
            <span style={{ fontSize: '0.7em', margin: '0 1px' }}>✦</span>
            <span>zon</span>
          </a>
          <div style={{ justifySelf: 'end' }}>
            <a href="#system" className="hero-arrow" aria-label="next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </div>
        </header>

        {/* Row 1 */}
        <div
          style={{
            position: 'relative', zIndex: 10,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%', marginTop: 'clamp(24px, 5vh, 60px)',
            animation: 'heroFadeIn 0.8s ease both 0.25s',
          }}
        >
          <span className="hero-scatter-text">YOUR BUSINESS</span>
          <span className="hero-scatter-text">HAS A VISION.</span>
        </div>

        {/* Left numbered nav */}
        <nav
          className="hero-side-nav"
          style={{
            position: 'relative', zIndex: 10,
            display: 'flex', flexDirection: 'column', gap: 8,
            marginTop: 'clamp(20px, 4vh, 40px)', maxWidth: 240,
            animation: 'heroFadeIn 0.8s ease both 0.4s',
          }}
        >
          {navItems.map((n) => (
            <a key={n.id} href={n.href}>
              <span className="num">{n.id}</span>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>

        {/* Spacer pushes Row 2 to the bottom */}
        <div style={{ flex: 1 }} />

        {/* Row 2 */}
        <div
          style={{
            position: 'relative', zIndex: 10,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%', marginTop: 'clamp(20px, 4vh, 40px)',
            animation: 'heroFadeIn 0.8s ease both 0.55s',
          }}
        >
          <span className="hero-scatter-text">WE BUILD</span>
          <span className="hero-scatter-text" style={{ transform: 'translateX(-5%)' }}>THE ZONE</span>
          <span className="hero-scatter-text">AROUND IT.</span>
        </div>

        {/* Bottom scroll markers */}
        <div style={{
          position: 'absolute', left: 'clamp(24px, 5vw, 64px)', right: 'clamp(24px, 5vw, 64px)',
          bottom: 24, zIndex: 10, display: 'flex', justifyContent: 'space-between',
          color: 'rgba(255,255,255,0.35)', fontSize: 18, letterSpacing: '0.2em',
        }}>
          <span>✕</span>
          <span>✕</span>
        </div>
      </section>
    </>
  );
}
