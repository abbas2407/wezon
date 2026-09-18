import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GlyphH = () => (
  <svg className="w-[34px] h-[17px] text-[#C4C4C8] opacity-80" fill="currentColor" viewBox="0 0 38 19">
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

const buildItems = [
  { title: 'DIGITAL EXPERIENCES', tags: 'Websites · Landing Pages · UI/UX · Product Design' },
  { title: 'BUSINESS SYSTEMS', tags: 'Custom ERP · CRM Suites · Dashboards · Internal Tooling' },
  { title: 'AUTOMATION', tags: 'AI Agents · Workflow Orchestration · Data Pipelines' },
  { title: 'PERFORMANCE', tags: 'SEO Infrastructure · CRO · Cloud Scale · Speed Audits' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function WhatWeBuild() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="build"
      className="w-full bg-[#08080a] px-3 sm:px-4 lg:px-6 py-4 font-space-grotesk"
    >
      <motion.div
        className="w-full bg-[#08080a] py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Header */}
        <motion.div className="flex items-center gap-4 mb-4" custom={0} variants={fadeUp}>
          <span className="font-orbitron font-normal text-[11px] tracking-[0.2em] text-white/[0.42] uppercase">
            From idea to infrastructure
          </span>
          <GlyphH />
        </motion.div>

        <motion.h2
          className="font-orbitron font-medium text-2xl sm:text-3xl lg:text-[42px] tracking-tight text-white uppercase mb-10 sm:mb-14"
          custom={1}
          variants={fadeUp}
        >
          What we build
        </motion.h2>

        <motion.div custom={2} variants={fadeUp}>
          <div className="w-full h-px bg-white/[0.08]" />
        </motion.div>

        {/* Rows */}
        <div className="flex flex-col">
          {buildItems.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i + 3}
              variants={fadeUp}
              className={`relative cursor-pointer border-b border-white/[0.06] transition-opacity duration-500 ease-out ${
                i === activeIdx ? 'opacity-100' : 'opacity-30'
              }`}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
            >
              {/* Gradient highlight */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  i === activeIdx ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background: 'linear-gradient(90deg, rgba(19,19,21,1) 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, rgba(17,17,19,1) 100%)',
                  filter: 'blur(4px)',
                }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-6 py-7 sm:py-9 lg:py-10 px-2 sm:px-4">
                <h3 className="font-orbitron font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] tracking-tight text-white uppercase leading-none">
                  {item.title}
                </h3>

                {/* Tags — slide in when active */}
                <p
                  className={`font-space-grotesk text-sm text-white/50 tracking-wide whitespace-nowrap transition-all duration-500 ease-out overflow-hidden ${
                    i === activeIdx
                      ? 'max-w-[600px] opacity-100 translate-x-0'
                      : 'max-w-0 opacity-0 translate-x-6'
                  }`}
                >
                  {item.tags}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <motion.div
          className="mt-10 flex items-center gap-3"
          custom={7}
          variants={fadeUp}
        >
          <span className="font-orbitron text-[11px] tracking-[0.15em] text-white/40">
            {String(activeIdx + 1).padStart(2, '0')} / {String(buildItems.length).padStart(2, '0')}
          </span>
          <div className="flex-1 h-px bg-white/10 relative">
            <div
              className="absolute left-0 top-0 bottom-0 bg-white transition-all duration-500 ease-out"
              style={{ width: `${((activeIdx + 1) / buildItems.length) * 100}%` }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
