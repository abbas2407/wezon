import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import gsap from 'gsap';
import SplitType from 'split-type';

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
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelines = useRef<gsap.core.Timeline[]>([]);

  // Scroll-driven active index (no pinning)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const mapped = Math.max(0, Math.min(1, (v - 0.2) / 0.5));
    const idx = Math.min(
      buildItems.length - 1,
      Math.floor(mapped * buildItems.length * 0.999),
    );
    setActiveIdx(idx);
  });

  // SplitType + GSAP odometer timelines (text animation only, no ScrollTrigger)
  useLayoutEffect(() => {
    const splits: SplitType[] = [];

    rowRefs.current.forEach((row) => {
      if (!row) return;
      const sans = row.querySelector<HTMLElement>('.wwb-title-sans');
      const serif = row.querySelector<HTMLElement>('.wwb-title-serif');
      if (!sans || !serif) return;

      const sSans = new SplitType(sans, { types: 'chars', tagName: 'span' });
      const sSerif = new SplitType(serif, { types: 'chars', tagName: 'span' });
      splits.push(sSans, sSerif);

      [sSans, sSerif].forEach((s) => {
        (s.chars || []).forEach((c) => {
          (c as HTMLElement).style.display = 'inline-block';
          (c as HTMLElement).style.willChange = 'transform, opacity';
        });
      });
      gsap.set(sSerif.chars, { yPercent: 100, opacity: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      tl.to(sSans.chars, {
        yPercent: -110,
        opacity: 0,
        duration: 0.35,
        stagger: 0.022,
      }, 0);
      tl.to(sSerif.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.022,
      }, 0.02);

      timelines.current.push(tl);
    });

    return () => {
      timelines.current.forEach((tl) => tl.kill());
      timelines.current = [];
      splits.forEach((s) => s.revert());
    };
  }, []);

  // Play/reverse odometer on active change
  useEffect(() => {
    timelines.current.forEach((tl, i) => {
      if (i === activeIdx) tl.play();
      else tl.reverse();
    });
  }, [activeIdx]);

  return (
    <>
      <style>{`
        .wwb-title-wrap {
          position: relative;
          display: inline-block;
          line-height: 1;
          overflow: hidden;
          padding: 0.08em 0;
        }
        .wwb-title-sans,
        .wwb-title-serif {
          display: block;
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(28px, 4.5vw, 60px);
          font-weight: 500;
          line-height: 1;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }
        .wwb-title-sans {
          color: rgba(251,251,251,0.85);
        }
        .wwb-title-serif {
          position: absolute;
          left: 0;
          top: 0.08em;
          font-family: 'Instrument Serif', 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          text-transform: none;
          letter-spacing: -0.005em;
          color: #ffffff;
        }
      `}</style>

      <section
        ref={sectionRef}
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

          {/* Rows with odometer text */}
          <div className="flex flex-col">
            {buildItems.map((item, i) => (
              <motion.div
                key={item.title}
                ref={(el) => { rowRefs.current[i] = el; }}
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
                  {/* Odometer title: sans (default) + serif (animates in) */}
                  <span className="wwb-title-wrap">
                    <span className="wwb-title-sans">{item.title}</span>
                    <span className="wwb-title-serif" aria-hidden>{item.title}</span>
                  </span>

                  {/* Tags slide in on active */}
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
          <motion.div className="mt-10 flex items-center gap-3" custom={7} variants={fadeUp}>
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
    </>
  );
}
