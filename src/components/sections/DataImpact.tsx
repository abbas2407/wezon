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
    <section className="w-full bg-[#08080a] px-3 sm:px-4 lg:px-6 py-4 font-space-grotesk">
      <div className="w-full mx-auto flex flex-col gap-4">

        {/* ════════════ PANEL 1: 4-Column Grid ════════════ */}
        <motion.div
          className="w-full bg-[#121215] border border-white/10 rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] relative"
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
            {/* flowing wave mesh — bottom of col 2 */}
            <svg className="absolute -bottom-4 -left-8 w-[360px] h-[240px] pointer-events-none text-white/[0.35]" fill="none" viewBox="0 0 360 240">
              {/* dense flowing mesh lines converging and spreading */}
              <path d="M-10 240 C 30 220, 80 180, 140 170 C 200 160, 260 190, 370 150" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 235 C 35 210, 85 175, 145 162 C 205 150, 265 180, 370 142" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 228 C 40 200, 90 168, 150 154 C 210 140, 270 170, 370 134" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 220 C 45 190, 95 160, 155 145 C 215 130, 275 160, 370 126" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 212 C 50 180, 100 152, 160 136 C 220 120, 280 150, 370 118" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 204 C 55 170, 105 144, 165 127 C 225 110, 285 140, 370 110" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 196 C 60 160, 110 136, 170 118 C 230 100, 290 130, 370 102" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 188 C 65 150, 115 128, 175 110 C 235 92, 295 120, 370 94" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 180 C 70 140, 120 120, 180 102 C 240 84, 300 110, 370 86" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 172 C 75 132, 125 112, 185 94 C 245 76, 305 100, 370 78" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 164 C 80 124, 130 104, 190 86 C 250 68, 310 92, 370 72" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 156 C 85 116, 135 96, 195 78 C 255 60, 315 84, 370 66" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 148 C 90 108, 140 88, 200 72 C 260 56, 318 76, 370 60" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 140 C 95 100, 145 82, 205 66 C 265 50, 320 68, 370 54" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 132 C 100 94, 148 76, 208 60 C 268 44, 322 62, 370 48" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 124 C 105 88, 150 70, 210 55 C 270 40, 324 56, 370 44" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 116 C 108 82, 152 64, 212 50 C 272 36, 326 50, 370 40" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 108 C 110 76, 154 58, 214 46 C 274 34, 328 46, 370 36" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 100 C 112 72, 156 54, 216 42 C 276 30, 330 42, 370 32" stroke="currentColor" strokeWidth="0.6" />
              {/* crossing mesh lines for depth */}
              <path d="M-10 240 C 60 200, 140 140, 200 120 C 260 100, 310 130, 370 90" stroke="currentColor" strokeWidth="0.4" />
              <path d="M-10 230 C 70 185, 150 130, 210 108 C 270 86, 315 118, 370 80" stroke="currentColor" strokeWidth="0.4" />
              <path d="M-10 220 C 80 172, 155 120, 215 98 C 275 76, 318 106, 370 72" stroke="currentColor" strokeWidth="0.4" />
              <path d="M-10 210 C 85 160, 158 112, 218 90 C 278 68, 320 96, 370 64" stroke="currentColor" strokeWidth="0.4" />
              <path d="M-10 200 C 88 150, 160 105, 220 84 C 280 63, 322 88, 370 58" stroke="currentColor" strokeWidth="0.4" />
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
            {/* flowing wave mesh — top of col 4 */}
            <svg className="absolute -top-2 -right-4 w-[320px] h-[220px] pointer-events-none text-white/[0.35]" fill="none" viewBox="0 0 320 220">
              {/* primary flowing lines — converge from left, spread right */}
              <path d="M-10 0 C 40 20, 100 60, 160 70 C 220 80, 280 50, 330 30" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 8 C 45 26, 105 64, 165 76 C 225 88, 282 56, 330 38" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 16 C 50 32, 110 68, 170 82 C 230 96, 284 62, 330 46" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 24 C 55 38, 115 72, 175 88 C 235 104, 286 68, 330 54" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 32 C 60 44, 120 76, 180 94 C 240 112, 288 74, 330 62" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 40 C 65 50, 125 80, 185 100 C 245 120, 290 80, 330 70" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 48 C 70 56, 130 84, 190 106 C 250 128, 292 86, 330 78" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 56 C 74 62, 134 88, 194 112 C 254 136, 294 92, 330 86" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 64 C 78 68, 138 92, 198 118 C 258 144, 296 98, 330 94" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 72 C 82 74, 142 96, 202 124 C 262 152, 298 104, 330 102" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 80 C 86 80, 146 100, 206 130 C 266 160, 300 110, 330 110" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 88 C 88 86, 148 104, 208 136 C 268 168, 302 116, 330 118" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 96 C 90 92, 150 108, 210 140 C 268 172, 304 122, 330 126" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 104 C 92 98, 152 112, 212 146 C 270 180, 306 128, 330 134" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 112 C 94 104, 154 116, 214 152 C 272 188, 308 134, 330 142" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 120 C 96 110, 156 120, 216 156 C 274 192, 310 140, 330 150" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 128 C 98 116, 158 124, 218 160 C 276 196, 312 146, 330 158" stroke="currentColor" strokeWidth="0.6" />
              <path d="M-10 136 C 100 122, 160 128, 220 164 C 278 200, 314 152, 330 166" stroke="currentColor" strokeWidth="0.6" />
              {/* crossing mesh for depth */}
              <path d="M-10 10 C 60 40, 140 90, 200 110 C 260 130, 300 90, 330 60" stroke="currentColor" strokeWidth="0.4" />
              <path d="M-10 30 C 70 55, 148 100, 208 118 C 268 136, 304 98, 330 72" stroke="currentColor" strokeWidth="0.4" />
              <path d="M-10 50 C 76 68, 152 108, 212 128 C 272 148, 306 106, 330 86" stroke="currentColor" strokeWidth="0.4" />
              <path d="M-10 70 C 80 80, 156 116, 216 138 C 276 160, 308 114, 330 100" stroke="currentColor" strokeWidth="0.4" />
              <path d="M-10 90 C 84 92, 160 124, 220 148 C 280 172, 310 122, 330 114" stroke="currentColor" strokeWidth="0.4" />
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
          className="w-full bg-[#121215] border border-white/10 rounded-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden"
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
