import React from 'react';
import { motion } from 'framer-motion';
import { useCounter } from '@/hooks/useCounter';
import { useScramble } from '@/hooks/useScramble';

const StatBlock = ({ number, suffix, line1, line2 }: { number: number, suffix: string, line1: string, line2: string }) => {
  const { count, ref } = useCounter(number);
  const numberStr = count.toString() + suffix;
  const { text: scrambled, startScramble, stopScramble } = useScramble(numberStr);

  return (
    <div 
      className="flex flex-col relative px-4"
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
    >
      <span className="font-sora font-extrabold text-[clamp(56px,8vw,96px)] text-black mb-2 leading-none">
        <span className="hidden" ref={ref}>{count}</span>
        {scrambled}
      </span>
      <span className="font-sora font-bold text-[16px] text-black uppercase tracking-widest mb-1">{line1}</span>
      <span className="font-inter font-normal text-[14px] text-gray-500">{line2}</span>
    </div>
  );
};

export function Stats() {
  const stats = [
    { num: 80, suffix: '%', l1: 'Faster', l2: 'Delivery' },
    { num: 50, suffix: '+', l1: 'Projects', l2: 'Delivered' },
    { num: 40, suffix: '+', l1: 'Happy', l2: 'Clients' },
    { num: 3, suffix: '+', l1: 'Years', l2: 'Expertise' },
  ];

  return (
    <section className="bg-white px-6 md:px-12 lg:px-[max(5vw,40px)] py-[100px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 gap-y-12 sm:gap-y-0">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <StatBlock number={s.num} suffix={s.suffix} line1={s.l1} line2={s.l2} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
