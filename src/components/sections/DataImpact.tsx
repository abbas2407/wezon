import React from 'react';
import { motion } from 'framer-motion';

/* ── decorative atoms ─────────────────────────────────── */

const Checker = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
    <rect x="0"  y="0" width="3" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="4"  y="0" width="3" height="3" fill="rgba(255,255,255,0.13)" />
    <rect x="8"  y="0" width="3" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="0"  y="4" width="3" height="3" fill="rgba(255,255,255,0.13)" />
    <rect x="4"  y="4" width="3" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="8"  y="4" width="3" height="3" fill="rgba(255,255,255,0.13)" />
    <rect x="0"  y="8" width="3" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="4"  y="8" width="3" height="3" fill="rgba(255,255,255,0.13)" />
    <rect x="8"  y="8" width="3" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="12" y="0" width="2" height="3" fill="rgba(255,255,255,0.13)" />
    <rect x="12" y="4" width="2" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="12" y="8" width="2" height="3" fill="rgba(255,255,255,0.13)" />
  </svg>
);

const Divider = () => <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.10)' }} />;

const WaveMesh = () => (
  <svg viewBox="0 0 240 160" fill="none" style={{ width: '100%', height: 'auto' }}>
    {Array.from({ length: 16 }).map((_, i) => {
      const y = 6 + i * 10;
      const amp = 12 + i * 2.2;
      return (
        <path
          key={i}
          d={`M0 ${y} C60 ${y - amp}, 120 ${y + amp}, 180 ${y} S240 ${y - amp * 0.6}, 240 ${y}`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.45"
          fill="none"
        />
      );
    })}
  </svg>
);

const ArcDecoration = () => (
  <svg viewBox="0 0 300 300" fill="none" style={{ width: '100%', height: '100%' }}>
    <circle cx="300" cy="0" r="80"  stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
    <circle cx="300" cy="0" r="130" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    <circle cx="300" cy="0" r="180" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
    <circle cx="300" cy="0" r="230" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
    {Array.from({ length: 16 }).map((_, i) => {
      const a = (i * Math.PI) / 8;
      return (
        <line key={i} x1="300" y1="0" x2={300 + Math.cos(a) * 250} y2={Math.sin(a) * 250}
          stroke="rgba(255,255,255,0.03)" strokeWidth="0.4" />
      );
    })}
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FONT = "'Orbitron', sans-serif";

const services = [
  { num: '01', title: 'STRATEGY', desc: 'Business objectives, positioning, audience and digital roadmap.' },
  { num: '02', title: 'BRAND', desc: 'Identity, visual systems and digital presence built for recognition.' },
  { num: '03', title: 'PRODUCT', desc: 'Websites, applications, platforms and user experiences.' },
  { num: '04', title: 'TECHNOLOGY', desc: 'Software, ERP, integrations and intelligent automation.' },
  { num: '05', title: 'GROWTH', desc: 'Performance marketing, acquisition, optimization and scale.' },
];

/* ── MAIN COMPONENT ───────────────────────────────────── */

export function DataImpact() {
  return (
    <section style={{ background: '#000', fontFamily: FONT, padding: '24px clamp(16px, 3vw, 40px)' }}>

      {/* ════════════ PANEL 1 ════════════ */}
      <div style={{
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}>
        {/* top nav labels */}
        <div style={{
          display: 'flex', gap: '28px', padding: '18px 32px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: '#0a0a0a',
        }}>
          {['STRATEGY', 'TECHNOLOGY', 'GROWTH'].map((t) => (
            <span key={t} style={{
              fontFamily: FONT, fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.28em', color: '#555', textTransform: 'uppercase',
            }}>{t}</span>
          ))}
        </div>

        {/* 4-column grid */}
        <div data-impact-grid style={{ display: 'grid', gridTemplateColumns: '35% 22% 22% 21%' }}>

          {/* ── COL 1 ────────────────────── */}
          <motion.div
            style={{
              background: '#0c0c0c', padding: '36px 32px',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: '480px', position: 'relative', overflow: 'hidden',
            }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={0} variants={fadeUp}
          >
            <div>
              <h2 style={{
                fontFamily: FONT, fontWeight: 800, fontSize: 'clamp(22px, 2.6vw, 32px)',
                lineHeight: 1.18, letterSpacing: '-0.01em', textTransform: 'uppercase',
                color: '#fff', margin: 0,
              }}>
                DATA THAT TURNS<br />INTO BUSINESS<br />IMPACT
              </h2>
              <div style={{ marginTop: '24px' }}><Divider /></div>
            </div>

            {/* faint circle */}
            <div style={{
              position: 'absolute', bottom: '-100px', right: '-60px',
              width: '320px', height: '320px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none',
            }} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}><Divider /></div>
                <Checker />
              </div>
              <p style={{
                fontFamily: FONT, fontSize: '12px', lineHeight: 1.75,
                color: '#777', fontWeight: 400, maxWidth: '280px', margin: 0,
              }}>
                We combine strategy, technology and performance to build digital systems that don't just look good — they move the business forward.
              </p>
            </div>
          </motion.div>

          {/* ── COL 2: 01 strategy ────────── */}
          <motion.div
            style={{
              background: '#131313', padding: '36px 28px',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: '480px', position: 'relative', overflow: 'hidden',
            }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={1} variants={fadeUp}
          >
            <div>
              <span style={{
                fontFamily: FONT, fontSize: 'clamp(60px, 7vw, 90px)',
                fontWeight: 900, color: '#fff', lineHeight: 0.85, display: 'block',
                letterSpacing: '-0.02em',
              }}>01</span>
              <span style={{
                fontFamily: FONT, fontSize: 'clamp(20px, 2.4vw, 28px)',
                fontWeight: 600, color: '#fff', display: 'block', marginTop: '6px',
                textTransform: 'lowercase',
              }}>strategy</span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Checker />
                <div style={{ flex: 1 }}><Divider /></div>
              </div>
              <p style={{
                fontFamily: FONT, fontSize: '11px', lineHeight: 1.7,
                color: '#777', fontWeight: 400, margin: 0,
              }}>
                A clear direction before a single pixel, line of code or campaign is launched.
              </p>
            </div>
          </motion.div>

          {/* ── COL 3: 02 systems ─────────── */}
          <motion.div
            style={{
              background: '#181818', padding: '36px 28px',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: '480px', position: 'relative', overflow: 'hidden',
            }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={2} variants={fadeUp}
          >
            {/* top: checker + line */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Checker />
                <div style={{ flex: 1 }}><Divider /></div>
              </div>
              {/* wave mesh */}
              <div style={{ opacity: 0.12 }}>
                <WaveMesh />
              </div>
            </div>

            <div>
              <span style={{
                fontFamily: FONT, fontSize: 'clamp(60px, 7vw, 90px)',
                fontWeight: 900, color: '#fff', lineHeight: 0.85, display: 'block',
                letterSpacing: '-0.02em',
              }}>02</span>
              <span style={{
                fontFamily: FONT, fontSize: 'clamp(20px, 2.4vw, 28px)',
                fontWeight: 600, color: '#fff', display: 'block', marginTop: '6px',
                textTransform: 'lowercase',
              }}>systems</span>
              <p style={{
                fontFamily: FONT, fontSize: '11px', lineHeight: 1.7,
                color: '#777', fontWeight: 400, margin: 0, marginTop: '14px',
              }}>
                Digital experiences designed to connect people, products, data and operations.
              </p>
            </div>

            {/* bottom checker */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <Checker />
            </div>
          </motion.div>

          {/* ── COL 4: 03 GROWTH ──────────── */}
          <motion.div
            style={{
              background: '#0e0e0e', padding: '36px 28px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: '480px', position: 'relative', overflow: 'hidden',
            }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={3} variants={fadeUp}
          >
            {/* arc decoration */}
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '300px', height: '300px', pointerEvents: 'none',
            }}>
              <ArcDecoration />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{
                fontFamily: FONT, fontSize: 'clamp(60px, 7vw, 90px)',
                fontWeight: 900, color: '#fff', lineHeight: 0.85, display: 'block',
                letterSpacing: '-0.02em',
              }}>03</span>
              <span style={{
                fontFamily: FONT, fontSize: 'clamp(20px, 2.4vw, 28px)',
                fontWeight: 800, color: '#fff', display: 'block', marginTop: '6px',
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>GROWTH</span>
              <p style={{
                fontFamily: FONT, fontSize: '11px', lineHeight: 1.7,
                color: '#777', fontWeight: 400, margin: 0, marginTop: '14px',
              }}>
                Performance that creates momentum.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
              <div style={{ flex: 1 }}><Divider /></div>
              <Checker />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════════════ PANEL 2 ════════════ */}
      <div style={{
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        marginTop: '4px',
        background: '#0a0a0a',
        display: 'grid',
        gridTemplateColumns: '38% 62%',
      }}
      data-impact-panel2>
        {/* ── Left col ── */}
        <motion.div
          style={{
            padding: '44px 36px', position: 'relative', overflow: 'hidden',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: '440px',
          }}
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={0} variants={fadeUp}
        >
          {/* large faint circle */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(85%, 360px)', aspectRatio: '1', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              fontFamily: FONT, fontSize: '9px', fontWeight: 600,
              letterSpacing: '0.3em', color: '#555', textTransform: 'uppercase',
              display: 'block', marginBottom: '28px',
            }}>THE WE.ZON SYSTEM</span>

            <h2 style={{
              fontFamily: FONT, fontWeight: 800,
              fontSize: 'clamp(24px, 2.8vw, 34px)',
              lineHeight: 1.18, letterSpacing: '-0.01em',
              textTransform: 'uppercase', color: '#fff', margin: 0,
            }}>
              ONE SYSTEM.<br />EVERY DIGITAL<br />TOUCHPOINT.
            </h2>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}><Divider /></div>
              <Checker />
            </div>
            <p style={{
              fontFamily: FONT, fontSize: '12px', lineHeight: 1.75,
              color: '#777', fontWeight: 400, maxWidth: '300px', margin: 0,
            }}>
              WE.ZON brings strategy, design, technology and growth under one connected system.
            </p>
          </div>
        </motion.div>

        {/* ── Right col: service list ── */}
        <div>
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '16px',
                padding: '26px 36px',
                borderBottom: i < services.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} custom={i} variants={fadeUp}
            >
              <div style={{ paddingTop: '3px' }}><Checker /></div>
              <div>
                <span style={{
                  fontFamily: FONT, fontSize: 'clamp(13px, 1.2vw, 16px)',
                  fontWeight: 700, color: '#fff', letterSpacing: '0.05em',
                  textTransform: 'uppercase', display: 'block',
                }}>
                  {s.num} — {s.title}
                </span>
                <p style={{
                  fontFamily: FONT, fontSize: '11px', lineHeight: 1.65,
                  color: '#666', fontWeight: 400, margin: 0, marginTop: '5px',
                }}>
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── responsive: mobile override ── */}
      <style>{`
        @media (max-width: 768px) {
          [data-impact-grid] { grid-template-columns: 1fr !important; }
          [data-impact-panel2] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
