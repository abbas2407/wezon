import React, { useState } from 'react';

const systemTouchpoints = [
  {
    id: '01',
    title: 'STRATEGY',
    desc: 'Business objectives, positioning, audience intelligence and unified digital roadmap.',
  },
  {
    id: '02',
    title: 'DESIGN',
    desc: 'Visual identity, design systems, and digital interfaces crafted for unmistakable recognition.',
  },
  {
    id: '03',
    title: 'BUILD',
    desc: 'Websites, high-performance web applications, platforms, and spatial digital touchpoints.',
  },
  {
    id: '04',
    title: 'INFRASTRUCTURE',
    desc: 'Cloud architectures, headless backends, ERP/CRM integrations, and intelligent automation.',
  },
  {
    id: '05',
    title: 'GROWTH',
    desc: 'Performance marketing engines, acquisition funnels, conversion optimization, and compounding scale.',
  },
];

export function WezonSystem() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="system"
      className="relative bg-black text-white overflow-hidden"
      style={{
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 4vw, 56px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-5 relative flex flex-col justify-between min-h-[380px]">
          {/* Subtle Concentric Arc Vector Background */}
          <div className="absolute top-12 -left-20 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute top-4 -left-28 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />

          <div>
            <div className="text-[12px] tracking-[0.25em] text-white/50 mb-6 font-mono">
              THE WE✦ZON SYSTEM
            </div>
            <h2
              data-letter-fade
              className="text-white font-bold leading-[1.02] tracking-tight uppercase"
              style={{
                fontFamily: 'Orbitron, Space Grotesk, sans-serif',
                fontSize: 'clamp(32px, 3.8vw, 54px)',
              }}
            >
              ONE SYSTEM. EVERY DIGITAL TOUCHPOINT.
            </h2>
          </div>

          <div className="mt-12 z-10">
            <p data-line-reveal className="text-white/60 text-[15px] leading-relaxed font-sans max-w-[340px]">
              WE✦ZON brings strategy, design, technology, and growth under one cohesive, connected architecture.
            </p>
            <div className="mt-6 flex items-center gap-2 text-white/30 font-mono text-xs">
              <span>✦</span>
              <span>UNIFIED ARCHITECTURE</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: INTERACTIVE ACCORDION LIST ── */}
        <div className="lg:col-span-7 flex flex-col border-t border-white/10">
          {systemTouchpoints.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative py-7 border-b border-white/10 transition-all duration-300 cursor-pointer"
                style={{
                  background: isHovered ? 'linear-gradient(90deg, rgba(255,255,255,0.03), transparent)' : 'transparent',
                  paddingLeft: isHovered ? '12px' : '0px',
                }}
              >
                <div className="flex items-start gap-6">
                  {/* High-tech indicator glyph */}
                  <div
                    className="w-7 h-7 mt-1 rounded-sm border flex items-center justify-center transition-colors duration-300 shrink-0"
                    style={{
                      borderColor: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                      backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <span className="text-[11px] font-mono">{isHovered ? '✦' : '→'}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div
                        className="text-white font-bold uppercase transition-colors duration-200"
                        style={{
                          fontFamily: 'Orbitron, Space Grotesk, sans-serif',
                          fontSize: 'clamp(18px, 1.8vw, 24px)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {item.id} — {item.title}
                      </div>
                      <span className="text-white/30 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        [EXPLORE]
                      </span>
                    </div>

                    <p className="mt-2 text-white/55 text-[14px] leading-relaxed font-sans max-w-[560px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
