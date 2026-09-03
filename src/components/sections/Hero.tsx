import React from 'react';
import { AnimatedHeroBackground } from './AnimatedHeroBackground';

// Bottom corner pixel matrix motif (black + white only)
const PixelMatrixMark = () => (
  <svg width="24" height="14" viewBox="0 0 24 14" fill="#ffffff">
    <rect x="0" y="0" width="3.5" height="3.5" />
    <rect x="5.5" y="0" width="3.5" height="3.5" />
    <rect x="0" y="5.5" width="3.5" height="3.5" />
    <rect x="5.5" y="5.5" width="3.5" height="3.5" />
    <rect x="14" y="0" width="3.5" height="3.5" />
    <rect x="19.5" y="0" width="3.5" height="3.5" />
    <rect x="14" y="5.5" width="3.5" height="3.5" />
    <rect x="19.5" y="5.5" width="3.5" height="3.5" />
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
          letter-spacing: 0.04em;
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
          opacity: 1;
        }
        .hero-nav-num {
          font-weight: 700;
          opacity: 0.65;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          background: transparent;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #ffffff;
          letter-spacing: 0.02em;
        }
        .hero-badge-plus {
          color: #00FF00;
          font-weight: 700;
          font-size: 14px;
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

        {/* Thin Circular Ring & Crosshair Lines Behind 3D Centerpiece */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(70vmin, 660px)',
              height: 'min(70vmin, 660px)',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '43%',
              top: '43%',
              transform: 'translate(-50%, -50%)',
              width: 'min(88vmin, 840px)',
              height: 'min(88vmin, 840px)',
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
          {/* Top Left: Green Pill Badge */}
          <div>
            <span className="hero-badge">
              <span className="hero-badge-plus">+</span> open for projects
            </span>
          </div>

          {/* Top Center: Logo "we.zon" */}
          <a
            href="#hero"
            style={{
              color: '#ffffff',
              fontFamily: 'Orbitron, "Space Grotesk", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(26px, 2.5vw, 36px)',
              letterSpacing: '-0.02em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              lineHeight: 1,
            }}
          >
            <span>we</span>
            <span style={{ fontSize: '0.75em', fontWeight: 900 }}>+</span>
            <span>zon</span>
          </a>

          {/* Top Right: Single Arrow "→" */}
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
            <h1
              className="hero-heading"
              style={{ fontSize: 'clamp(28px, 3.8vw, 56px)' }}
            >
              YOUR BUSINESS
            </h1>
            <h1
              className="hero-heading"
              style={{ fontSize: 'clamp(28px, 3.8vw, 56px)' }}
            >
              HAS A VISION.
            </h1>
          </div>

          {/* Left Numbered Navigation List */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: 'auto 0',
            }}
          >
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

        {/* ── BOTTOM FOOTER BORDER LINE ── */}
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
          }}
        >
          <PixelMatrixMark />
          <PixelMatrixMark />
        </footer>
      </section>
    </>
  );
}
