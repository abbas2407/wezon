import React from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-bg overflow-hidden pt-[72px]"
    >
      {/* Decorative accent blob */}
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-32">
        {/* Eyebrow */}
        <motion.p
          className="font-body text-[13px] sm:text-[14px] text-text-secondary tracking-wide mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Digital Product Studio — Based in Hyderabad
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="font-display font-400 text-text leading-[0.95] max-w-[1100px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Your vision,{' '}
          <span className="font-serif italic font-normal">our zone</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="font-body text-[16px] sm:text-[18px] text-text-secondary max-w-[480px] mt-8 sm:mt-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          We combine strategy, design and technology to build digital products that move businesses forward.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10 sm:mt-12 flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#work"
            className="font-body text-[14px] bg-text text-bg px-8 py-3.5 rounded-full hover:bg-text/85 transition-colors duration-300"
          >
            View our work
          </a>
          <a
            href="#services"
            className="font-body text-[14px] text-text border border-text/15 px-8 py-3.5 rounded-full hover:border-text/30 transition-colors duration-300"
          >
            Our services
          </a>
        </motion.div>
      </div>

      {/* Bottom marquee / partner statement */}
      <motion.div
        className="w-full border-t border-text/[0.06] py-6 sm:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <p className="text-center font-display text-[14px] sm:text-[16px] text-text-secondary tracking-wide">
          We build for speed, scale, and substance.
        </p>
      </motion.div>
    </section>
  );
}
