import React from 'react';
import { motion } from 'framer-motion';

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

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const services = [
  { title: 'DIGITAL EXPERIENCES', tags: 'Websites · Landing Pages · UI/UX · Product Design', highlight: true },
  { title: 'BUSINESS SYSTEMS', tags: '', highlight: false },
  { title: 'AUTOMATION', tags: '', highlight: false },
  { title: 'PERFORMANCE', tags: '', highlight: false },
];

export function WhatWeBuild() {
  return (
    <section className="w-full bg-[#08080a] px-3 sm:px-4 lg:px-6 py-4 font-space-grotesk">
      <motion.div
        className="w-full bg-[#0a0a0c] pt-12 sm:pt-16 pb-8 sm:pb-12 px-6 sm:px-10 lg:px-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Header */}
        <motion.div className="flex items-center gap-4 mb-4" custom={0} variants={fadeUp}>
          <span className="font-orbitron font-normal text-[11px] sm:text-xs tracking-[0.2em] text-white/40 uppercase">
            From idea to infrastructure
          </span>
          <GlyphH />
        </motion.div>

        <motion.h2
          className="font-orbitron font-medium text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white uppercase mb-10 sm:mb-14"
          custom={1}
          variants={fadeUp}
        >
          What we build
        </motion.h2>

        {/* Service rows */}
        <div className="flex flex-col">
          {services.map((s, i) => (
            <motion.div key={s.title} custom={i + 2} variants={fadeUp}>
              {/* Top line */}
              <div className="w-full h-px bg-white/[0.08]" />

              <div className={`relative py-6 sm:py-8 ${s.highlight ? 'overflow-hidden' : ''}`}>
                {/* Gradient highlight bar for first item */}
                {s.highlight && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, rgba(19,19,21,1) 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, rgba(17,17,19,1) 100%)',
                      filter: 'blur(4px)',
                    }}
                  />
                )}

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <h3 className="font-orbitron font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] tracking-tight text-white uppercase leading-none">
                    {s.title}
                  </h3>
                  {s.tags && (
                    <p className="font-space-grotesk text-sm sm:text-[15px] text-white/60 tracking-wide whitespace-nowrap">
                      {s.tags}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {/* Bottom line */}
          <div className="w-full h-px bg-white/[0.08]" />
        </div>
      </motion.div>
    </section>
  );
}
