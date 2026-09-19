import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    num: '01',
    title: 'Strategy',
    desc: 'Business objectives, positioning, audience research and digital roadmap. A clear direction before a single pixel is placed.',
  },
  {
    num: '02',
    title: 'Brand',
    desc: 'Identity systems, visual language and digital presence built for instant recognition and lasting trust.',
  },
  {
    num: '03',
    title: 'Product',
    desc: 'Websites, applications, platforms and user experiences designed to convert visitors into customers.',
  },
  {
    num: '04',
    title: 'Technology',
    desc: 'Custom software, ERP systems, integrations and intelligent automation that scales with your business.',
  },
  {
    num: '05',
    title: 'Growth',
    desc: 'Performance marketing, acquisition funnels, optimization and analytics. Results that compound.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Services() {
  return (
    <section id="services" className="w-full bg-bg py-24 sm:py-32 lg:py-40">
      <motion.div
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Section header */}
        <motion.div className="flex items-center gap-3 mb-4" custom={0} variants={fadeUp}>
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-body text-[13px] text-text-secondary uppercase tracking-[0.15em]">
            What we do
          </span>
        </motion.div>

        <motion.h2
          className="font-display text-text max-w-[600px] mb-16 sm:mb-20"
          custom={1}
          variants={fadeUp}
        >
          End-to-end capabilities for digital{' '}
          <span className="font-serif italic">excellence</span>
        </motion.h2>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              className="group bg-card-bg border border-text/[0.06] rounded-2xl p-8 sm:p-10 flex flex-col justify-between min-h-[280px] hover:border-accent/40 transition-all duration-500 cursor-default"
              custom={i + 2}
              variants={fadeUp}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-[13px] text-text-secondary tracking-wide">{service.num}</span>
                  <div className="w-8 h-8 rounded-full bg-accent/20 group-hover:bg-accent/40 transition-colors duration-500 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-text" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-display text-[24px] sm:text-[28px] text-text leading-tight mb-4">
                  {service.title}
                </h3>
              </div>
              <p className="font-body text-[14px] leading-[1.7] text-text-secondary">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
