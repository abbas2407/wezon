import React from 'react';

export function StrategySystemsGrowth() {
  return (
    <section
      id="strategy"
      style={{
        background: '#0a0a0a',
        padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 64px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'Syne, sans-serif',
        color: '#fff',
      }}
    >
      <div style={{ display: 'flex', gap: 24, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
        <span>STRATEGY</span><span>TECHNOLOGY</span><span>GROWTH</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Card 1 */}
        <div style={{ background: '#0a0a0a', padding: 'clamp(24px, 3vw, 40px)' }}>
          <h2 style={{ fontSize: 'clamp(24px, 2.6vw, 40px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Data that turns<br />into business<br />impact
          </h2>
          <p style={{ marginTop: 'clamp(40px, 8vw, 90px)', color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, maxWidth: 320 }}>
            We combine strategy, technology and performance to build digital systems that don't just look good — they move the business forward.
          </p>
        </div>

        {/* Card 2 */}
        <div style={{ background: '#0a0a0a', padding: 'clamp(24px, 3vw, 40px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 'clamp(64px, 8vw, 120px)', fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.04em' }}>01</div>
            <div style={{ fontSize: 20, fontWeight: 500, marginTop: 4, color: 'rgba(255,255,255,0.85)' }}>strategy</div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>
            A clear direction before a single pixel, line of code or campaign is launched.
          </p>
        </div>

        {/* Card 3 (split into two visual columns) */}
        <div style={{ background: '#0a0a0a', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <div style={{ background: '#0a0a0a', padding: 'clamp(24px, 3vw, 40px)', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 'clamp(64px, 8vw, 120px)', fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.04em' }}>02</div>
              <div style={{ fontSize: 20, fontWeight: 500, marginTop: 4, color: 'rgba(255,255,255,0.85)' }}>systems</div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>
              Digital experiences designed to connect people, products, data and operations.
            </p>
          </div>
          <div style={{ background: '#0a0a0a', padding: 'clamp(24px, 3vw, 40px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 'clamp(64px, 8vw, 120px)', fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.04em' }}>03</div>
              <div style={{ fontSize: 20, fontWeight: 500, marginTop: 4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>Growth</div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, maxWidth: 220 }}>
              Performance that creates momentum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
