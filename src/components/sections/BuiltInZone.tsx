import React from 'react';

const cases = [
  {
    id: '01',
    name: 'LIVORA',
    desc: 'Furniture retail transformed into a high-end digital spatial experience.',
  },
  {
    id: '02',
    name: 'TAILORME',
    desc: 'Redefining bespoke tailoring with digital precision and 3D body scanning.',
  },
  {
    id: '03',
    name: 'INTERIA',
    desc: 'Interior design studio with an immersive project catalog and client portal.',
  },
];

export function BuiltInZone() {
  return (
    <section
      id="work"
      style={{
        background: '#080808',
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 5vw, 64px)',
        fontFamily: 'Syne, sans-serif',
        color: '#fff',
      }}
    >
      <h2 style={{
        fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 800,
        letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0,
      }}>
        Built in zone
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, marginBottom: 32, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>
        BUILT. TESTED. MOVED.
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>✕</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {cases.map((c) => (
          <article
            key={c.id}
            style={{
              background: '#0e0e0e',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 0,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: 'clamp(24px, 3vw, 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#B7FF66', marginBottom: 12 }}>
                  CASE {c.id}
                </div>
                <div style={{ fontSize: 'clamp(20px, 2.2vw, 32px)', fontWeight: 700, letterSpacing: '-0.01em' }}>
                  {c.name}
                </div>
                <p style={{ marginTop: 12, color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, maxWidth: 380 }}>
                  {c.desc}
                </p>
              </div>
              <a
                href="#"
                style={{
                  fontSize: 12, letterSpacing: '0.2em', color: '#fff',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                }}
              >
                EXPLORE CASE
                <span aria-hidden>→</span>
              </a>
            </div>
            <div
              aria-hidden
              style={{
                background:
                  'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 40%, #1a1a1a 100%)',
                minHeight: 260,
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
