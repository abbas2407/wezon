import React from 'react';

// Spinning Circular Badge SVG with "GET IN TOUCH ✦ GET IN TOUCH ✦"
const RotatingBadge = () => (
  <div className="relative w-36 h-36 flex items-center justify-center group cursor-pointer">
    {/* Spinning Circular Text */}
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full animate-[spin_12s_linear_infinite] group-hover:animate-[spin_6s_linear_infinite]"
    >
      <defs>
        <path
          id="textCircle"
          d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
        />
      </defs>
      <text fill="white" fontSize="11" letterSpacing="0.28em" fontFamily="JetBrains Mono, monospace">
        <textPath href="#textCircle" startOffset="0%">
          GET IN TOUCH ✦ GET IN TOUCH ✦
        </textPath>
      </text>
    </svg>

    {/* Center Liquid Platinum Sphere / Diagonal Arrow Core */}
    <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#1a1a1a] via-[#ffffff] to-[#3a3a3a] p-[1.5px] shadow-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
        <span className="text-white text-xl transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↖
        </span>
      </div>
    </div>
  </div>
);

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-black text-white overflow-hidden"
      style={{
        padding: 'clamp(80px, 10vw, 160px) clamp(24px, 4vw, 56px) 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* ── TOP CTA BAR: LETS BRING YOUR BUSINESS DIGITAL ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20">
        <div>
          <h2
            className="text-white font-bold leading-[0.98] tracking-tight uppercase"
            style={{
              fontFamily: 'Orbitron, Space Grotesk, sans-serif',
              fontSize: 'clamp(38px, 5.5vw, 84px)',
            }}
          >
            LETS BRING YOUR<br />
            BUSINESS DIGITAL
          </h2>
        </div>

        {/* Right Action: Rotating Badge & Arrow ↖ */}
        <div className="flex items-center gap-8 self-start lg:self-center">
          <RotatingBadge />
          <a
            href="mailto:hello@wezon.agency"
            className="text-3xl text-white hover:text-white/70 transition-colors"
            aria-label="Contact Email"
          >
            ↖
          </a>
        </div>
      </div>

      {/* ── MIDDLE NAVIGATION & CONTACT BAR ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-b border-white/10 text-xs font-mono tracking-widest text-white/60">
        
        {/* Brand Col */}
        <div>
          <div className="text-white font-bold text-lg font-sans tracking-tight mb-3">
            we<span className="text-[0.62em] mx-1">✦</span>zon
          </div>
          <p className="text-white/40 font-sans text-xs leading-relaxed max-w-xs">
            Next-generation digital systems agency. Turning intelligence into compounding enterprise impact.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <span className="text-white/30 uppercase">[NAVIGATION]</span>
          <a href="#hero" className="hover:text-white transition-colors">01 HOME</a>
          <a href="#strategy" className="hover:text-white transition-colors">02 STRATEGY</a>
          <a href="#system" className="hover:text-white transition-colors">03 ARCHITECTURE</a>
          <a href="#build" className="hover:text-white transition-colors">04 WHAT WE BUILD</a>
        </div>

        {/* Solutions */}
        <div className="flex flex-col gap-3">
          <span className="text-white/30 uppercase">[CAPABILITIES]</span>
          <a href="#work" className="hover:text-white transition-colors">BUILT IN ZONE</a>
          <a href="#results" className="hover:text-white transition-colors">PERFORMANCE METRICS</a>
          <a href="#signals" className="hover:text-white transition-colors">CLIENT SIGNALS</a>
          <a href="#about" className="hover:text-white transition-colors">ABOUT THE AGENCY</a>
        </div>

        {/* Contact Email */}
        <div className="flex flex-col gap-3">
          <span className="text-white/30 uppercase">[CONNECT]</span>
          <a
            href="mailto:hello@wezon.agency"
            className="text-white hover:text-[#7CFF9C] transition-colors text-sm font-sans"
          >
            hello@wezon.agency
          </a>
          <a
            href="mailto:contact@wezon.com"
            className="text-white/70 hover:text-white transition-colors"
          >
            CONTACT@WEZON.COM
          </a>
          <span className="text-white/40 mt-2">HYDERABAD // GLOBAL</span>
        </div>

      </div>

      {/* ── GIANT BOTTOM WATERMARK "© - 2026" MATCHING REFERENCE IMAGE ── */}
      <div className="pt-16 pb-4 flex items-center justify-center select-none overflow-hidden">
        <div
          className="font-bold text-white/10 tracking-tighter uppercase whitespace-nowrap text-center leading-none"
          style={{
            fontFamily: 'Orbitron, Space Grotesk, sans-serif',
            fontSize: 'clamp(60px, 15vw, 220px)',
          }}
        >
          © - 2026
        </div>
      </div>
    </footer>
  );
}
