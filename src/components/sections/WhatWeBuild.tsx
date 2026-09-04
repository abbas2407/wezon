import React, { useState } from 'react';

const buildItems = [
  {
    id: '01',
    title: 'DIGITAL EXPERIENCES',
    tags: ['websites', 'landing pages', 'web apps', 'product design'],
    desc: 'Bespoke web experiences with 60fps WebGL, liquid shaders, and intuitive spatial UI.',
  },
  {
    id: '02',
    title: 'BUSINESS SYSTEMS',
    tags: ['custom erp', 'crm suites', 'executive dashboards', 'internal tooling'],
    desc: 'Robust enterprise-grade internal systems engineered for automated operating efficiency.',
  },
  {
    id: '03',
    title: 'AUTOMATION',
    tags: ['autonomous agents', 'workflow orchestration', 'data pipelines', 'ai models'],
    desc: 'Next-gen autonomous AI workflows that run 24/7 with zero human intervention.',
  },
  {
    id: '04',
    title: 'PERFORMANCE',
    tags: ['seo infrastructure', 'cro optimization', 'cloud scale', 'speed audits'],
    desc: 'High-octane performance engineering driving compounding conversion and revenue.',
  },
];

export function WhatWeBuild() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section
      id="build"
      className="relative bg-black text-white overflow-hidden"
      style={{
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 4vw, 56px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Top Tag & Crosshair */}
      <div className="flex items-center gap-4 text-[12px] tracking-[0.25em] text-white/50 mb-6 font-mono">
        <span>FROM IDEA TO INFRASTRUCTURE</span>
        <span className="text-white/30">✕</span>
      </div>

      {/* Main Section Headline */}
      <h2
        data-letter-fade
        className="text-white font-bold leading-none tracking-tight uppercase mb-12"
        style={{
          fontFamily: 'Orbitron, Space Grotesk, sans-serif',
          fontSize: 'clamp(36px, 4.5vw, 68px)',
        }}
      >
        WHAT WE BUILD
      </h2>

      {/* Kinetic Interactive List */}
      <div className="border-t border-white/10 flex flex-col">
        {buildItems.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveIdx(idx)}
              className="group relative border-b border-white/10 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                background: isActive
                  ? 'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)'
                  : 'transparent',
              }}
            >
              {/* Left animated accent line on active */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
              )}

              <div className="py-7 px-4 md:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Title */}
                <div
                  className="font-bold uppercase tracking-tight transition-colors duration-200"
                  style={{
                    fontFamily: 'Orbitron, Space Grotesk, sans-serif',
                    fontSize: 'clamp(28px, 4.2vw, 58px)',
                    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {item.title}
                </div>

                {/* Inline Pills / Tags matching reference image */}
                <div className="flex items-center gap-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all duration-200"
                      style={{
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expandable description preview */}
              {isActive && (
                <div className="px-4 md:px-8 pb-6 text-white/60 text-sm font-sans max-w-xl animate-fadeIn">
                  {item.desc}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
