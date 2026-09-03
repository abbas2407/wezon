import React from 'react';
import { AnimatedHeroBackground } from './AnimatedHeroBackground';

// Bottom corner pixel matrix marker (two 2x2 grid patterns with center cross)
const PixelMatrixMark = () => (
  <svg width="24" height="14" viewBox="0 0 24 14" fill="currentColor">
    {/* Left 2x2 cluster */}
    <rect x="0" y="0" width="3.5" height="3.5" />
    <rect x="5.5" y="0" width="3.5" height="3.5" />
    <rect x="0" y="5.5" width="3.5" height="3.5" />
    <rect x="5.5" y="5.5" width="3.5" height="3.5" />
    {/* Right 2x2 cluster */}
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
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Syne:wght@700;800;900&display=swap');

        .hero-font-heading {
          font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #ffffff;
        }

        .hero-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(14px, 1.1vw, 18px);
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .hero-nav-item:hover {
          color: #ffffff;
          transform: translateX(4px);
        }
        .hero-nav-num {
          font-family: 'Space Grotesk', monospace;
          font-weight: 500;
          opacity: 0.6;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(8px);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.02em;
        }
        .hero-badge .plus {
          color: #00ff55;
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
          background: '#050505',
          boxSizing: 'border-box',
          overflow: 'hidden',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(20px, 3vh, 36px) clamp(24px, 4vw, 56px)',
        }}
      >
        {/* WebGL 3D Centerpiece & Background Vectors */}
        <AnimatedHeroBackground />

        {/* ── Background Precision Overlay Guide Lines & Circles ── */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          {/* Main Centered Thin Circle */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(72vmin, 680px)',
              height: 'min(72vmin, 680px)',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          />
          {/* Intersecting Off-Center Thin Arc Circle */}
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
          {/* Horizontal Axis Line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '50%',
              height: '1px',
              background: 'rgba(255, 255, 255, 0.06)',
            }}
          />
          {/* Vertical Axis Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '53.5%',
              width: '1px',
              background: 'rgba(255, 255, 255, 0.05)',
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
          {/* Left: Status Badge */}
          <div>
            <span className="hero-badge">
              <span className="plus">+</span> open for projects
            </span>
          </div>

          {/* Center Logo: we+zon */}
          <a
            href="#hero"
            style={{
              color: '#ffffff',
              fontFamily: 'Syne, "Space Grotesk", sans-serif',
              fontWeight: 800,
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
            <span style={{ fontSize: '0.75em', fontWeight: 900, opacity: 0.95 }}>+</span>
            <span>zon</span>
          </a>

          {/* Right: Arrow Nav */}
          <div>
            <a
              href="#system"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                transition: 'transform 0.2s ease',
              }}
              aria-label="Next Section"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
          {/* Row 1: YOUR BUSINESS ... HAS A VISION. */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <h1
              className="hero-font-heading"
              style={{
                fontSize: 'clamp(28px, 3.8vw, 56px)',
                margin: 0,
              }}
            >
              YOUR BUSINESS
            </h1>
            <h1
              className="hero-font-heading"
              style={{
                fontSize: 'clamp(28px, 3.8vw, 56px)',
                margin: 0,
              }}
            >
              HAS A VISION.
            </h1>
          </div>

          {/* Vertical Middle Area: Left Navigation 01-05 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: 'auto 0',
            }}
          >
            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {navItems.map((item) => (
                <a key={item.id} href={item.href} className="hero-nav-item">
                  <span className="hero-nav-num">{item.id}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Row 2: WE BUILD ... THE ZONE ... AROUND IT. */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <span
                className="hero-font-heading"
                style={{
                  fontSize: 'clamp(26px, 3.6vw, 52px)',
                }}
              >
                WE BUILD
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span
                className="hero-font-heading"
                style={{
                  fontSize: 'clamp(26px, 3.6vw, 52px)',
                }}
              >
                THE ZONE
              </span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span
                className="hero-font-heading"
                style={{
                  fontSize: 'clamp(26px, 3.6vw, 52px)',
                }}
              >
                AROUND IT.
              </span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM FOOTER BORDER LINE & MARKS ── */}
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
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          <PixelMatrixMark />
          <PixelMatrixMark />
        </footer>
      </section>
    </>
  );
}
