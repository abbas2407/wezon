import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    name: 'LIVORA SPATIAL',
    category: 'E-COMMERCE / SPATIAL 3D',
    desc: 'Luxury furniture retail transformed into a zero-latency interactive spatial 3D experience with real-time room configuration.',
    stats: '+142% AOV · 60fps WebGL',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '02',
    name: 'TAILORME',
    category: 'INTELLIGENT FASHION ERP',
    desc: 'Bespoke tailoring with computerized 3D measurement mapping, autonomous inventory pipelines, and global client portals.',
    stats: '84% lead-time cut · Enterprise ERP',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '03',
    name: 'INTERIA STUDIO',
    category: 'INTERIOR DESIGN PORTAL',
    desc: 'Interior design catalog with immersive project pages, client portal, and AI-driven mood-board generator.',
    stats: '3.2× consultation conversion',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '04',
    name: 'FLUX OPERATIONS',
    category: 'REAL-TIME OPS DASHBOARD',
    desc: 'Real-time operations dashboard aggregating supply-chain, revenue, and support signals into one command surface.',
    stats: '5× faster decision loop',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
];

export function BuiltInZone() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const scrollLen = () => track.scrollWidth - window.innerWidth;

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      pin: true,
      pinSpacing: true,
      start: 'top top',
      end: () => `+=${scrollLen()}`,
      scrub: 1,
      invalidateOnRefresh: true,
      animation: gsap.to(track, {
        x: () => -scrollLen(),
        ease: 'none',
      }),
    });

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { window.clearTimeout(t); st.kill(); };
  }, []);

  return (
    <>
      <style>{`
        .biz-header {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: clamp(28px, 4vw, 56px) clamp(24px, 4vw, 56px) 0;
          display: flex; justify-content: space-between; align-items: baseline;
          z-index: 5;
          pointer-events: none;
        }
        .biz-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.5);
        }
        .biz-title {
          font-family: 'Syne', 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 4vw, 64px);
          line-height: 1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #fff;
          margin: 0;
        }

        .biz-track {
          display: flex;
          align-items: center;
          height: 100vh;
          padding: 0 8vw;
          gap: 5vw;
          will-change: transform;
        }
        .biz-card {
          flex: 0 0 auto;
          width: min(72vw, 780px);
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          transition: border-color 0.3s ease, transform 0.35s ease;
        }
        .biz-card:hover { border-color: rgba(255,255,255,0.22); }
        .biz-card-media {
          position: relative;
          background: #111;
          overflow: hidden;
        }
        .biz-card-media img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.85);
          transition: transform 0.6s ease;
        }
        .biz-card:hover .biz-card-media img { transform: scale(1.06); }
        .biz-card-body {
          padding: clamp(24px, 3vw, 40px);
          display: flex; flex-direction: column; justify-content: space-between;
          gap: 24px;
        }
        .biz-card-cat {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #7CFF9C;
        }
        .biz-card-name {
          font-family: 'Syne', 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: clamp(24px, 2.6vw, 40px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #fff;
          margin: 8px 0 12px;
        }
        .biz-card-desc {
          color: rgba(255,255,255,0.65);
          font-size: 14px;
          line-height: 1.6;
          font-family: 'Space Grotesk', sans-serif;
        }
        .biz-card-stats {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.05em;
        }
        .biz-card-link {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #fff;
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 8px;
        }
      `}</style>

      <div
        id="work"
        ref={wrapperRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          background: '#000',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="biz-header">
          <span className="biz-eyebrow">BUILT · TESTED · MOVED</span>
          <h2 className="biz-title" data-letter-fade>BUILT IN ZONE</h2>
        </div>

        <div className="biz-track" ref={trackRef}>
          {projects.map((p) => (
            <article className="biz-card" key={p.id} data-hover-scale>
              <div className="biz-card-media">
                <img data-parallax="6" src={p.img} alt={p.name} />
              </div>
              <div className="biz-card-body">
                <div>
                  <div className="biz-card-cat">CASE {p.id} · {p.category}</div>
                  <h3 className="biz-card-name">{p.name}</h3>
                  <p className="biz-card-desc" data-line-reveal>{p.desc}</p>
                </div>
                <div>
                  <div className="biz-card-stats">METRIC · {p.stats}</div>
                  <a href="#contact" className="biz-card-link">
                    <span data-hover-stagger>EXPLORE CASE</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
