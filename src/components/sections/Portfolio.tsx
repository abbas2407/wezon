import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    num: '01',
    title: 'Livora',
    category: 'Real Estate Platform',
    desc: 'A premium real estate platform with immersive property showcases and intelligent search.',
    tags: ['UI/UX', 'Web App', 'Strategy'],
  },
  {
    num: '02',
    title: 'Nexus ERP',
    category: 'Business Management',
    desc: 'End-to-end business management system automating operations across departments.',
    tags: ['ERP', 'Custom Software', 'Automation'],
  },
  {
    num: '03',
    title: 'Search Interiors',
    category: 'Marketplace',
    desc: 'A sophisticated marketplace bridging top-tier interior designers with discerning clients.',
    tags: ['Marketplace', 'Brand', 'Growth'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Portfolio() {
  return (
    <section id="work" className="w-full bg-bg py-24 sm:py-32 lg:py-40">
      <motion.div
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.div className="flex items-center gap-3 mb-4" custom={0} variants={fadeUp}>
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-body text-[13px] text-text-secondary uppercase tracking-[0.15em]">
            Select work
          </span>
        </motion.div>

        <motion.h2
          className="font-display text-text max-w-[600px] mb-16 sm:mb-20"
          custom={1}
          variants={fadeUp}
        >
          Projects that{' '}
          <span className="font-serif italic">deliver results</span>
        </motion.h2>

        {/* Project cards */}
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.num}
              className="group grid grid-cols-1 lg:grid-cols-2 bg-card-bg border border-text/[0.06] rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500 cursor-pointer"
              custom={i + 2}
              variants={fadeUp}
            >
              {/* Left: image placeholder */}
              <div className="relative bg-text/[0.02] min-h-[260px] lg:min-h-[360px] flex items-center justify-center overflow-hidden">
                <div className="w-[70%] max-w-[380px] aspect-[16/10] rounded-lg bg-text/[0.04] border border-text/[0.06] flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-700">
                  <div className="flex flex-col items-center gap-3 opacity-30">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect x="4" y="8" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-text" />
                      <path d="M4 36h40" stroke="currentColor" strokeWidth="1.5" className="text-text" />
                      <rect x="18" y="36" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1" className="text-text" />
                    </svg>
                    <span className="font-body text-[11px] tracking-[0.15em] text-text uppercase">
                      {project.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: info */}
              <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-display text-[13px] text-text-secondary">{project.num}</span>
                    <span className="text-text/20">—</span>
                    <span className="font-body text-[13px] text-accent-dark uppercase tracking-wider">{project.category}</span>
                  </div>
                  <h3 className="font-display text-[32px] sm:text-[40px] text-text leading-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="font-body text-[14px] sm:text-[15px] leading-[1.7] text-text-secondary max-w-[400px]">
                    {project.desc}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-[11px] tracking-wider text-text-secondary border border-text/[0.08] px-3 py-1.5 rounded-full uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 font-body text-[13px] text-text group-hover:text-accent-dark transition-colors duration-300">
                    View case study
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
