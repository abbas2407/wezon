import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    id: '01',
    name: 'LIVORA',
    desc: 'Luxury furniture retail transformed into a high-end digital spatial experience with real-time room configuration and instant checkout.',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '02',
    name: 'TAILORME',
    desc: 'Bespoke tailoring redefined with digital precision, 3D body scanning, and an autonomous inventory + client portal system.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '03',
    name: 'SEARCH INTERIORS',
    desc: 'A sophisticated marketplace bridging top-tier interior designers with clients, with immersive project catalogs and integrated messaging.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  },
];

// Top-right decorative quarter-arc
const CornerArc = () => (
  <svg
    aria-hidden
    width="220" height="220" viewBox="0 0 220 220"
    style={{ position: 'absolute', top: 0, right: 0, opacity: 0.35, pointerEvents: 'none' }}
  >
    <path d="M 220 220 A 200 200 0 0 0 20 20"
      fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
    <path d="M 220 220 A 150 150 0 0 0 70 70"
      fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
  </svg>
);

export function BuiltInZone() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const triggers: ScrollTrigger[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const next = cardRefs.current[i + 1];
      if (!next) return;

      const cover = card.querySelector<HTMLElement>('.biz-cover');
      const topOffset = 120 + i * 20;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: next,
          start: 'top bottom',
          end: `top top+=${topOffset}`,
          scrub: 0.6,
        },
      });
      tl.to(card, { scale: 0.96, ease: 'none' }, 0);
      if (cover) tl.to(cover, { opacity: 0.55, ease: 'none' }, 0);

      // @ts-ignore
      triggers.push(tl.scrollTrigger);
    });

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => {
      window.clearTimeout(t);
      triggers.forEach((s) => s.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        .biz-section {
          position: relative;
          background: #000;
          color: #fff;
          padding: clamp(60px, 8vw, 100px) clamp(24px, 4vw, 56px) clamp(80px, 10vw, 140px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          overflow: visible;
        }

        .biz-header { position: relative; margin-bottom: clamp(40px, 6vw, 72px); max-width: 720px; }
        .biz-title {
          font-family: 'Syne', 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: clamp(42px, 4.8vw, 72px);
          line-height: 1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #fff;
          margin: 0 0 14px;
        }
        .biz-eyebrow {
          display: flex; align-items: center; gap: 14px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.5);
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          max-width: 320px;
        }
        .biz-eyebrow .x { opacity: 0.5; }

        .biz-stack { display: flex; flex-direction: column; gap: 28px; }

        .biz-card {
          position: sticky;
          height: min(72vh, 620px);
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          transform-origin: center top;
          will-change: transform;
        }

        .biz-body {
          padding: clamp(28px, 4vw, 56px);
          display: flex; flex-direction: column; justify-content: space-between; gap: 20px;
        }
        .biz-case {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          color: #7CFF9C;
        }
        .biz-name {
          font-family: 'Syne', 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 3.8vw, 56px);
          line-height: 1.02;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #fff;
          margin: 12px 0 20px;
        }
        .biz-desc {
          margin: 0;
          color: rgba(255,255,255,0.65);
          font-size: 14px;
          line-height: 1.6;
          font-family: 'Space Grotesk', sans-serif;
          max-width: 380px;
        }
        .biz-link {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #fff;
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 10px;
          text-transform: uppercase;
        }
        .biz-media { position: relative; background: #111; overflow: hidden; }
        .biz-media img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.9);
        }
        .biz-cover {
          position: absolute; inset: 0;
          background: #000;
          opacity: 0;
          pointer-events: none;
          border-radius: 12px;
        }

        @media (max-width: 800px) {
          .biz-card { grid-template-columns: 1fr; height: auto; min-height: 520px; }
          .biz-media { min-height: 260px; }
        }
      `}</style>

      <section ref={sectionRef} id="work" className="biz-section">
        <div className="biz-header">
          <div className="biz-eyebrow">
            BUILT. TESTED. MOVED.
            <span className="x">✕</span>
          </div>
          <h2 className="biz-title" data-letter-fade>BUILT IN ZONE</h2>
          <CornerArc />
        </div>

        <div className="biz-stack">
          {cases.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="biz-card"
              style={{ top: `${120 + i * 20}px`, zIndex: i + 1 }}
            >
              <div className="biz-body">
                <div>
                  <div className="biz-case">CASE {c.id}</div>
                  <h3 className="biz-name">{c.name}</h3>
                  <p className="biz-desc" data-line-reveal>{c.desc}</p>
                </div>
                <a href="#contact" className="biz-link">
                  <span data-hover-stagger>EXPLORE CASE</span>
                  <span>→</span>
                </a>
              </div>
              <div className="biz-media">
                <img data-parallax="6" src={c.img} alt={c.name} />
              </div>
              <span className="biz-cover" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
