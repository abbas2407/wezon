import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Align',
    desc: 'We start with clarity. We understand your goals, constraints and audience before writing a single brief.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'We map user journeys, prototype interfaces and craft visual systems that serve the business strategy.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'We develop with modern tools and clean architecture. Every sprint delivers working, tested software.',
  },
  {
    num: '04',
    title: 'Scale',
    desc: 'We optimize for performance, launch with confidence and build growth loops that compound over time.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Process() {
  return (
    <section className="w-full bg-text py-24 sm:py-32 lg:py-40">
      <motion.div
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Header */}
        <motion.div className="flex items-center gap-3 mb-4" custom={0} variants={fadeUp}>
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-body text-[13px] text-[#f9f9f9]/50 uppercase tracking-[0.15em]">
            How we work
          </span>
        </motion.div>

        <motion.h2
          className="font-display text-[#f9f9f9] max-w-[600px] mb-16 sm:mb-20"
          custom={1}
          variants={fadeUp}
        >
          A process built for{' '}
          <span className="font-serif italic">momentum</span>
        </motion.h2>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#f9f9f9]/[0.08] rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className={`p-8 sm:p-10 flex flex-col justify-between min-h-[320px] ${
                i < steps.length - 1 ? 'border-b sm:border-b lg:border-b-0 lg:border-r border-[#f9f9f9]/[0.08]' : ''
              }`}
              custom={i + 2}
              variants={fadeUp}
            >
              <div>
                <span className="font-display text-[48px] sm:text-[56px] lg:text-[64px] text-[#f9f9f9]/10 leading-none block mb-6">
                  {step.num}
                </span>
                <h3 className="font-display text-[24px] sm:text-[28px] text-[#f9f9f9] mb-4">
                  {step.title}
                </h3>
              </div>
              <p className="font-body text-[14px] leading-[1.7] text-[#f9f9f9]/50">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
