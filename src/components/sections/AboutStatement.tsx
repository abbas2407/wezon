import React from 'react';

export function AboutStatement() {
  return (
    <section
      id="about"
      className="relative bg-black text-white overflow-hidden"
      style={{
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 4vw, 56px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-14 overflow-hidden rounded-md flex flex-col lg:flex-row justify-between items-stretch gap-12"
        style={{
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* ── LEFT CONTENT ── */}
        <div className="flex-1 max-w-2xl flex flex-col justify-between z-10">
          <div>
            {/* Top Category Tag */}
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-white/50 mb-8">
              <span>ABOUT</span>
              <span className="text-white/30">✕</span>
            </div>

            {/* Main Headline */}
            <h2
              className="text-white font-bold leading-[1.04] tracking-tight uppercase mb-8"
              style={{
                fontFamily: 'Orbitron, Space Grotesk, sans-serif',
                fontSize: 'clamp(28px, 3.8vw, 54px)',
              }}
            >
              WE DON’T BUILD FOR<br />
              THE SAKE OF BUILDING.
            </h2>

            {/* Manifesto Paragraph */}
            <div className="text-white/65 text-[15px] md:text-[17px] leading-relaxed font-sans space-y-4 max-w-xl">
              <p>
                We're the partners ambitious brands call when ordinary won't build monumental results.
              </p>
              <p>
                Strategy gives us direction. Tech gives us leverage. At we✦zon, we operate in the 'Zone' where data meets creative culture.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-white hover:text-white/80 transition-colors uppercase border-b border-white pb-1"
            >
              <span>LEARN MORE</span>
              <span className="text-sm">→</span>
            </a>
          </div>
        </div>

        {/* ── RIGHT: GIANT VERTICAL TYPOGRAPHY "we✦zon" MATCHING REFERENCE IMAGE ── */}
        <div className="hidden lg:flex items-center justify-center relative select-none pl-8 border-l border-white/10">
          <div
            className="text-white font-bold tracking-tight uppercase whitespace-nowrap"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(80px, 9vw, 140px)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              opacity: 0.9,
            }}
          >
            we<span className="text-[#ffffff] text-[0.65em] inline-block my-2">✦</span>zon
          </div>
        </div>

        {/* Bottom Corner Glyph */}
        <div className="absolute bottom-6 right-6 text-white/30 font-mono text-xs z-10">
          {'><'}
        </div>
      </div>
    </section>
  );
}
