import React from 'react';
import { Marquee } from '@/components/ui/Marquee';

export function MarqueeStrip() {
  const text = "AGENTIC SYSTEMS ✦ WEB INTELLIGENCE ✦ AUTONOMOUS FLOWS ✦ ZERO LEGACY ✦ ENTER THE ZONE ✦ DAYS NOT MONTHS ✦ ";
  
  return (
    <section className="w-full bg-white py-5 border-t border-b border-black overflow-hidden">
      <Marquee speed="55s" direction="left">
        <div className="flex text-black font-sora font-bold text-[15px] tracking-[0.06em]">
          {text}
          {text}
          {text}
          {text}
        </div>
      </Marquee>
    </section>
  );
}
