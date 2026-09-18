import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rohan Mehta',
    role: 'SaaS Founder',
    quote: "The team truly understood our vision and delivered beyond expectations. Fast, beautiful, and exactly what we needed."
  },
  {
    name: 'Priya Sharma',
    role: 'Brand Manager',
    quote: "Our brand identity transformed completely. Exceptional design sensibility — highly recommend for serious brands."
  },
  {
    name: 'Aditya Rao',
    role: 'E-Commerce Owner',
    quote: "Concept to deployment in 3 weeks. Professional, responsive, and technically excellent."
  },
  {
    name: 'Fatima Al-Noor',
    role: 'Startup Co-founder',
    quote: "Clean UI, no bugs, on time. The automation flows save us 20+ hours every single week."
  },
  {
    name: 'Sanjay Verma',
    role: 'Business Owner',
    quote: "Our rankings and conversions improved significantly. Real measurable results — not just reports."
  }
];

const TestimonialCard = ({ data }: { data: any }) => {
  const initials = data.name.split(' ').map((n: string) => n[0]).join('');

  return (
    <div className="group relative bg-gray-100 p-7 md:p-8 hover:bg-white transition-colors duration-300">
      {/* Animated Border Line via Pseudo-element approach */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-black origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]" />

      <div className="mb-4 text-[13px] tracking-[2px] text-black">★★★★★</div>
      
      <p className="font-inter font-normal text-[15px] text-black leading-[1.6] line-clamp-4 min-h-[96px] mb-6">
        "{data.quote}"
      </p>

      <div className="flex items-center gap-3">
        <div className="w-[36px] h-[36px] rounded-full bg-gray-900 flex justify-center items-center font-sora font-bold text-[13px] text-white">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="font-sora font-semibold text-[14px] text-black">{data.name}</span>
          <span className="font-inter font-normal text-[12px] text-gray-500">{data.role}</span>
        </div>
      </div>
    </div>
  );
};

export function Testimonials() {
  return (
    <section className="bg-white px-6 md:px-12 lg:px-[max(5vw,40px)] py-[80px]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="label-text text-black/40 mb-6"
      >
        — TESTIMONIALS
      </motion.div>
      
      <motion.h2 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="font-sora font-extrabold text-[clamp(32px,4vw,48px)] text-black mb-2"
      >
        What clients say.
      </motion.h2>

      <motion.p 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="font-inter font-normal text-[14px] text-gray-500 mb-10"
      >
        5.0 ★ — 50+ projects delivered
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gray-200 border border-gray-200">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white h-full w-full">
            <TestimonialCard data={t} />
          </div>
        ))}
        {/* Placeholder for the 6th spot to maintain grid integrity visually, though the background will just be gray-100 */}
        <div className="bg-gray-100 h-full w-full hidden lg:block" />
      </div>
    </section>
  );
}
