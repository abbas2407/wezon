import React from 'react';

const items = [
  { id: '01', title: 'STRATEGY', desc: 'Business objectives, positioning, audience and digital roadmap.' },
  { id: '02', title: 'BRAND',    desc: 'Identity, visual systems and digital presence built for recognition.' },
  { id: '03', title: 'PRODUCT',  desc: 'Websites, applications, platforms and user experiences.' },
  { id: '04', title: 'TECHNOLOGY', desc: 'Software, ERP, integrations and intelligent automation.' },
  { id: '05', title: 'GROWTH',   desc: 'Performance marketing, acquisition, optimization and scale.' },
];

export function WezonSystem() {
  return (
    <section
      id="system"
      style={{
        background: '#0a0a0a',
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 5vw, 64px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'Syne, sans-serif',
        color: '#fff',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
            THE WE.ZON SYSTEM
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 800, lineHeight: 1.02,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
          }}>
            One system.<br />Every digital<br />touchpoint.
          </h2>
          <p style={{ marginTop: 40, color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, maxWidth: 340 }}>
            WE.ZON brings strategy, design, technology and growth under one connected system.
          </p>
        </div>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
          {items.map((it) => (
            <li key={it.id} style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24,
              padding: '22px 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ width: 28, height: 28, border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', fontWeight: 700, letterSpacing: '-0.01em' }}>
                  {it.id} — {it.title}
                </div>
                <p style={{ marginTop: 6, color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6 }}>
                  {it.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
