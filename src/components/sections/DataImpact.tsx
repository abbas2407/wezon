import React from 'react';
import { motion } from 'framer-motion';

/* ── tiny reusable pieces ─────────────────────────────── */

const Checker = ({ className = '' }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`shrink-0 ${className}`}>
    <rect x="0"  y="0"  width="3" height="3" fill="rgba(255,255,255,0.35)" />
    <rect x="4"  y="0"  width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="0"  y="4"  width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="4"  y="4"  width="3" height="3" fill="rgba(255,255,255,0.35)" />
    <rect x="8"  y="0"  width="3" height="3" fill="rgba(255,255,255,0.35)" />
    <rect x="12" y="0"  width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="8"  y="4"  width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="12" y="4"  width="3" height="3" fill="rgba(255,255,255,0.35)" />
    <rect x="0"  y="8"  width="3" height="3" fill="rgba(255,255,255,0.35)" />
    <rect x="4"  y="8"  width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="8"  y="8"  width="3" height="3" fill="rgba(255,255,255,0.35)" />
    <rect x="12" y="8"  width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="0"  y="12" width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="4"  y="12" width="3" height="3" fill="rgba(255,255,255,0.35)" />
    <rect x="8"  y="12" width="3" height="3" fill="rgba(255,255,255,0.12)" />
    <rect x="12" y="12" width="3" height="3" fill="rgba(255,255,255,0.35)" />
  </svg>
);

const HR = ({ className = '' }: { className?: string }) => (
  <div className={`w-full h-px bg-white/[0.12] ${className}`} />
);

const WaveMesh = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 260 180" fill="none" className={className} preserveAspectRatio="xMidYMid meet">
    {Array.from({ length: 14 }).map((_, i) => {
      const y = 8 + i * 12;
      const a = 16 + i * 2;
      return (
        <path
          key={i}
          d={`M0 ${y} Q65 ${y - a} 130 ${y} Q195 ${y + a} 260 ${y}`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.5"
        />
      );
    })}
  </svg>
);

const ArcLines = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 300 260" fill="none" className={className}>
    <circle cx="280" cy="130" r="60"  stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
    <circle cx="280" cy="130" r="100" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
    <circle cx="280" cy="130" r="140" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    <circle cx="280" cy="130" r="180" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * Math.PI) / 6;
      return (
        <line
          key={i}
          x1="280" y1="130"
          x2={280 + Math.cos(angle) * 200}
          y2={130 + Math.sin(angle) * 200}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.4"
        />
      );
    })}
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ── services data ────────────────────────────────────── */

const services = [
  { num: '01', title: 'STRATEGY', desc: 'Business objectives, positioning, audience and digital roadmap.' },
  { num: '02', title: 'BRAND', desc: 'Identity, visual systems and digital presence built for recognition.' },
  { num: '03', title: 'PRODUCT', desc: 'Websites, applications, platforms and user experiences.' },
  { num: '04', title: 'TECHNOLOGY', desc: 'Software, ERP, integrations and intelligent automation.' },
  { num: '05', title: 'GROWTH', desc: 'Performance marketing, acquisition, optimization and scale.' },
];

/* ── COMPONENT ────────────────────────────────────────── */

export function DataImpact() {
  return (
    <section className="w-full bg-black px-4 sm:px-6 lg:px-10 py-16 lg:py-24" style={{ fontFamily: "'Orbitron', sans-serif" }}>

      {/* ═══════════════ PANEL 1 ═══════════════ */}
      <div className="w-full rounded-[20px] border border-white/[0.08] overflow-hidden">

        {/* top nav bar */}
        <div className="flex items-center gap-8 px-8 py-5 border-b border-white/[0.08] bg-[#0a0a0a]">
          {['STRATEGY', 'TECHNOLOGY', 'GROWTH'].map((t) => (
            <span key={t} className="text-[11px] font-semibold tracking-[0.3em] text-[#666] uppercase">{t}</span>
          ))}
        </div>

        {/* 4-col grid — collapses on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-[35%_22%_22%_21%]">

          {/* ── COL 1 ── */}
          <motion.div
            className="relative bg-[#0a0a0a] p-8 lg:p-10 flex flex-col justify-between min-h-[420px] border-b md:border-b-0 md:border-r border-white/[0.08] overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={0} variants={fadeUp}
          >
            <div>
              <h2 className="text-white font-bold uppercase text-[clamp(24px,2.8vw,32px)] leading-[1.15] tracking-tight">
                DATA THAT TURNS<br />INTO BUSINESS<br />IMPACT
              </h2>
              <HR className="mt-6" />
            </div>

            {/* large faint circle */}
            <div className="absolute -bottom-24 -right-16 w-[320px] h-[320px] rounded-full border border-white/[0.06] pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-4">
                <HR className="flex-1" />
                <Checker />
              </div>
              <p className="text-[#999] text-[13px] leading-[1.7] font-normal max-w-[280px]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                We combine strategy, technology and performance to build digital systems that don't just look good — they move the business forward.
              </p>
            </div>
          </motion.div>

          {/* ── COL 2: 01 strategy ── */}
          <motion.div
            className="relative bg-[#111] p-8 lg:p-10 flex flex-col justify-between min-h-[420px] border-b md:border-b-0 md:border-r border-white/[0.08] overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={1} variants={fadeUp}
          >
            <div>
              <span className="block text-white font-black text-[clamp(64px,6vw,90px)] leading-[0.85]">01</span>
              <span className="block text-white font-bold text-[clamp(22px,2.2vw,28px)] mt-1 lowercase">strategy</span>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Checker />
                <HR className="flex-1" />
              </div>
              <p className="text-[#999] text-[13px] leading-[1.7] font-normal" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                A clear direction before a single pixel, line of code or campaign is launched.
              </p>
            </div>

            {/* wave mesh decoration */}
            <WaveMesh className="absolute top-4 right-0 w-[70%] opacity-[0.08] pointer-events-none" />
          </motion.div>

          {/* ── COL 3: 02 systems ── */}
          <motion.div
            className="relative bg-[#0f0f0f] p-8 lg:p-10 flex flex-col justify-between min-h-[420px] border-b md:border-b-0 md:border-r border-white/[0.08] overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={2} variants={fadeUp}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Checker />
                <HR className="flex-1" />
              </div>
            </div>

            <div>
              <span className="block text-white font-black text-[clamp(64px,6vw,90px)] leading-[0.85]">02</span>
              <span className="block text-white font-bold text-[clamp(22px,2.2vw,28px)] mt-1 lowercase">systems</span>
              <p className="text-[#999] text-[13px] leading-[1.7] font-normal mt-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Digital experiences designed to connect people, products, data and operations.
              </p>
            </div>

            {/* wave mesh */}
            <WaveMesh className="absolute bottom-0 left-0 w-full opacity-[0.10] pointer-events-none" />
          </motion.div>

          {/* ── COL 4: 03 GROWTH ── */}
          <motion.div
            className="relative bg-[#0a0a0a] p-8 lg:p-10 flex flex-col justify-between min-h-[420px] overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={3} variants={fadeUp}
          >
            {/* arc lines decoration */}
            <ArcLines className="absolute -top-8 -right-12 w-[120%] h-auto pointer-events-none" />

            <div className="relative z-10">
              <span className="block text-white font-black text-[clamp(64px,6vw,90px)] leading-[0.85]">03</span>
              <span className="block text-white font-extrabold text-[clamp(22px,2.2vw,28px)] mt-1 uppercase">GROWTH</span>
              <p className="text-[#999] text-[13px] leading-[1.7] font-normal mt-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Performance that creates momentum.
              </p>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <HR className="flex-1" />
              <Checker />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════ PANEL 2 ═══════════════ */}
      <div className="w-full rounded-[20px] border border-white/[0.08] overflow-hidden mt-3 bg-[#0a0a0a]">
        <div className="grid grid-cols-1 md:grid-cols-[35%_65%]">

          {/* ── Left col ── */}
          <motion.div
            className="relative p-8 lg:p-12 flex flex-col justify-between min-h-[420px] border-b md:border-b-0 md:border-r border-white/[0.08] overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={0} variants={fadeUp}
          >
            {/* large faint circle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(80%,380px)] aspect-square rounded-full border border-white/[0.06] pointer-events-none" />

            <div className="relative z-10">
              <span className="block text-[10px] font-semibold tracking-[0.3em] text-[#666] uppercase mb-8">
                THE WE.ZON SYSTEM
              </span>

              <h2 className="text-white font-bold uppercase text-[clamp(26px,3vw,34px)] leading-[1.15] tracking-tight">
                ONE SYSTEM.<br />EVERY DIGITAL<br />TOUCHPOINT.
              </h2>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <HR className="flex-1" />
                <Checker />
              </div>
              <p className="text-[#999] text-[13px] leading-[1.7] font-normal max-w-[320px]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                WE.ZON brings strategy, design, technology and growth under one connected system.
              </p>
            </div>
          </motion.div>

          {/* ── Right col: service list ── */}
          <div className="flex flex-col">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                className={`flex items-start gap-5 px-8 lg:px-12 py-7 ${i < services.length - 1 ? 'border-b border-white/[0.08]' : ''}`}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} custom={i} variants={fadeUp}
              >
                <Checker className="mt-1" />
                <div>
                  <span className="block text-white font-bold text-[clamp(14px,1.2vw,16px)] tracking-[0.06em] uppercase">
                    {s.num} — {s.title}
                  </span>
                  <p className="text-[#888] text-[13px] leading-[1.6] font-normal mt-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
