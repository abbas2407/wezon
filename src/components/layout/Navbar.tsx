import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useScramble } from '@/hooks/useScramble';
import { useMagnetic } from '@/hooks/useMagnetic';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavLink = ({ text, href }: { text: string; href: string }) => {
  const { text: scrambled, startScramble, stopScramble } = useScramble(text);
  const ref = useMagnetic();

  return (
    <a
      // @ts-ignore
      ref={ref}
      href={href}
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      className="relative group font-sora font-medium text-[13px] uppercase tracking-[0.1em] text-white/70 hover:text-white transition-colors duration-300 py-2 px-1"
      data-cursor="hover"
    >
      {scrambled}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
    </a>
  );
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-[9999] transition-all duration-300 flex items-center justify-between px-6 md:px-12 h-[80px]',
          scrolled ? 'bg-black/90 backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.1)]' : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="flex-1">
          <a href="#" className="text-white font-sora font-extrabold text-[18px] inline-block leading-none" data-cursor="hover">
            <span className="logo-we">we</span>
            <span className="logo-sparkle">✦</span>
            <span className="logo-zon">zon</span>
          </a>
        </div>

        <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
          <NavLink text="About" href="#about" />
          <NavLink text="Services" href="#services" />
          <NavLink text="Work" href="#work" />
          <NavLink text="FAQ" href="#faq" />
          <NavLink text="Contact" href="#contact" />
        </nav>

        <div className="flex-1 flex justify-end items-center">
          <div className="hidden md:block">
            <Button variant="white">Let's Talk</Button>
          </div>
          <button
            className="md:hidden text-white ml-4"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black z-[10000] flex flex-col p-6 md:p-12"
          >
            <div className="flex justify-between items-center h-[80px] -mt-6 -mx-6 px-6 md:-mt-12 md:-mx-12 md:px-12">
              <span className="text-white font-sora font-extrabold text-[18px] inline-block leading-none">
                <span className="logo-we">we</span>
                <span className="logo-sparkle">✦</span>
                <span className="logo-zon">zon</span>
              </span>
              <button className="text-white" onClick={() => setMobileOpen(false)}>
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 mt-12 flex-1">
              {['About', 'Services', 'Work', 'FAQ', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-sora font-bold text-[32px] text-white hover:text-white/70"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="mt-auto">
              <p className="font-sora text-white/50 text-[13px] mb-4">hello@wezon.agency</p>
              <Button variant="white" className="w-full">Let's Talk</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
