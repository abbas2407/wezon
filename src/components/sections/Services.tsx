import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScramble } from '@/hooks/useScramble';

const services = [
  { num: '01', title: 'UI/UX Design', desc: 'Research-backed interfaces for conversion.', tools: 'UX Research • Wireframing • Prototyping • Design Systems' },
  { num: '02', title: 'Website Development', desc: 'Fast, SEO-optimized, pixel-perfect.', tools: 'Next.js • CMS • Animations • Performance Optimization' },
  { num: '03', title: 'Web App Development', desc: 'Scalable apps, clean architecture.', tools: 'Dashboards • APIs • Auth • Real-time Features' },
  { num: '04', title: 'Mobile App Development', desc: 'Native-grade performance, all devices.', tools: 'Flutter • iOS • Android • App Store Submission' },
  { num: '05', title: 'Digital Media Marketing', desc: 'Community-first, algorithm-native.', tools: 'Content Calendar • Platform Management • Video Strategy' },
  { num: '06', title: 'Performance Marketing', desc: 'Every rupee tracked, every campaign optimized.', tools: 'Google Ads • Meta Ads • CRO • Attribution' },
  { num: '07', title: 'Graphic Design & Packaging', desc: 'Identities that command attention.', tools: 'Logo • Brand System • Packaging • Collateral' },
  { num: '08', title: 'ERP / CRM / HRMS Development', desc: 'Enterprise platforms for operational excellence.', tools: 'Custom CRM • HRMS • ERP Modules • RBAC' },
  { num: '09', title: 'Automation Tools & Agents', desc: 'Autonomous systems running your ops 24/7.', tools: 'LLM Agents • Workflow Automation • State Machine Architecture' },
];

const ServiceRow = ({ service, isOpen, onClick }: { service: any, isOpen: boolean, onClick: () => void }) => {
  const { text: scrambledNum, startScramble, stopScramble } = useScramble(service.num);

  return (
    <div 
      className="group relative cursor-pointer"
      data-cursor="hover"
      onClick={onClick}
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative px-6 md:px-12 py-8 flex flex-col md:flex-row md:items-center justify-between transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[10px]">
        <div className="flex items-center gap-8 md:gap-16">
          <span className="font-sora font-semibold text-[24px] md:text-[32px] text-white/40 group-hover:text-white transition-colors w-[40px]">
            {scrambledNum}.
          </span>
          <h3 className="font-sora font-bold text-[24px] md:text-[40px] text-white">
            {service.title}
          </h3>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden relative px-6 md:px-12"
          >
            <div className="pb-8 md:pl-[120px]">
              <p className="body-text text-white/70 mb-4">{service.desc}</p>
              <p className="caption-text text-white/40 uppercase tracking-wider">{service.tools}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-[1px] bg-white/10 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 absolute bottom-0 left-0" />
      <div className="w-full h-[1px] bg-white/5 absolute bottom-0 left-0" />
    </div>
  );
};

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="bg-black py-[120px] text-white overflow-hidden">
      <div className="px-6 md:px-12 lg:px-[max(5vw,40px)] mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="label-text text-white/40 mb-6"
        >
          — WHAT WE DO
        </motion.div>
        
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="font-sora font-extrabold text-[clamp(48px,6vw,80px)] text-white mb-6"
        >
          Our Services.
        </motion.h2>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="body-text text-white/55 max-w-[500px]"
        >
          Full-stack intelligence — from pixel-perfect interfaces
          to autonomous business systems.
        </motion.p>
      </div>

      <div className="w-full border-t border-white/10">
        {services.map((service, i) => (
          <ServiceRow 
            key={i} 
            service={service} 
            isOpen={openIndex === i} 
            onClick={() => setOpenIndex(openIndex === i ? null : i)} 
          />
        ))}
      </div>
    </section>
  );
}
