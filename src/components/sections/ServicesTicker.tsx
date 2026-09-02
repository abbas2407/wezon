import React from 'react';
import { Marquee } from '@/components/ui/Marquee';

export function ServicesTicker() {
  const text = "UI/UX ─── Website Dev ─── Web Apps ─── Mobile ─── CRM/ERP ─── Automation ─── Performance Mktg ─── Graphic Design ─── Digital Media ─── ";
  
  return (
    <section className="w-full bg-gray-900 py-[18px] border-t border-b border-[rgba(255,255,255,0.1)] overflow-hidden">
      <Marquee speed="55s" direction="right">
        <div className="flex text-white/55 font-sora font-semibold text-[15px]">
          {text}
          {text}
          {text}
          {text}
        </div>
      </Marquee>
    </section>
  );
}
