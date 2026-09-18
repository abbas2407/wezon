import React from 'react';
import { Marquee } from '@/components/ui/Marquee';

export function MarqueeStrip2() {
  const text = "ZERO LEGACY ✦ AUTONOMOUS FLOWS ✦ 80% FASTER ✦ ENTER THE ZONE ✦ AGENTIC SYSTEMS ✦ DAYS NOT MONTHS ✦ ";
  
  return (
    <section className="w-full bg-black py-5 overflow-hidden">
      <Marquee speed="55s" direction="right">
        <div className="flex text-white font-sora font-bold text-[15px] tracking-[0.06em]">
          {text}
          {text}
          {text}
          {text}
        </div>
      </Marquee>
    </section>
  );
}
