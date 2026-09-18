import React from 'react';
import { motion } from 'framer-motion';

/* ── Alien Crab Pixel Glyph (horizontal) ── */
const GlyphH = ({ className = '' }: { className?: string }) => (
  <svg className={`w-[34px] h-[17px] text-[#C4C4C8] opacity-80 ${className}`} fill="currentColor" viewBox="0 0 38 19">
    <rect x="0" y="0" width="6" height="5" />
    <rect x="0" y="14" width="6" height="5" />
    <rect x="6" y="7" width="6" height="5" />
    <rect x="12" y="1" width="14" height="5" />
    <rect x="12" y="13" width="14" height="5" />
    <rect x="26" y="7" width="6" height="5" />
    <rect x="32" y="0" width="6" height="5" />
    <rect x="32" y="14" width="6" height="5" />
  </svg>
);

/* ── Alien Crab Pixel Glyph (vertical) ── */
const GlyphV = () => (
  <svg className="w-[15px] h-[30px] text-[#C4C4C8] opacity-85" fill="currentColor" viewBox="0 0 19 38">
    <rect x="0" y="0" width="5" height="6" />
    <rect x="14" y="0" width="5" height="6" />
    <rect x="7" y="6" width="5" height="6" />
    <rect x="1" y="12" width="5" height="14" />
    <rect x="13" y="12" width="5" height="14" />
    <rect x="7" y="26" width="5" height="6" />
    <rect x="0" y="32" width="5" height="6" />
    <rect x="14" y="32" width="5" height="6" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const services = [
  { num: '01', title: 'Strategy', desc: 'Business objectives, positioning, audience and digital roadmap.' },
  { num: '02', title: 'Brand', desc: 'Identity, visual systems and digital presence built for recognition.' },
  { num: '03', title: 'Product', desc: 'Websites, applications, platforms and user experiences.' },
  { num: '04', title: 'Technology', desc: 'Software, ERP, integrations and intelligent automation.' },
  { num: '05', title: 'Growth', desc: 'Performance marketing, acquisition, optimization and scale.' },
];

export function DataImpact() {
  return (
    <section className="w-full bg-[#08080a] px-3 sm:px-6 lg:px-10 py-8 font-space-grotesk">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-8">

        {/* ════════════ PANEL 1: 4-Column Grid ════════════ */}
        <motion.div
          className="w-full bg-[#121215] border border-white/10 rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px] relative"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
        >
          {/* ── Col 1: Impact (4 cols) ── */}
          <motion.article
            className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative z-10 overflow-hidden"
            custom={0} variants={fadeUp}
          >
            {/* orbital arc bg */}
            <svg className="absolute -right-28 bottom-12 w-[340px] h-[340px] pointer-events-none opacity-45 z-0" fill="none" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="1.2" opacity="0.65" strokeDasharray="2 0" />
            </svg>

            <div className="relative z-10">
              <div className="flex items-center gap-6 text-[11px] tracking-[0.25em] font-orbitron font-medium text-white/50 mb-14 uppercase">
                <span>Strategy</span>
                <span>Technology</span>
                <span>Growth</span>
              </div>
              <h2 className="font-orbitron font-medium text-2xl sm:text-3xl lg:text-[34px] leading-[1.25] tracking-wide text-white uppercase">
                Data that turns<br />into business<br />impact
              </h2>
            </div>

            <div className="relative z-10 mt-16 lg:mt-0">
              <div className="flex justify-end mb-3 pr-2">
                <GlyphH />
              </div>
              <div className="pt-4 border-t border-white/20">
                <p className="text-[13.5px] leading-relaxed text-white/80 font-normal max-w-[320px]">
                  We combine strategy, technology and performance to build digital systems that don't just look good — they move the business forward.
                </p>
              </div>
            </div>
          </motion.article>

          {/* ── Col 2: 01 Strategy (3 cols) ── */}
          <motion.article
            className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden"
            custom={1} variants={fadeUp}
          >
            {/* wave lines bg */}
            <svg className="absolute -bottom-6 -left-12 w-[340px] h-[220px] pointer-events-none opacity-30 text-white" fill="none" viewBox="0 0 300 200">
              <path d="M-20 180 C 40 130, 120 190, 200 120 C 240 85, 280 130, 320 90" stroke="currentColor" strokeWidth="0.8" />
              <path d="M-20 170 C 45 125, 125 180, 205 115 C 245 80, 285 125, 325 85" stroke="currentColor" strokeWidth="0.8" />
              <path d="M-20 160 C 50 120, 130 170, 210 110 C 250 75, 290 120, 330 80" stroke="currentColor" strokeWidth="0.8" />
              <path d="M-20 150 C 55 115, 135 160, 215 105 C 255 70, 295 115, 335 75" stroke="currentColor" strokeWidth="0.8" />
              <path d="M-20 140 C 60 110, 140 150, 220 100 C 260 65, 300 110, 340 70" stroke="currentColor" strokeWidth="0.8" />
              <path d="M-20 130 C 65 105, 145 140, 225 95 C 265 60, 305 105, 345 65" stroke="currentColor" strokeWidth="0.8" />
              <path d="M-20 120 C 70 100, 150 130, 230 90 C 270 55, 310 100, 350 60" stroke="currentColor" strokeWidth="0.8" />
            </svg>

            <div className="relative z-10">
              <div className="font-orbitron font-medium text-7xl sm:text-8xl tracking-tight text-white leading-none">01</div>
              <div className="font-orbitron font-medium text-2xl text-white lowercase mt-1 tracking-wider">strategy</div>
              <div className="mt-4"><GlyphH /></div>
              <p className="text-[13.5px] leading-relaxed text-white/80 font-normal mt-6 max-w-[210px]">
                A clear direction before a single pixel, line of code or campaign is launched.
              </p>
            </div>
            <div className="relative z-10 mt-20" />
          </motion.article>

          {/* ── Col 3: 02 Systems (2 cols) ── */}
          <motion.article
            className="lg:col-span-2 bg-[#202126]/80 p-8 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative"
            custom={2} variants={fadeUp}
          >
            <div className="w-full flex justify-center pt-2">
              <GlyphH />
            </div>

            <div className="mt-auto mb-4">
              <div className="font-orbitron font-medium text-7xl tracking-tight text-white leading-none">02</div>
              <div className="font-orbitron font-medium text-2xl text-white lowercase mt-1 tracking-wider">systems</div>
              <div className="w-full border-t border-white/20 my-4" />
              <p className="text-[12.5px] leading-relaxed text-white/80 font-normal">
                Digital experiences designed to connect people, products, data and operations.
              </p>
            </div>
          </motion.article>

          {/* ── Col 4: 03 Growth (3 cols) ── */}
          <motion.article
            className="lg:col-span-3 p-8 sm:p-8 flex flex-col justify-between relative overflow-hidden"
            custom={3} variants={fadeUp}
          >
            {/* wave lines top-right */}
            <svg className="absolute top-0 right-0 w-[240px] h-[130px] pointer-events-none opacity-30 text-white" fill="none" viewBox="0 0 240 130">
              <path d="M0 40 C 60 10, 120 70, 240 20" stroke="currentColor" strokeWidth="0.8" />
              <path d="M0 50 C 60 20, 120 80, 240 30" stroke="currentColor" strokeWidth="0.8" />
              <path d="M0 60 C 60 30, 120 90, 240 40" stroke="currentColor" strokeWidth="0.8" />
              <path d="M0 70 C 60 40, 120 100, 240 50" stroke="currentColor" strokeWidth="0.8" />
              <path d="M0 80 C 60 50, 120 110, 240 60" stroke="currentColor" strokeWidth="0.8" />
              <path d="M0 90 C 60 60, 120 120, 240 70" stroke="currentColor" strokeWidth="0.8" />
            </svg>

            <div />

            <div className="relative z-10 mt-auto">
              <div className="font-orbitron font-medium text-7xl sm:text-8xl tracking-tight text-white leading-none">03</div>
              <div className="font-orbitron font-medium text-xl sm:text-2xl text-white uppercase mt-1 tracking-wider">GROWTH</div>
              <p className="text-[13px] leading-relaxed text-white/80 font-normal mt-3 max-w-[210px]">
                Performance that creates momentum.
              </p>
              <div className="relative mt-8 flex items-center">
                <GlyphH className="mr-2 flex-shrink-0" />
                <div className="flex-grow border-t border-white/20" />
              </div>
            </div>
          </motion.article>
        </motion.div>

        {/* ════════════ PANEL 2: WE.ZON System ════════════ */}
        <motion.div
          className="w-full bg-[#121215] border border-white/10 rounded-sm p-8 sm:p-12 lg:p-14 relative overflow-hidden"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            {/* ── Left: System Statement (6 cols) ── */}
            <motion.div className="lg:col-span-6 flex flex-col justify-between relative" custom={0} variants={fadeUp}>
              <svg className="absolute top-[-40px] right-[-20px] w-[320px] h-[320px] pointer-events-none opacity-40 z-0" fill="none" viewBox="0 0 320 320">
                <circle cx="160" cy="160" r="140" stroke="white" strokeWidth="1.2" opacity="0.6" />
              </svg>

              <div className="relative z-10">
                <div className="font-orbitron text-[11px] tracking-[0.25em] text-white/50 uppercase mb-4">
                  The WE.ZON System
                </div>
                <h2 className="font-orbitron font-medium text-3xl sm:text-4xl lg:text-[42px] leading-[1.18] tracking-tight text-white uppercase">
                  One system.<br />Every digital<br />touchpoint.
                </h2>
              </div>

              <div className="relative z-10 mt-16 lg:mt-0">
                <p className="text-[13.5px] leading-relaxed text-white/80 font-normal max-w-[340px] mb-4">
                  WE.ZON brings strategy, design, technology and growth under one connected system.
                </p>
                <div className="flex items-center">
                  <div className="flex-grow border-t border-white/20" />
                  <GlyphH className="ml-3 flex-shrink-0" />
                </div>
              </div>
            </motion.div>

            {/* ── Right: 5 Framework Items (6 cols) ── */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              {services.map((s, i) => (
                <motion.div
                  key={s.num}
                  className={`${i < services.length - 1 ? 'pb-5' : 'pb-2'} border-b border-white/15 flex items-start gap-4 sm:gap-5`}
                  custom={i} variants={fadeUp}
                >
                  <div className="pt-0.5 flex-shrink-0"><GlyphV /></div>
                  <div>
                    <h3 className="font-orbitron font-medium text-[15px] sm:text-[17px] tracking-wider text-white uppercase">
                      {s.num} — {s.title}
                    </h3>
                    <p className="text-[12.5px] text-white/60 font-normal mt-0.5 tracking-normal">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
