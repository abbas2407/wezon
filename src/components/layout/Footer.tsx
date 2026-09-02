import React from 'react';

export function Footer() {
  return (
    <footer
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: 'clamp(40px, 5vw, 60px) clamp(24px, 5vw, 64px)',
        fontFamily: 'Syne, sans-serif',
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        letterSpacing: '0.08em',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: '#fff', fontWeight: 900, fontSize: 20, letterSpacing: '-0.03em' }}>
          <span>we</span><span style={{ fontSize: '0.7em', margin: '0 1px' }}>✦</span><span>zon</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#hero" style={{ color: 'inherit', textDecoration: 'none' }}>HOME</a>
          <a href="#system" style={{ color: 'inherit', textDecoration: 'none' }}>SYSTEM</a>
          <a href="#build" style={{ color: 'inherit', textDecoration: 'none' }}>BUILD</a>
          <a href="#work" style={{ color: 'inherit', textDecoration: 'none' }}>WORK</a>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)' }}>© {new Date().getFullYear()} WE.ZON</div>
      </div>
    </footer>
  );
}
