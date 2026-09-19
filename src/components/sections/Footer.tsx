import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Footer() {
  return (
    <footer id="contact" className="w-full bg-text">
      {/* CTA section */}
      <motion.div
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 lg:py-40 border-b border-[#f9f9f9]/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="font-display text-[clamp(36px,6vw,80px)] text-[#f9f9f9] leading-[1] max-w-[800px]"
          custom={0}
          variants={fadeUp}
        >
          Let's build something{' '}
          <span className="font-serif italic">remarkable</span>
        </motion.h2>
        <motion.div className="mt-10" custom={1} variants={fadeUp}>
          <a
            href="mailto:hello@wezon.in"
            className="inline-flex items-center gap-3 font-body text-[16px] bg-accent text-text px-8 py-4 rounded-full hover:bg-accent-dark transition-colors duration-300"
          >
            Start a conversation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Footer grid */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand */}
          <div>
            <span className="font-display text-[20px] text-[#f9f9f9]">
              we<span className="text-accent">.</span>zon
            </span>
            <p className="font-body text-[13px] text-[#f9f9f9]/40 mt-3 leading-relaxed">
              Digital Product Studio<br />
              Based in Hyderabad, building globally
            </p>
          </div>

          {/* Col 2: Work */}
          <div>
            <span className="font-body text-[12px] text-[#f9f9f9]/30 uppercase tracking-[0.15em] block mb-4">Work</span>
            {['Livora', 'Nexus ERP', 'Search Interiors'].map((item) => (
              <a key={item} href="#work" className="block font-body text-[14px] text-[#f9f9f9]/60 hover:text-[#f9f9f9] transition-colors mb-2.5">
                {item}
              </a>
            ))}
          </div>

          {/* Col 3: Company */}
          <div>
            <span className="font-body text-[12px] text-[#f9f9f9]/30 uppercase tracking-[0.15em] block mb-4">Company</span>
            {[
              { label: 'Services', href: '#services' },
              { label: 'About', href: '#about' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a key={item.label} href={item.href} className="block font-body text-[14px] text-[#f9f9f9]/60 hover:text-[#f9f9f9] transition-colors mb-2.5">
                {item.label}
              </a>
            ))}
          </div>

          {/* Col 4: Contact */}
          <div>
            <span className="font-body text-[12px] text-[#f9f9f9]/30 uppercase tracking-[0.15em] block mb-4">Contact</span>
            <a href="mailto:hello@wezon.in" className="block font-body text-[14px] text-[#f9f9f9]/60 hover:text-[#f9f9f9] transition-colors mb-2.5">
              hello@wezon.in
            </a>
            <div className="flex gap-4 mt-6">
              {['LinkedIn', 'Instagram', 'X'].map((social) => (
                <a key={social} href="#" className="font-body text-[12px] text-[#f9f9f9]/40 hover:text-[#f9f9f9] transition-colors uppercase tracking-wider">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#f9f9f9]/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-body text-[12px] text-[#f9f9f9]/30">
            &copy; {new Date().getFullYear()} we.zon — All rights reserved
          </span>
          <span className="font-body text-[12px] text-[#f9f9f9]/30">
            Hyderabad, India
          </span>
        </div>
      </div>
    </footer>
  );
}
