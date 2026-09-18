import React from 'react';

const CornerMark = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '4px' }}>
    <rect x="0" y="0" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.3)" />
    <rect x="6" y="0" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.3)" />
    <rect x="0" y="6" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.3)" />
    <rect x="6" y="6" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.3)" />
  </svg>
);

const services = [
  {
    num: '01',
    title: 'STRATEGY',
    desc: 'Business objectives, positioning, audience and digital roadmap.',
  },
  {
    num: '02',
    title: 'BRAND',
    desc: 'Identity, visual systems and digital presence built for recognition.',
  },
  {
    num: '03',
    title: 'PRODUCT',
    desc: 'Websites, applications, platforms and user experiences.',
  },
  {
    num: '04',
    title: 'TECHNOLOGY',
    desc: 'Software, ERP, integrations and intelligent automation.',
  },
  {
    num: '05',
    title: 'GROWTH',
    desc: 'Performance marketing, acquisition, optimization and scale.',
  },
];

export function WezonSystem() {
  return (
    <section
      style={{
        background: '#000',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)',
        fontFamily: "'Orbitron', 'Space Grotesk', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative large circle */}
      <div
        style={{
          position: 'absolute',
          left: '-8%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(55vw, 600px)',
          height: 'min(55vw, 600px)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left column ── */}
        <div>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.35)',
              display: 'block',
              marginBottom: '32px',
            }}
          >
            THE WE.ZON SYSTEM
          </span>

          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase' as const,
              color: '#fff',
              marginBottom: '32px',
            }}
          >
            ONE SYSTEM.
            <br />
            EVERY DIGITAL
            <br />
            TOUCHPOINT.
          </h2>

          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(13px, 1.1vw, 16px)',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 400,
              maxWidth: '380px',
            }}
          >
            WE.ZON brings strategy, design,
            technology and growth under one
            connected system.
          </p>
        </div>

        {/* ── Right column: service list ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {services.map((s) => (
            <div key={s.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <CornerMark />
              <div>
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(14px, 1.3vw, 18px)',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.04em',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {s.num} — {s.title}
                </span>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(12px, 1vw, 14px)',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.35)',
                    fontWeight: 400,
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
