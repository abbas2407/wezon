import React from 'react';
import { AnimatedHeroBackground } from './AnimatedHeroBackground';

// Bottom corner "crab claw" / grid mark matching Image 2 reference
const CrabMark = () => (
  <svg width="46" height="30" viewBox="0 0 46 30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {/* left claw */}
    <path d="M2 6 L2 16 L8 16" />
    <path d="M2 12 L6 12" />
    {/* right claw */}
    <path d="M44 6 L44 16 L38 16" />
    <path d="M44 12 L40 12" />
    {/* body */}
    <rect x="10" y="8" width="26" height="16" rx="3" />
    {/* bottom legs */}
    <path d="M14 24 L14 28 M20 24 L20 28 M26 24 L26 28 M32 24 L32 28" />
    {/* eyes */}
    <circle cx="18" cy="16" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="28" cy="16" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

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
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');

        .hero-heading {
          font-family: 'Orbitron', 'Space Grotesk', -apple-system, sans-serif;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0;
        }

        .hero-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Orbitron', 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(14px, 1.1vw, 18px);
          letter-spacing: 0.1em;
          color: #ffffff;
          text-decoration: none;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .hero-nav-link:hover {
          transform: translateX(6px);
        }
        .hero-nav-num {
          font-weight: 700;
          opacity: 0.65;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(8px);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.02em;
        }
        .hero-badge-star {
          color: #7CFF9C;
          font-size: 14px;
          text-shadow: 0 0 8px rgba(124, 255, 156, 0.7);
        }
      `}</style>

      <section
        id="hero"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '680px',
          background: '#000000',
          boxSizing: 'border-box',
          overflow: 'hidden',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(20px, 3vh, 36px) clamp(24px, 4vw, 56px)',
        }}
      >
        {/* Transparent Canvas with Chrome Liquid Centerpiece */}
        <AnimatedHeroBackground />

        {/* Thin Single Circle Outline Behind 3D Centerpiece */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(72vmin, 680px)',
              height: 'min(72vmin, 680px)',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '42%',
              top: '42%',
              transform: 'translate(-50%, -50%)',
              width: 'min(90vmin, 860px)',
              height: 'min(90vmin, 860px)',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          />
        </div>

        {/* ── TOP HEADER BAR ── */}
        <header
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Top Left: Badge with 4-Point Green Star ✦ */}
          <div>
            <span className="hero-badge">
              <span className="hero-badge-star">✦</span> open for projects
            </span>
          </div>

          {/* Top Center: Logo "we.zon" (with dot, NOT plus) */}
          <a
            href="#hero"
            style={{
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(26px, 2.5vw, 36px)',
              letterSpacing: '-0.02em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              lineHeight: 1,
            }}
          >
            <span>we</span>
            <span style={{ margin: '0 1px' }}>.</span>
            <span>zon</span>
          </a>

          {/* Top Right: Simple "→" Thin Arrow */}
          <div>
            <a
              href="#system"
              style={{
                color: '#ffffff',
                fontSize: '24px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
              aria-label="Next Section"
            >
              →
            </a>
          </div>
        </header>

        {/* ── MIDDLE CONTENT LAYER ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 'clamp(16px, 3vh, 32px)',
            paddingBottom: 'clamp(16px, 3vh, 32px)',
          }}
        >
          {/* Left & Right Headings */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <h1 className="hero-heading" style={{ fontSize: 'clamp(28px, 3.8vw, 56px)' }}>
              YOUR BUSINESS
            </h1>
            <h1 className="hero-heading" style={{ fontSize: 'clamp(28px, 3.8vw, 56px)' }}>
              HAS A VISION.
            </h1>
          </div>

          {/* Left Numbered Navigation List */}
          <div style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navItems.map((item) => (
                <a key={item.id} href={item.href} className="hero-nav-link">
                  <span className="hero-nav-num">{item.id}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Left, Center, Right Headings */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <span className="hero-heading" style={{ fontSize: 'clamp(26px, 3.6vw, 52px)' }}>
                WE BUILD
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span className="hero-heading" style={{ fontSize: 'clamp(26px, 3.6vw, 52px)' }}>
                THE ZONE
              </span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="hero-heading" style={{ fontSize: 'clamp(26px, 3.6vw, 52px)' }}>
                AROUND IT.
              </span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM FOOTER BORDER LINE & CRAB MARKS ── */}
        <footer
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'rgba(255, 255, 255, 0.55)',
          }}
        >
          <CrabMark />
          <CrabMark />
        </footer>
      </section>
    </>
  );
}
