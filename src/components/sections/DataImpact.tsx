import React from 'react';
import { motion } from 'framer-motion';

const FONT = "'Orbitron', sans-serif";
const TEXT_COLOR = '#fbfbfb';

const Checker = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
    <rect x="0" y="0" width="3" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="4" y="0" width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="8" y="0" width="3" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="0" y="4" width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="4" y="4" width="3" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="8" y="4" width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="0" y="8" width="3" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="4" y="8" width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="8" y="8" width="3" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="12" y="0" width="2" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="12" y="4" width="2" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="12" y="8" width="2" height="3" fill="rgba(255,255,255,0.12)" />
  </svg>
);

const HR = () => <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.10)' }} />;

const WaveMesh = () => (
  <svg viewBox="0 0 240 160" fill="none" style={{ width: '100%', height: 'auto' }}>
    {Array.from({ length: 16 }).map((_, i) => {
      const y = 6 + i * 10;
      const a = 12 + i * 2.2;
      return (
        <path key={i}
          d={`M0 ${y} C60 ${y - a}, 120 ${y + a}, 180 ${y} S240 ${y - a * 0.6}, 240 ${y}`}
          stroke="rgba(255,255,255,0.35)" strokeWidth="0.45" fill="none" />
      );
    })}
  </svg>
);

const ArcDecoration = () => (
  <svg viewBox="0 0 300 300" fill="none" style={{ width: '100%', height: '100%' }}>
    <circle cx="300" cy="0" r="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
    <circle cx="300" cy="0" r="130" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    <circle cx="300" cy="0" r="180" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
    <circle cx="300" cy="0" r="230" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
    {Array.from({ length: 16 }).map((_, i) => {
      const a = (i * Math.PI) / 8;
      return (
        <line key={i} x1="300" y1="0"
          x2={300 + Math.cos(a) * 250} y2={Math.sin(a) * 250}
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

const services = [
  { num: '01', title: 'STRATEGY', desc: 'Business objectives, positioning, audience and digital roadmap.' },
  { num: '02', title: 'BRAND', desc: 'Identity, visual systems and digital presence built for recognition.' },
  { num: '03', title: 'PRODUCT', desc: 'Websites, applications, platforms and user experiences.' },
  { num: '04', title: 'TECHNOLOGY', desc: 'Software, ERP, integrations and intelligent automation.' },
  { num: '05', title: 'GROWTH', desc: 'Performance marketing, acquisition, optimization and scale.' },
];

/* number style — 136.72px in Figma at 1440 */
const numStyle: React.CSSProperties = {
  fontFamily: FONT, fontWeight: 500, color: TEXT_COLOR,
  fontSize: 'clamp(64px, 9.5vw, 137px)', lineHeight: '100%', letterSpacing: 0,
  display: 'block',
};

/* label style — 38.48px in Figma */
const labelStyle: React.CSSProperties = {
  fontFamily: FONT, fontWeight: 500, color: TEXT_COLOR,
  fontSize: 'clamp(22px, 2.7vw, 38px)', lineHeight: '100%', letterSpacing: 0,
  display: 'block', marginTop: '8px',
};

/* body style — 18px in Figma */
const bodyStyle: React.CSSProperties = {
  fontFamily: FONT, fontWeight: 500, color: TEXT_COLOR,
  fontSize: 'clamp(13px, 1.25vw, 18px)', lineHeight: '100%', letterSpacing: 0,
  margin: 0,
};

export function DataImpact() {
  return (
    <section style={{ background: '#000', fontFamily: FONT, padding: '24px clamp(16px, 3.1vw, 45px)' }}>

      {/* ════════════ PANEL 1 ════════════ */}
      <div style={{ borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>

        {/* top nav labels */}
        <div style={{
          display: 'flex', gap: '28px', padding: '18px 32px',
          borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0a0a0a',
        }}>
          {['STRATEGY', 'TECHNOLOGY', 'GROWTH'].map((t) => (
            <span key={t} style={{
              fontFamily: FONT, fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.3em', color: '#666', textTransform: 'uppercase',
            }}>{t}</span>
          ))}
        </div>

        {/* 4-column grid: 471 / 293 / 293 / 293 at 1440px → 35% 21.7% 21.7% 21.7% */}
        <div data-impact-grid style={{
          display: 'grid',
          gridTemplateColumns: '34.9% 21.7% 21.7% 21.7%',
        }}>

          {/* ── COL 1 ── */}
          <motion.div style={{
            background: '#0a0a0a', padding: 'clamp(28px, 3vw, 40px)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 'clamp(400px, 44.6vw, 643px)', position: 'relative', overflow: 'hidden',
          }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={0} variants={fadeUp}
          >
            <div>
              <h2 style={{
                fontFamily: FONT, fontWeight: 500, color: TEXT_COLOR,
                fontSize: 'clamp(24px, 3.2vw, 46px)', lineHeight: '100%',
                letterSpacing: 0, textTransform: 'uppercase', margin: 0,
              }}>
                DATA THAT TURNS<br />INTO BUSINESS<br />IMPACT
              </h2>
              <div style={{ marginTop: '28px' }}><HR /></div>
            </div>

            {/* faint circle */}
            <div style={{
              position: 'absolute', bottom: '-120px', right: '-80px',
              width: '340px', height: '340px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none',
            }} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}><HR /></div>
                <Checker />
              </div>
              <p style={{ ...bodyStyle, maxWidth: '320px' }}>
                We combine strategy, technology and performance to build digital systems that don't just look good — they move the business forward.
              </p>
            </div>
          </motion.div>

          {/* ── COL 2: 01 strategy — bg rgba(36,36,38,0.44) ── */}
          <motion.div style={{
            background: 'rgba(36, 36, 38, 0.44)',
            padding: 'clamp(28px, 2.5vw, 36px)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 'clamp(400px, 44.6vw, 643px)', position: 'relative', overflow: 'hidden',
          }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={1} variants={fadeUp}
          >
            <div>
              <span style={numStyle}>01</span>
              <span style={labelStyle}>strategy</span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Checker />
                <div style={{ flex: 1 }}><HR /></div>
              </div>
              <p style={bodyStyle}>
                A clear direction before a single pixel, line of code or campaign is launched.
              </p>
            </div>
          </motion.div>

          {/* ── COL 3: 02 systems — bg rgba(73,74,78,0.42) ── */}
          <motion.div style={{
            background: 'rgba(73, 74, 78, 0.42)',
            padding: 'clamp(28px, 2.5vw, 36px)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 'clamp(400px, 44.6vw, 643px)', position: 'relative', overflow: 'hidden',
          }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={2} variants={fadeUp}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Checker />
                <div style={{ flex: 1 }}><HR /></div>
              </div>
              <div style={{ opacity: 0.12 }}><WaveMesh /></div>
            </div>

            <div>
              <span style={numStyle}>02</span>
              <span style={labelStyle}>systems</span>
              <p style={{ ...bodyStyle, marginTop: '16px' }}>
                Digital experiences designed to connect people, products, data and operations.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Checker />
            </div>
          </motion.div>

          {/* ── COL 4: 03 GROWTH — bg rgba(73,74,78,0) = transparent ── */}
          <motion.div style={{
            background: 'rgba(73, 74, 78, 0)',
            padding: 'clamp(28px, 2.5vw, 36px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 'clamp(400px, 44.6vw, 643px)', position: 'relative', overflow: 'hidden',
          }}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={3} variants={fadeUp}
          >
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '300px', height: '300px', pointerEvents: 'none',
            }}>
              <ArcDecoration />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={numStyle}>03</span>
              <span style={{ ...labelStyle, textTransform: 'uppercase' }}>GROWTH</span>
              <p style={{ ...bodyStyle, marginTop: '16px' }}>
                Performance that creates momentum.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
              <div style={{ flex: 1 }}><HR /></div>
              <Checker />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════════════ PANEL 2 ════════════ */}
      <div data-impact-panel2 style={{
        borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden', marginTop: '4px', background: '#0a0a0a',
        display: 'grid', gridTemplateColumns: '38% 62%',
      }}>
        {/* ── Left col ── */}
        <motion.div style={{
          padding: 'clamp(32px, 3vw, 44px)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: 'clamp(380px, 30vw, 440px)', position: 'relative', overflow: 'hidden',
        }}
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={0} variants={fadeUp}
        >
          <div style={{
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            width: 'min(85%, 360px)', aspectRatio: '1', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              fontFamily: FONT, fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.3em', color: '#666', textTransform: 'uppercase',
              display: 'block', marginBottom: '28px',
            }}>THE WE.ZON SYSTEM</span>

            <h2 style={{
              fontFamily: FONT, fontWeight: 500, color: TEXT_COLOR,
              fontSize: 'clamp(24px, 2.8vw, 36px)', lineHeight: '100%',
              letterSpacing: 0, textTransform: 'uppercase', margin: 0,
            }}>
              ONE SYSTEM.<br />EVERY DIGITAL<br />TOUCHPOINT.
            </h2>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}><HR /></div>
              <Checker />
            </div>
            <p style={{ ...bodyStyle, maxWidth: '320px' }}>
              WE.ZON brings strategy, design, technology and growth under one connected system.
            </p>
          </div>
        </motion.div>

        {/* ── Right col: service list ── */}
        <div>
          {services.map((s, i) => (
            <motion.div key={s.num} style={{
              display: 'flex', alignItems: 'flex-start', gap: '16px',
              padding: 'clamp(20px, 2vw, 28px) clamp(24px, 2.5vw, 36px)',
              borderBottom: i < services.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} custom={i} variants={fadeUp}
            >
              <div style={{ paddingTop: '2px' }}><Checker /></div>
              <div>
                <span style={{
                  fontFamily: FONT, fontSize: 'clamp(13px, 1.2vw, 16px)', fontWeight: 500,
                  color: TEXT_COLOR, letterSpacing: 0, textTransform: 'uppercase', display: 'block',
                  lineHeight: '100%',
                }}>
                  {s.num} — {s.title}
                </span>
                <p style={{
                  fontFamily: FONT, fontSize: 'clamp(11px, 1vw, 14px)', fontWeight: 500,
                  color: 'rgba(251,251,251,0.5)', lineHeight: '140%',
                  letterSpacing: 0, margin: 0, marginTop: '8px',
                }}>
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-impact-grid] { grid-template-columns: 1fr !important; }
          [data-impact-panel2] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
