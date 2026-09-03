import React, { useRef } from 'react';

const testimonials = [
  {
    id: '01',
    name: 'Rohan Mehta',
    role: 'Founder & CEO, Synthex AI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    quote: 'we✦zon rebuilt our entire cloud pipeline and spatial landing experience in 14 days. Our pipeline velocity increased 3.2x with zero downtime.',
    company: 'SYNTHEX',
  },
  {
    id: '02',
    name: 'Marcus Vance',
    role: 'Head of Product, Kinetix Luxury',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    quote: 'The level of technical execution and design discipline is unrivaled. The 3D liquid interaction alone drove our engagement metrics through the roof.',
    company: 'KINETIX',
  },
  {
    id: '03',
    name: 'Elena Rostova',
    role: 'VP Digital, Horizon Venture Labs',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80',
    quote: 'They operate in a completely different league. Fast, uncompromisingly reliable, and obsessive about performance and aesthetics.',
    company: 'HORIZON',
  },
];

export function ClientSignals() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 8;
    const rotateY = (x / (rect.width / 2)) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(16px)`;
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    // Default perspective rest angles
    const restAngles = [-3, 0, 3];
    card.style.transform = `perspective(1000px) rotateY(${restAngles[idx]}deg) translateZ(0px)`;
  };

  return (
    <section
      id="signals"
      className="relative bg-black text-white overflow-hidden"
      style={{
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 4vw, 56px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-12">
        <h2
          className="text-white font-bold leading-none tracking-tight uppercase"
          style={{
            fontFamily: 'Orbitron, Space Grotesk, sans-serif',
            fontSize: 'clamp(28px, 3.5vw, 52px)',
          }}
        >
          CLIENT SIGNALS
        </h2>
        <span className="text-white/40 font-mono text-sm">✕</span>
      </div>

      {/* 3D Perspective Tilted Cards Layout Matching Reference Image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
        {testimonials.map((t, idx) => {
          const restAngles = [-3, 0, 3];
          return (
            <div
              key={t.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="relative bg-[#0b0b0b] border border-white/15 p-8 flex flex-col justify-between rounded-sm transition-transform duration-300 ease-out overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateY(${restAngles[idx]}deg)`,
                transformStyle: 'preserve-3d',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Card Header: Client Avatar + Company Badge */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-white/20 filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div>
                    <div className="text-white font-bold text-sm tracking-wide font-sans">
                      {t.name}
                    </div>
                    <div className="text-white/45 text-xs font-mono">
                      {t.role}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-white/30 tracking-widest">{t.company}</span>
              </div>

              {/* Quote */}
              <p className="text-white/70 text-sm md:text-[15px] leading-relaxed font-sans mb-8">
                "{t.quote}"
              </p>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                <span>SIGNAL // 0{idx + 1}</span>
                <span className="text-[#7CFF9C]">VERIFIED ✦</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
