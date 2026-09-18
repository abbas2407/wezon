import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: "How fast do you actually deliver?",
    a: "Typically 2–4 weeks. Our agentic process eliminates the endless back-and-forth of traditional agencies."
  },
  {
    q: "What does 'agentic development' mean?",
    a: "Parts of our pipeline are automated by AI agents — boilerplate, testing, optimization — so our humans focus on your UX and logic."
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Absolutely. We've helped multiple founders go from idea to live product in under 3 weeks."
  },
  {
    q: "What makes we✦zon different from other agencies?",
    a: "Zero legacy overhead. Everything we build is modern, fast, and upgradeable. We don't use bloated outdated stacks."
  },
  {
    q: "Is the pricing transparent?",
    a: "Yes. We give a clear fixed quote before we start. No surprises. We price on systems delivered, not hours logged."
  },
  {
    q: "Do you handle hosting and deployment?",
    a: "Yes — end-to-end on Vercel, AWS, or your preferred cloud. Domain setup and DNS included."
  },
  {
    q: "What if I already have a site and want to upgrade?",
    a: "We do full rebuilds and strategic upgrades. Send your current site — we'll audit it for free."
  }
];

const FAQItem = ({ faq, isOpen, onClick }: { faq: any, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-black cursor-pointer group" onClick={onClick} data-cursor="hover">
      <div className="py-6 flex justify-between items-center gap-4">
        <h3 className="font-sora font-semibold text-[18px] text-black group-hover:text-black/70 transition-colors">
          {faq.q}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="text-black"
        >
          <Plus size={24} strokeWidth={1.5} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 font-inter font-normal text-[15px] text-gray-700 leading-[1.6]">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white px-6 md:px-12 lg:px-[max(5vw,40px)] py-[120px]">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left Col */}
        <div className="w-full lg:w-[35%]">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-sora font-extrabold text-[clamp(48px,6vw,80px)] text-black mb-6"
          >
            FAQs
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="font-inter font-normal text-[16px] text-gray-500 max-w-[300px]"
          >
            Everything you need to know before entering the zone.
          </motion.p>
        </div>

        {/* Right Col */}
        <div className="w-full lg:w-[65%] border-t border-black">
          {faqs.map((faq, i) => (
            <FAQItem 
              key={i} 
              faq={faq} 
              isOpen={openIndex === i} 
              onClick={() => setOpenIndex(openIndex === i ? null : i)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
