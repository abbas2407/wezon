import React from 'react';

const rows = [
  { title: 'DIGITAL EXPERIENCES', desc: 'Websites · Landing Pages · UI/UX · Product Design' },
  { title: 'BUSINESS SYSTEMS',   desc: 'ERP · CRM · Dashboards · Internal Tools' },
  { title: 'AUTOMATION',         desc: 'Workflows · AI Agents · Data Pipelines' },
  { title: 'PERFORMANCE',        desc: 'SEO · Paid Media · Analytics · CRO' },
];

export function WhatWeBuild() {
  return (
    <section
      id="build"
      style={{
        background: '#0a0a0a',
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 5vw, 64px) 0',
        fontFamily: 'Syne, sans-serif',
        color: '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
        FROM IDEA TO INFRASTRUCTURE
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>✕</span>
      </div>

      <h2 style={{
        fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 800, lineHeight: 1.02,
        letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: 32,
      }}>
        What we build
      </h2>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        {rows.map((r, i) => (
          <div
            key={r.title}
            style={{
              display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24,
              alignItems: 'center', padding: 'clamp(20px, 3vw, 36px) 0',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              background: i === 0 ? 'linear-gradient(180deg, rgba(255,255,255,0.05), transparent)' : 'transparent',
              paddingLeft: 8, paddingRight: 8,
            }}
          >
            <div style={{
              fontSize: 'clamp(30px, 4.2vw, 60px)', fontWeight: 800,
              letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1,
            }}>
              {r.title}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, letterSpacing: '0.02em' }}>
              {r.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
