import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

const cases = [
  {
    num: '01',
    title: 'LIVORA',
    desc: 'A premium real estate platform with immersive property showcases and intelligent search.',
    cta: 'EXPLORE CASE',
    img: null,
  },
  {
    num: '02',
    title: 'NEXUS ERP',
    desc: 'End-to-end business management system automating operations across departments.',
    cta: 'EXPLORE CASE',
    img: null,
  },
  {
    num: '03',
    title: 'SEARCH INTERIORS',
    desc: 'A sophisticated marketplace bridging top-tier interior designers with clients.',
    cta: 'EXPLORE CASE',
    img: null,
  },
];

function CaseCard({
  item,
  index,
  total,
}: {
  item: typeof cases[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{ top: `${80 + index * 30}px`, zIndex: index + 1 }}
    >
      <motion.div
        className="w-full bg-[#141418] border border-white/[0.08] rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[380px] sm:min-h-[420px]"
        style={{ scale, opacity }}
      >
        {/* Left: Metadata */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            <span className="inline-block font-orbitron font-medium text-[11px] tracking-[0.2em] text-[#c8ff00] uppercase mb-3">
              Case {item.num}
            </span>
            <h3 className="font-orbitron font-medium text-xl sm:text-2xl lg:text-3xl tracking-tight text-white uppercase leading-tight">
              {item.title}
            </h3>
          </div>

          <div className="mt-8">
            <p className="text-[13px] sm:text-sm leading-relaxed text-white/60 max-w-[340px] mb-6">
              {item.desc}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-orbitron font-medium text-[12px] tracking-[0.15em] text-white uppercase hover:text-[#c8ff00] transition-colors"
            >
              {item.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-px">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Mockup placeholder */}
        <div className="relative bg-[#1a1a1f] flex items-center justify-center overflow-hidden min-h-[260px] lg:min-h-0">
          {item.img ? (
            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-[80%] max-w-[400px] aspect-[16/10] rounded-md bg-[#222228] border border-white/[0.06] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 opacity-30">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="8" width="40" height="28" rx="2" stroke="white" strokeWidth="1.5" />
                  <path d="M4 36h40" stroke="white" strokeWidth="1.5" />
                  <rect x="18" y="36" width="12" height="4" rx="1" stroke="white" strokeWidth="1" />
                </svg>
                <span className="font-orbitron text-[10px] tracking-[0.2em] text-white uppercase">
                  Mockup {item.num}
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function BuiltInZone() {
  return (
    <section className="w-full bg-[#08080a] px-3 sm:px-4 lg:px-6 pt-4 pb-0">
      {/* Header */}
      <div className="w-full bg-[#08080a] pt-16 sm:pt-20 pb-10 px-6 sm:px-10 lg:px-14 relative overflow-hidden">
        {/* Quarter circle arc — top right */}
        <svg
          className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] pointer-events-none opacity-40"
          fill="none"
          viewBox="0 0 280 280"
        >
          <circle cx="280" cy="0" r="200" stroke="white" strokeWidth="1.2" />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-orbitron font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] tracking-tight text-white uppercase leading-none mb-3">
            Built in zone
          </h2>
          <div className="flex items-center gap-6 mb-0">
            <span className="font-orbitron font-normal text-[13px] sm:text-sm tracking-[0.15em] text-white/40 uppercase">
              Built. Tested. Moved.
            </span>
            <GlyphH />
          </div>
          <div className="w-full h-px bg-white/[0.08] mt-4" />
        </motion.div>
      </div>

      {/* Stacked cards container — extra height for scroll distance */}
      <div
        className="relative px-4 sm:px-8 lg:px-12 pb-[200px]"
        style={{ minHeight: `${cases.length * 60 + 100}vh` }}
      >
        {cases.map((item, i) => (
          <CaseCard key={item.num} item={item} index={i} total={cases.length} />
        ))}
      </div>
    </section>
  );
}
