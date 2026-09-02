import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Target } from 'lucide-react';
import { useScramble } from '@/hooks/useScramble';

const features = [
  {
    icon: Zap,
    title: 'Zero Legacy Overhead',
    desc: 'We build with modern, agent-native systems. Your platforms stay fast, clean, and upgradeable as AI evolves.'
  },
  {
    icon: ShieldCheck,
    title: 'Human-In-The-Loop Security',
    desc: 'Hardcoded governance layers. Your data stays secure, requiring human validation for high-risk actions.'
  },
  {
    icon: Target,
    title: 'Value Over Hours',
    desc: 'We price strictly on Systems and Outcomes — delivering production-ready software in days, not months.'
  }
];

const FeatureRow = ({ feature, index }: { feature: any, index: number }) => {
  const { text: scrambledTitle, startScramble, stopScramble } = useScramble(feature.title);

  return (
    <div 
      className="group relative pl-6 mb-12"
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
    >
      {/* Default border */}
      <div className="absolute top-0 left-0 w-[1px] h-full bg-white/15" />
      
      {/* Animated active border */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-white origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]" />

      <div className="flex flex-col transform group-hover:translate-x-[8px] transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]">
        <span className="font-sora font-extrabold text-[32px] text-white/12 mb-2 leading-none">0{index + 1}</span>
        
        <h3 className="font-sora font-bold text-[20px] text-white mb-4 flex items-center gap-2">
          <feature.icon size={18} strokeWidth={1.5} color="inherit" />
          {scrambledTitle}
        </h3>
        
        <p className="font-inter font-normal text-[15px] text-white/55 leading-[1.65]">
          {feature.desc}
        </p>
      </div>
    </div>
  );
};

export function WhyUs() {
  return (
    <section className="bg-black px-6 md:px-12 lg:px-[max(5vw,40px)] py-[120px]">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Col */}
        <div className="w-full lg:w-[40%]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label-text text-white/40 mb-6"
          >
            — WHY CHOOSE US
          </motion.div>
          
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-sora font-extrabold text-[clamp(36px,4vw,56px)] text-white"
          >
            Engineered For High-Stakes Operations.
          </motion.h2>
        </div>

        {/* Right Col */}
        <div className="w-full lg:w-[60%] flex flex-col pt-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <FeatureRow feature={feature} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
