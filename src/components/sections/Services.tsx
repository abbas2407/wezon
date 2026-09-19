import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const services = [
  {
    num: '01',
    title: 'Strategy & Consulting',
    desc: 'Business objectives, market positioning, audience research and digital roadmap — a clear direction before a single pixel is placed.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 4v24M4 16h24" />
        <path d="M7 7l18 18M25 7L7 25" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'UX/UI Design',
    desc: 'Interfaces that feel right — grounded in product logic and technical constraints. User journeys, prototypes and visual systems that serve the business.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8h24v18H4z" />
        <path d="M4 8l12 10L28 8" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Product Development',
    desc: 'Full-cycle web, mobile, and application builds — ready to ship, scale, and evolve. Modern architecture, clean code, tested software.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="26" height="20" rx="2" />
        <path d="M3 25h26" />
        <rect x="12" y="25" width="8" height="3" rx="1" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Integrations & Automation',
    desc: 'API systems, automation layers, workflow orchestration, data pipelines and intelligent integrations that connect your entire stack.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="10" height="10" rx="1" />
        <rect x="18" y="4" width="10" height="10" rx="1" />
        <rect x="4" y="18" width="10" height="10" rx="1" />
        <rect x="18" y="18" width="10" height="10" rx="1" />
        <path d="M14 9h4M9 14v4M23 14v4M14 23h4" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Growth & Performance',
    desc: 'Performance marketing, acquisition funnels, SEO infrastructure, CRO and analytics. Results that compound quarter over quarter.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 10v6l4 4" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Custom Solutions',
    desc: 'ERP systems, CRM suites, internal tooling and bespoke platforms — engineered for your exact workflow, not a template.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4l-2 6H4l5 4-2 6 5-4 5 4-2-6 5-4h-6z" />
      </svg>
    ),
    accent: true,
  },
];

function ServiceCard({
  service,
  index,
  total,
}: {
  service: (typeof services)[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLast = index === total - 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{ top: `${100 + index * 24}px`, zIndex: index + 1 }}
    >
      <motion.div
        className={`w-full rounded-2xl border overflow-hidden transition-shadow duration-500 ${
          isLast
            ? 'bg-accent border-accent/40 shadow-[0_8px_40px_rgba(241,255,102,0.15)]'
            : 'bg-card-bg border-text/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.04)]'
        }`}
        style={{ scale, opacity }}
      >
        <div className="flex items-start gap-6 sm:gap-8 p-8 sm:p-10 lg:p-12">
          {/* Icon */}
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
              isLast ? 'bg-text/10 text-text' : 'bg-text/[0.03] text-text/60'
            }`}
          >
            {service.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-display text-[22px] sm:text-[26px] lg:text-[28px] leading-tight mb-3 ${
                isLast ? 'text-text' : 'text-text'
              }`}
            >
              {service.title}
            </h3>
            <p
              className={`font-body text-[14px] sm:text-[15px] leading-[1.7] max-w-[560px] ${
                isLast ? 'text-text/70' : 'text-text-secondary'
              }`}
            >
              {service.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Services() {
  return (
    <section id="services" className="w-full bg-bg py-24 sm:py-32 lg:py-40">
      <motion.div
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
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
      </motion.div>

      {/* Sticky card stack */}
      <div
        className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-16 pb-[100px]"
        style={{ minHeight: `${services.length * 40 + 60}vh` }}
      >
        {services.map((service, i) => (
          <ServiceCard
            key={service.num}
            service={service}
            index={i}
            total={services.length}
          />
        ))}
      </div>
    </section>
  );
}
