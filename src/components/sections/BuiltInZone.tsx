import React, { useState } from 'react';

const showcaseProjects = [
  {
    id: '01',
    name: 'LIVORA SPATIAL',
    category: 'E-COMMERCE / SPATIAL 3D',
    desc: 'Luxury furniture retail transformed into a zero-latency interactive spatial 3D experience with real-time room configuration.',
    stats: '+142% Avg Order Value · 60fps WebGL',
    previewUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    laptopUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '02',
    name: 'TAILORME ARCHITECTURE',
    category: 'INTELLIGENT FASHION ERP',
    desc: 'Redefining bespoke tailoring with computerized 3D measurement mapping, autonomous inventory pipelines, and global client portals.',
    stats: '84% Reduction in Lead Time · Enterprise ERP',
    previewUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    laptopUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
];

export function BuiltInZone() {
  const [activeCase, setActiveCase] = useState(0);
  const current = showcaseProjects[activeCase];

  return (
    <section
      id="work"
      className="relative bg-black text-white overflow-hidden"
      style={{
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 4vw, 56px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative">
        {/* Subtle background concentric vector arc */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />

        <div>
          <h2
            data-letter-fade
            className="text-white font-bold leading-none tracking-tight uppercase"
            style={{
              fontFamily: 'Orbitron, Space Grotesk, sans-serif',
              fontSize: 'clamp(32px, 4vw, 60px)',
            }}
          >
            BUILT IN ZONE
          </h2>
          <div className="flex items-center gap-3 mt-4 text-[12px] tracking-[0.25em] text-white/50 font-mono">
            <span>BUILT. TESTED. MOVED.</span>
            <span className="text-white/30">✕</span>
          </div>
        </div>

        {/* Case switcher tabs */}
        <div className="flex items-center gap-3">
          {showcaseProjects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveCase(idx)}
              className="px-4 py-2 text-xs font-mono tracking-wider transition-all duration-200 border rounded-sm"
              style={{
                borderColor: activeCase === idx ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                backgroundColor: activeCase === idx ? '#ffffff' : 'transparent',
                color: activeCase === idx ? '#000000' : 'rgba(255, 255, 255, 0.6)',
              }}
            >
              CASE {p.id}
            </button>
          ))}
        </div>
      </div>

      {/* Dark Glassmorphic Showcase Container Matching Reference Image */}
      <div
        className="relative bg-[#0a0a0a] border border-white/10 p-6 md:p-12 overflow-hidden rounded-md"
        style={{
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── LEFT: PROJECT DETAILS & SPECS ── */}
          <div className="lg:col-span-5 flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/15 text-[#7CFF9C] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7CFF9C] animate-pulse" />
                <span>CASE {current.id}</span>
                <span className="text-white/30">/</span>
                <span className="text-white/70">{current.category}</span>
              </div>

              <h3
                className="text-white font-bold uppercase tracking-tight mb-4"
                style={{
                  fontFamily: 'Orbitron, Space Grotesk, sans-serif',
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  lineHeight: 1.1,
                }}
              >
                {current.name}
              </h3>

              <p data-line-reveal className="text-white/60 text-sm md:text-base leading-relaxed font-sans max-w-md mb-6">
                {current.desc}
              </p>

              <div className="text-xs font-mono text-white/40 tracking-wider mb-8">
                METRIC: {current.stats}
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-white hover:text-white/80 transition-colors uppercase"
            >
              <span data-hover-stagger>EXPLORE CASE</span>
              <span className="text-sm">→</span>
            </a>
          </div>

          {/* ── RIGHT: SLEEK LAPTOP & UI MOCKUP VIEWPORT ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Top Dashboard Floating Strip Mockup */}
            <div className="w-full bg-[#141414] border border-white/10 rounded-t-lg p-3 flex items-center justify-between text-xs font-mono text-white/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 text-[11px] text-white/40">app.wezon.zone/{current.name.toLowerCase().replace(' ', '-')}</span>
              </div>
              <span className="text-[11px] text-[#7CFF9C]">LIVE ● 60FPS</span>
            </div>

            {/* Laptop Screen Hardware Mockup Frame */}
            <div
              className="relative w-full bg-[#050505] border border-white/15 rounded-b-xl overflow-hidden p-2 shadow-2xl"
              style={{
                aspectRatio: '16/10',
              }}
            >
              <div className="w-full h-full rounded-lg overflow-hidden relative group">
                <img
                  data-parallax="8"
                  src={current.laptopUrl}
                  alt={current.name}
                  className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Tech overlay grid line and gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
                  <span>[SPATIAL RENDERING: 4K HDR]</span>
                  <span className="text-white/60">SYSTEM INTEGRITY 100%</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
