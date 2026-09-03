import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 3D Topographic Mesh Wave Graphic for Card 03 (matching reference image)
const TopoMeshWave = () => (
  <svg
    viewBox="0 0 320 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-24 opacity-65 overflow-visible"
  >
    {Array.from({ length: 12 }).map((_, i) => {
      const yOffset = i * 9;
      return (
        <path
          key={i}
          d={`M 0 ${30 + yOffset} Q 80 ${5 + yOffset + (i % 2 === 0 ? 15 : -10)} 160 ${40 + yOffset} T 320 ${20 + yOffset}`}
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth={0.8}
          strokeDasharray={i % 3 === 0 ? '2 2' : 'none'}
        />
      );
    })}
    {/* Concentric grid dots */}
    {Array.from({ length: 8 }).map((_, r) =>
      Array.from({ length: 16 }).map((_, c) => (
        <circle
          key={`${r}-${c}`}
          cx={c * 20 + 10}
          cy={r * 14 + 10}
          r={0.65}
          fill="rgba(255, 255, 255, 0.35)"
        />
      ))
    )}
  </svg>
);

// Crab mark glyph matching the design system
const GlyphMark = () => (
  <svg width="28" height="18" viewBox="0 0 46 30" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M2 6 L2 16 L8 16" />
    <path d="M44 6 L44 16 L38 16" />
    <rect x="10" y="8" width="26" height="16" rx="3" />
    <path d="M14 24 L14 28 M32 24 L32 28" />
  </svg>
);

export function StrategySystemsGrowth() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Shopify Editions style sequential card stacking & depth stagger
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60 + i * 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 55%',
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Card Tilt Interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <section
      ref={sectionRef}
      id="strategy"
      className="relative bg-black text-white overflow-hidden"
      style={{
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 4vw, 56px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Category Header Label */}
      <div className="flex items-center gap-6 text-[12px] tracking-[0.25em] text-white/50 mb-8 font-mono">
        <span>STRATEGY</span>
        <span className="text-white/20">/</span>
        <span>TECHNOLOGY</span>
        <span className="text-white/20">/</span>
        <span>GROWTH</span>
      </div>

      {/* 4-Card Asymmetric Strategy & Impact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        
        {/* ── CARD 0: DATA THAT TURNS INTO BUSINESS IMPACT ── */}
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          onMouseMove={(e) => handleMouseMove(e, 0)}
          onMouseLeave={() => handleMouseLeave(0)}
          className="relative bg-[#0b0b0b] border border-white/10 p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-transform duration-200 ease-out min-h-[440px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Subtle concentric line accent in background */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />

          <div>
            <h2
              className="text-white font-bold leading-[1.05] tracking-tight uppercase"
              style={{
                fontFamily: 'Orbitron, Space Grotesk, sans-serif',
                fontSize: 'clamp(26px, 2.5vw, 38px)',
              }}
            >
              DATA THAT TURNS<br />INTO BUSINESS<br />IMPACT
            </h2>
          </div>

          <div className="mt-16 z-10">
            <p className="text-white/60 text-[14px] leading-relaxed font-sans max-w-[280px]">
              We combine strategy, technology and performance to build digital systems that don’t just look good — they move the business forward.
            </p>
          </div>
        </div>

        {/* ── CARD 1: 01 STRATEGY ── */}
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          onMouseMove={(e) => handleMouseMove(e, 1)}
          onMouseLeave={() => handleMouseLeave(1)}
          className="relative bg-[#0c0c0c] border border-white/10 p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-transform duration-200 ease-out min-h-[440px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Top subtle wireframe arc */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full border border-white/10 pointer-events-none" />

          <div>
            <div
              className="text-white font-mono font-bold leading-none tracking-tighter"
              style={{ fontSize: 'clamp(64px, 6vw, 100px)' }}
            >
              01
            </div>
            <div
              className="text-white font-bold text-xl uppercase tracking-wider mt-3"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              strategy
            </div>
          </div>

          <div className="mt-16">
            <p className="text-white/60 text-[14px] leading-relaxed font-sans max-w-[260px]">
              A clear direction before a single pixel, line of code or campaign is launched.
            </p>
          </div>
        </div>

        {/* ── CARD 2: 02 SYSTEMS ── */}
        <div
          ref={(el) => (cardRefs.current[2] = el)}
          onMouseMove={(e) => handleMouseMove(e, 2)}
          onMouseLeave={() => handleMouseLeave(2)}
          className="relative bg-[#0c0c0c] border border-white/10 p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-transform duration-200 ease-out min-h-[440px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Grid crosshair icon on top right */}
          <div className="absolute top-6 right-6 text-white/40">
            <GlyphMark />
          </div>

          <div>
            <div
              className="text-white font-mono font-bold leading-none tracking-tighter"
              style={{ fontSize: 'clamp(64px, 6vw, 100px)' }}
            >
              02
            </div>
            <div
              className="text-white font-bold text-xl uppercase tracking-wider mt-3"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              systems
            </div>
          </div>

          <div className="mt-16">
            <p className="text-white/60 text-[14px] leading-relaxed font-sans max-w-[260px]">
              Digital experiences designed to connect people, products, data and operations.
            </p>
          </div>
        </div>

        {/* ── CARD 3: 03 GROWTH ── */}
        <div
          ref={(el) => (cardRefs.current[3] = el)}
          onMouseMove={(e) => handleMouseMove(e, 3)}
          onMouseLeave={() => handleMouseLeave(3)}
          className="relative bg-[#0c0c0c] border border-white/10 p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-transform duration-200 ease-out min-h-[440px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Top 3D Topographic Mesh Wave Graphic matching reference image */}
          <div className="absolute top-0 left-0 right-0 pointer-events-none">
            <TopoMeshWave />
          </div>

          {/* Corner glyph */}
          <div className="absolute top-6 right-6 text-white/40 z-10">
            <span className="font-mono text-xs text-white/40">✦</span>
          </div>

          <div className="mt-16 z-10">
            <div
              className="text-white font-mono font-bold leading-none tracking-tighter"
              style={{ fontSize: 'clamp(64px, 6vw, 100px)' }}
            >
              03
            </div>
            <div
              className="text-white font-bold text-xl uppercase tracking-wider mt-3"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              GROWTH
            </div>
          </div>

          <div className="mt-16 z-10">
            <p className="text-white/60 text-[14px] leading-relaxed font-sans max-w-[260px]">
              Performance that creates momentum and delivers compounding enterprise scale.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
