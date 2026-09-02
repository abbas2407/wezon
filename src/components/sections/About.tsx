import React from 'react';
import { motion } from 'framer-motion';
import { useTilt } from '@/hooks/useTilt';
import { useCounter } from '@/hooks/useCounter';

import { useInView } from 'framer-motion';

const WordReveal = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(' ');
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  return (
    <h2 className={className} ref={ref}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 -mb-1 mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: i * 0.04 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};

const FadeUpText = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Stat = ({ number, suffix, label }: { number: number, suffix: string, label: string }) => {
  const { count, ref } = useCounter(number);
  return (
    <div className="flex flex-col">
      <span className="font-sora font-extrabold text-[52px] text-black leading-none mb-1">
        <span ref={ref}>{count}</span>{suffix}
      </span>
      <span className="font-inter font-normal text-[14px] text-gray-500">{label}</span>
    </div>
  );
};

export function About() {
  const imageRef = useTilt();

  return (
    <section id="about" className="bg-white px-6 md:px-12 lg:px-[max(5vw,40px)] pt-[60px] pb-[120px]">
      <FadeUpText className="label-text text-black/40 mb-6">— ABOUT US</FadeUpText>
      
      <WordReveal text="Meet The Minds Behind The Zone." className="font-sora font-extrabold text-[clamp(40px,5.5vw,72px)] text-black mb-12 max-w-[800px] leading-[1.05] tracking-tight" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Col 1 */}
        <div className="flex flex-col gap-4">
          <div 
            // @ts-ignore
            ref={imageRef} 
            className="w-full aspect-[4/3] bg-gray-100 border border-gray-200" 
            data-cursor="image"
          >
            {/* Replace with real team photo */}
          </div>
          <span className="caption-text">The we✦zon team — Hyderabad</span>
        </div>

        {/* Col 2+3 */}
        <div className="grid grid-cols-2 gap-8 content-center">
          <Stat number={50} suffix="+" label="Projects Delivered" />
          <Stat number={3} suffix="+" label="Years Building" />
          <Stat number={40} suffix="+" label="Happy Clients" />
          <Stat number={80} suffix="%" label="Faster Than Legacy" />
        </div>
      </div>

      <motion.hr
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true }}
        className="border-none h-[1px] bg-black/10 w-full mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <FadeUpText className="body-text text-gray-700">
          At we✦zon, we operate in the 'Zone' where data meets
          design. Traditional development cycles are slow, rigid,
          and clunky. We broke that matrix.
        </FadeUpText>
        <FadeUpText className="body-text text-gray-700" delay={0.1}>
          Leveraging a highly advanced Core State Machine and
          Agentic Frameworks, we engineer ultra-responsive web apps,
          intelligent CRM/HRMS platforms, and autonomous digital
          selling agents that think, learn, and act 24/7.
        </FadeUpText>
      </div>
    </section>
  );
}
