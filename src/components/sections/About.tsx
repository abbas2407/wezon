import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function About() {
  return (
    <section id="about" className="w-full bg-bg py-24 sm:py-32 lg:py-40">
      <motion.div
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section label */}
        <motion.div className="flex items-center gap-3 mb-8" custom={0} variants={fadeUp}>
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-body text-[13px] text-text-secondary uppercase tracking-[0.15em]">
            Who we are
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: big statement */}
          <motion.div custom={1} variants={fadeUp}>
            <h2 className="font-display text-text leading-[1.1] max-w-[560px]">
              A digital product studio that builds with{' '}
              <span className="font-serif italic">clarity and craft</span>
            </h2>
          </motion.div>

          {/* Right: description */}
          <motion.div custom={2} variants={fadeUp} className="flex flex-col justify-end">
            <p className="font-body text-[16px] sm:text-[17px] leading-[1.7] text-text-secondary max-w-[480px]">
              We are a team of strategists, designers and engineers who believe great digital products come from understanding the business first. Based in Hyderabad, we work with companies who want more than just a website — they want a system that grows with them.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-text/20" />
              <span className="font-body text-[13px] text-text-secondary">Since 2024</span>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 pt-12 border-t border-text/[0.06]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { num: '50+', label: 'Projects delivered' },
            { num: '15+', label: 'Active clients' },
            { num: '5', label: 'Core services' },
            { num: '100%', label: 'Client retention' },
          ].map((stat, i) => (
            <motion.div key={stat.label} custom={i} variants={fadeUp} className="flex flex-col">
              <span className="font-display text-[40px] sm:text-[48px] text-text leading-none">{stat.num}</span>
              <span className="font-body text-[13px] text-text-secondary mt-2">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
