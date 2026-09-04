import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const rowRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const overrideUntilRef = useRef(0);

  // ── Pinned scroll stack ─────────────────────────────────────────
  useEffect(() => {
    if (!wrapperRef.current || !stickyRef.current) return;

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: `+=${buildItems.length * 100}%`,
      pin: stickyRef.current,
      scrub: 0.6,
      onUpdate: (self) => {
        if (Date.now() < overrideUntilRef.current) return;
        const idx = Math.min(
          buildItems.length - 1,
          Math.floor(self.progress * buildItems.length * 0.999)
        );
        setActiveIdx((prev) => (prev === idx ? prev : idx));
      },
    });

    return () => { st.kill(); };
  }, []);

  // ── Animate rows when active index changes ──────────────────────
  useEffect(() => {
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = i === activeIdx;
      gsap.to(el, {
        opacity: isActive ? 1 : 0.35,
        duration: 0.55,
        ease: 'power2.out',
      });
      const details = el.querySelector<HTMLElement>('[data-details]');
      const title   = el.querySelector<HTMLElement>('[data-row-title]');
      if (details) {
        gsap.to(details, {
          height: isActive ? 'auto' : 0,
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 12,
          duration: 0.55,
          ease: 'power2.out',
        });
      }
      if (title) {
        gsap.to(title, {
          color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    });
  }, [activeIdx]);

  const handleActivate = (idx: number) => {
    overrideUntilRef.current = Date.now() + 800;
    setActiveIdx(idx);
  };

  return (
    <>
      <style>{`
        .wwb-row {
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: background 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }
        .wwb-row[data-active="true"] {
          background:
            linear-gradient(90deg,
              rgba(90, 100, 160, 0.10) 0%,
              rgba(30, 30, 44, 0.35) 55%,
              rgba(20, 20, 30, 0.15) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .wwb-row[data-active="true"]::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: #ffffff;
        }
        .wwb-pill {
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.85);
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: lowercase;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }
        .wwb-pill:hover {
          transform: scale(1.05);
          background: rgba(255,255,255,0.12);
          color: #ffffff;
        }
      `}</style>

      <div
        ref={wrapperRef}
        id="build"
        style={{
          position: 'relative',
          width: '100%',
          background: '#000',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          ref={stickyRef}
          style={{
            width: '100%',
            minHeight: '100vh',
            padding: 'clamp(60px, 8vw, 100px) clamp(24px, 4vw, 56px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            color: '#fff',
          }}
        >
          <div
            className="flex items-center gap-4 mb-6"
            style={{ fontSize: 12, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}
          >
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>FROM IDEA TO INFRASTRUCTURE</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>✕</span>
          </div>

          <h2
            data-letter-fade
            style={{
              fontFamily: 'Orbitron, Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(36px, 4.5vw, 68px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: '0 0 32px 0',
            }}
          >
            WHAT WE BUILD
          </h2>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {buildItems.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => (rowRefs.current[i] = el)}
                className="wwb-row"
                data-active={i === activeIdx}
                onMouseEnter={() => handleActivate(i)}
                onClick={() => handleActivate(i)}
                style={{ opacity: i === activeIdx ? 1 : 0.35 }}
              >
                <div
                  style={{
                    padding: 'clamp(20px, 3vw, 32px) clamp(16px, 3vw, 40px)',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: 24,
                  }}
                >
                  <div
                    data-row-title
                    style={{
                      fontFamily: 'Orbitron, Space Grotesk, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(28px, 4.2vw, 58px)',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      lineHeight: 1,
                      color: i === activeIdx ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.42em',
                      opacity: 0.6,
                      marginRight: 12,
                      verticalAlign: 'middle',
                    }}>{item.id}</span>
                    {item.title}
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {item.tags.map((t) => (
                      <span key={t} className="wwb-pill">{t}</span>
                    ))}
                  </div>
                </div>

                <div
                  data-details
                  style={{
                    overflow: 'hidden',
                    height: i === activeIdx ? 'auto' : 0,
                    opacity: i === activeIdx ? 1 : 0,
                  }}
                >
                  <div style={{
                    padding: '0 clamp(16px, 3vw, 40px) clamp(24px, 3vw, 32px)',
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: 15,
                    lineHeight: 1.6,
                    maxWidth: 640,
                  }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
