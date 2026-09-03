import React, { useRef, useState, useEffect } from 'react';

// Topographic wave wireframe SVG for metric card
const MiniTopoWave = () => (
  <svg viewBox="0 0 200 80" fill="none" className="w-full h-16 opacity-50 overflow-visible">
    {Array.from({ length: 8 }).map((_, i) => {
      const y = i * 8;
      return (
        <path
          key={i}
          d={`M 0 ${20 + y} Q 50 ${5 + y + (i % 2 === 0 ? 10 : -6)} 100 ${25 + y} T 200 ${15 + y}`}
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth={0.75}
        />
      );
    })}
  </svg>
);

export function MetricsGrid() {
  const [counts, setCounts] = useState({ conversion: 0, speed: 0, traffic: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let hasAnimated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          hasAnimated = true;
          // Animate statistics counting up
          const duration = 1600;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - startTime) / duration);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounts({
              conversion: Math.round(42 * ease),
              speed: Math.round(68 * ease),
              traffic: Math.round(3 * ease),
            });
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 3D Tilt interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 7;
    const rotateY = (x / (rect.width / 2)) * 7;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative bg-black text-white overflow-hidden"
      style={{
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 4vw, 56px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ── LEFT HERO CARD: GOING DIGITAL MOVES BUSINESS. ── */}
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          onMouseMove={(e) => handleMouseMove(e, 0)}
          onMouseLeave={() => handleMouseLeave(0)}
          className="lg:col-span-5 bg-[#0b0b0b] border border-white/10 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden transition-transform duration-200 ease-out min-h-[400px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Concentric vector circle line in background */}
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-28 -right-28 w-88 h-88 rounded-full border border-white/5 pointer-events-none" />

          <div className="z-10">
            <h2
              className="text-white font-bold leading-[1.02] tracking-tight uppercase"
              style={{
                fontFamily: 'Orbitron, Space Grotesk, sans-serif',
                fontSize: 'clamp(30px, 3.5vw, 48px)',
              }}
            >
              GOING DIGITAL<br />
              MOVES BUSINESS.
            </h2>
          </div>

          <div className="mt-16 z-10">
            <p className="text-white/60 text-[14px] leading-relaxed font-sans max-w-sm">
              Measurable momentum engineered through autonomous digital systems, high-speed architectures, and conversion-first user flows.
            </p>
          </div>
        </div>

        {/* ── RIGHT METRIC CARDS CLUSTER ── */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Metric 1: +42% CONVERSION */}
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            onMouseMove={(e) => handleMouseMove(e, 1)}
            onMouseLeave={() => handleMouseLeave(1)}
            className="bg-[#0c0c0c] border border-white/10 p-8 flex flex-col justify-between transition-transform duration-200 ease-out relative min-h-[220px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex justify-between items-start">
              <div
                className="text-white font-mono font-bold leading-none"
                style={{ fontSize: 'clamp(44px, 4vw, 68px)', letterSpacing: '-0.03em' }}
              >
                +{counts.conversion}%
              </div>
              <span className="text-white/30 text-xs font-mono">✦</span>
            </div>

            <div className="mt-8">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-white transition-all duration-1000 ease-out"
                  style={{ width: `${counts.conversion * 2}%` }}
                />
              </div>
              <div
                className="text-white font-bold uppercase tracking-wider text-sm"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                CONVERSION RATE
              </div>
            </div>
          </div>

          {/* Metric 2: +68% SPEED */}
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            onMouseMove={(e) => handleMouseMove(e, 2)}
            onMouseLeave={() => handleMouseLeave(2)}
            className="bg-[#0c0c0c] border border-white/10 p-8 flex flex-col justify-between transition-transform duration-200 ease-out relative overflow-hidden min-h-[220px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Topographic Wave Header */}
            <div className="absolute top-0 right-0 left-0 pointer-events-none">
              <MiniTopoWave />
            </div>

            <div className="flex justify-between items-start z-10 pt-4">
              <div
                className="text-white font-mono font-bold leading-none"
                style={{ fontSize: 'clamp(44px, 4vw, 68px)', letterSpacing: '-0.03em' }}
              >
                +{counts.speed}%
              </div>
              <span className="text-white/30 text-xs font-mono">✦</span>
            </div>

            <div className="mt-8 z-10">
              <div
                className="text-white font-bold uppercase tracking-wider text-sm"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                DEPLOYMENT SPEED
              </div>
              <div className="text-white/45 text-xs font-mono mt-1">TIME-TO-MARKET IN DAYS</div>
            </div>
          </div>

          {/* Metric 3: 03x TRAFFIC */}
          <div
            ref={(el) => (cardRefs.current[3] = el)}
            onMouseMove={(e) => handleMouseMove(e, 3)}
            onMouseLeave={() => handleMouseLeave(3)}
            className="sm:col-span-2 sm:w-1/2 sm:ml-auto bg-[#0c0c0c] border border-white/10 p-8 flex flex-col justify-between transition-transform duration-200 ease-out relative min-h-[190px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex justify-between items-start">
              <div
                className="text-white font-mono font-bold leading-none"
                style={{ fontSize: 'clamp(44px, 4vw, 68px)', letterSpacing: '-0.03em' }}
              >
                0{counts.traffic}x
              </div>
              <span className="text-white/30 font-mono text-xs">{'><'}</span>
            </div>

            <div className="mt-6">
              <div
                className="text-white font-bold uppercase tracking-wider text-sm"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                QUALIFIED TRAFFIC
              </div>
              <div className="text-white/45 text-xs font-mono mt-1">REVENUE COMPOUNDING</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
