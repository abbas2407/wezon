import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const overrideUntilRef = useRef(0);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=150%',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.5,
      onUpdate: (self) => {
        if (Date.now() < overrideUntilRef.current) return;
        const idx = Math.min(
          buildItems.length - 1,
          Math.floor(self.progress * buildItems.length * 0.999)
        );
        setActiveIdx((prev) => (prev === idx ? prev : idx));
      },
    });

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => { window.clearTimeout(t); st.kill(); };
  }, []);

  const activate = (i: number) => {
    overrideUntilRef.current = Date.now() + 800;
    setActiveIdx(i);
  };

  return (
    <>
      <style>{`
        .wwb-row {
          position: relative;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 24px;
          padding: clamp(18px, 2.2vw, 28px) clamp(8px, 2vw, 24px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          opacity: 0.3;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwb-row.is-active {
          opacity: 1;
          background:
            linear-gradient(90deg,
              rgba(120,130,200,0.10) 0%,
              rgba(40,40,60,0.30) 45%,
              rgba(20,20,30,0) 100%);
        }
        .wwb-row.is-active::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: #fff;
        }

        .wwb-title-wrap {
          position: relative;
          display: inline-block;
          line-height: 1;
          overflow: hidden;
          padding: 0.08em 0;
        }
        .wwb-title-sans,
        .wwb-title-serif {
          display: block;
          font-size: clamp(30px, 5vw, 76px);
          line-height: 1;
          white-space: nowrap;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      color 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .wwb-title-sans {
          font-family: 'Syne', 'Space Grotesk', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.55);
          transform: translateY(0);
          opacity: 1;
        }
        .wwb-title-serif {
          position: absolute;
          left: 0; top: 0.08em;
          font-family: 'Instrument Serif', 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          text-transform: none;
          letter-spacing: -0.005em;
          color: #ffffff;
          transform: translateY(100%);
          opacity: 0;
        }
        .wwb-row.is-active .wwb-title-sans {
          transform: translateY(-100%);
          opacity: 0;
        }
        .wwb-row.is-active .wwb-title-serif {
          transform: translateY(0);
          opacity: 1;
        }

        .wwb-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          max-width: 460px;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transform: translateX(24px);
          transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwb-row.is-active .wwb-details {
          max-height: 300px;
          opacity: 1;
          transform: translateX(0);
        }

        .wwb-desc {
          margin: 0;
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          line-height: 1.55;
          text-align: right;
          font-family: 'Space Grotesk', sans-serif;
        }
        .wwb-pill-row { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
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
          background: rgba(255,255,255,0.14);
          color: #fff;
        }
        .wwb-num {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          opacity: 0.55;
          margin-right: 18px;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="build"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          background: '#000',
          color: '#fff',
          overflow: 'hidden',
          padding: 'clamp(48px, 6vw, 80px) clamp(24px, 4vw, 56px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Sticky header (pinned with section — always visible) */}
        <header style={{ flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12,
            fontSize: 12, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            FROM IDEA TO INFRASTRUCTURE
            <span style={{ opacity: 0.5 }}>✕</span>
          </div>
          <h2
            data-letter-fade
            style={{
              fontFamily: 'Syne, Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.6vw, 56px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: '0 0 24px 0',
            }}
          >
            WHAT WE BUILD
          </h2>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        </header>

        {/* Stable vertical list — rows never move */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div>
            {buildItems.map((item, i) => (
              <div
                key={item.id}
                className={`wwb-row${i === activeIdx ? ' is-active' : ''}`}
                onMouseEnter={() => activate(i)}
                onClick={() => activate(i)}
              >
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span className="wwb-num">{item.id}</span>
                  <span className="wwb-title-wrap">
                    <span className="wwb-title-sans">{item.title}</span>
                    <span className="wwb-title-serif" aria-hidden>{item.title}</span>
                  </span>
                </div>
                <div className="wwb-details">
                  <p className="wwb-desc">{item.desc}</p>
                  <div className="wwb-pill-row">
                    {item.tags.map((t) => (
                      <span key={t} className="wwb-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div style={{
          marginTop: 16, flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 12,
          color: 'rgba(255,255,255,0.5)', fontSize: 11,
          fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.2em',
        }}>
          <span>{String(activeIdx + 1).padStart(2, '0')} / {String(buildItems.length).padStart(2, '0')}</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${((activeIdx + 1) / buildItems.length) * 100}%`,
              background: '#fff',
              transition: 'width 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
          </div>
        </div>
      </section>
    </>
  );
}
