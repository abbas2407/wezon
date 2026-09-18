import React from 'react';

const CornerMark = ({ className = '' }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="0" y="0" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.25)" />
    <rect x="6" y="0" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.25)" />
    <rect x="0" y="6" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.25)" />
    <rect x="6" y="6" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.25)" />
  </svg>
);

const WaveMesh = () => (
  <svg
    viewBox="0 0 300 160"
    fill="none"
    className="w-full h-auto opacity-30"
    preserveAspectRatio="xMidYMid meet"
  >
    {Array.from({ length: 12 }).map((_, i) => {
      const yBase = 10 + i * 13;
      const amp = 18 + i * 1.5;
      const d = `M0 ${yBase} Q75 ${yBase - amp} 150 ${yBase} Q225 ${yBase + amp} 300 ${yBase}`;
      return (
        <path
          key={i}
          d={d}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.6"
          fill="none"
        />
      );
    })}
  </svg>
);

export function DataImpact() {
  return (
    <section
      style={{
        background: '#000',
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 4vw, 56px)',
        fontFamily: "'Orbitron', 'Space Grotesk', sans-serif",
      }}
    >
      {/* Top label row */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          marginBottom: '48px',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        <span>STRATEGY</span>
        <span>TECHNOLOGY</span>
        <span>GROWTH</span>
      </div>

      {/* Main bento grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: 'auto auto',
          gap: '2px',
        }}
      >
        {/* ── Left: Heading (spans 2 rows) ── */}
        <div
          style={{
            gridColumn: '1',
            gridRow: '1 / 3',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingRight: 'clamp(24px, 3vw, 48px)',
            paddingBottom: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase' as const,
              color: '#fff',
              marginBottom: '40px',
            }}
          >
            DATA THAT TURNS
            <br />
            INTO BUSINESS
            <br />
            IMPACT
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <CornerMark />
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(12px, 1.1vw, 15px)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.45)',
                fontWeight: 400,
                maxWidth: '320px',
              }}
            >
              We combine strategy, technology
              and performance to build digital
              systems that don't just look good —
              they move the business forward.
            </p>
          </div>
        </div>

        {/* ── Card 01: Strategy ── */}
        <div
          style={{
            gridColumn: '2',
            gridRow: '1',
            background: '#0d0d0d',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: 'clamp(24px, 2.5vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '240px',
            position: 'relative',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 'clamp(48px, 5vw, 72px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 0.9,
                display: 'block',
              }}
            >
              01
            </span>
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 'clamp(22px, 2.5vw, 34px)',
                fontWeight: 700,
                color: '#fff',
                display: 'block',
                marginTop: '4px',
                textTransform: 'lowercase' as const,
              }}
            >
              strategy
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
            <CornerMark />
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(11px, 0.9vw, 13px)',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 400,
                maxWidth: '200px',
              }}
            >
              A clear direction before a single pixel, line of code or campaign is launched.
            </p>
          </div>
        </div>

        {/* ── Card 03: Growth (top-right, spans 2 rows) ── */}
        <div
          style={{
            gridColumn: '3',
            gridRow: '1 / 3',
            background: '#0d0d0d',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: 'clamp(24px, 2.5vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative arcs at top */}
          <div style={{ position: 'relative' }}>
            <CornerMark />
            <svg
              viewBox="0 0 300 200"
              fill="none"
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-40px',
                width: '110%',
                opacity: 0.12,
              }}
            >
              <circle cx="260" cy="100" r="80" stroke="#fff" strokeWidth="0.5" />
              <circle cx="260" cy="100" r="120" stroke="#fff" strokeWidth="0.5" />
              <circle cx="260" cy="100" r="160" stroke="#fff" strokeWidth="0.5" />
              {/* Radial lines */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * Math.PI) / 4;
                const x2 = 260 + Math.cos(angle) * 180;
                const y2 = 100 + Math.sin(angle) * 180;
                return <line key={i} x1="260" y1="100" x2={x2} y2={y2} stroke="#fff" strokeWidth="0.3" />;
              })}
            </svg>
          </div>

          {/* Bottom content */}
          <div>
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 'clamp(48px, 5vw, 72px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 0.9,
                display: 'block',
              }}
            >
              03
            </span>
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 'clamp(22px, 2.5vw, 34px)',
                fontWeight: 800,
                color: '#fff',
                display: 'block',
                marginTop: '4px',
                textTransform: 'uppercase' as const,
              }}
            >
              GROWTH
            </span>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(11px, 0.9vw, 13px)',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 400,
                marginTop: '12px',
                maxWidth: '200px',
              }}
            >
              Performance that creates momentum.
            </p>
            <CornerMark className="mt-4" />
          </div>
        </div>

        {/* ── Card 02: Systems ── */}
        <div
          style={{
            gridColumn: '2',
            gridRow: '2',
            background: '#0d0d0d',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: 'clamp(24px, 2.5vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '240px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div>
            <WaveMesh />
          </div>

          <div>
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 'clamp(48px, 5vw, 72px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 0.9,
                display: 'block',
              }}
            >
              02
            </span>
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 'clamp(22px, 2.5vw, 34px)',
                fontWeight: 700,
                color: '#fff',
                display: 'block',
                marginTop: '4px',
                textTransform: 'lowercase' as const,
              }}
            >
              systems
            </span>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(11px, 0.9vw, 13px)',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 400,
                marginTop: '12px',
                maxWidth: '220px',
              }}
            >
              Digital experiences designed to connect people, products, data and operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
