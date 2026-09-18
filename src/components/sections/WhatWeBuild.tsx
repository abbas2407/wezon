import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const GlyphH = () => (
  <svg className="w-[34px] h-[17px] text-[#C4C4C8] opacity-80" fill="currentColor" viewBox="0 0 38 19">
    <rect x="0" y="0" width="6" height="5" />
    <rect x="0" y="14" width="6" height="5" />
    <rect x="6" y="7" width="6" height="5" />
    <rect x="12" y="1" width="14" height="5" />
    <rect x="12" y="13" width="14" height="5" />
    <rect x="26" y="7" width="6" height="5" />
    <rect x="32" y="0" width="6" height="5" />
    <rect x="32" y="14" width="6" height="5" />
  </svg>
);

const buildItems = [
  {
    id: '01',
    title: 'DIGITAL EXPERIENCES',
    tags: 'Websites · Landing Pages · UI/UX · Product Design',
  },
  {
    id: '02',
    title: 'BUSINESS SYSTEMS',
    tags: 'Custom ERP · CRM Suites · Dashboards · Internal Tooling',
  },
  {
    id: '03',
    title: 'AUTOMATION',
    tags: 'AI Agents · Workflow Orchestration · Data Pipelines',
  },
  {
    id: '04',
    title: 'PERFORMANCE',
    tags: 'SEO Infrastructure · CRO · Cloud Scale · Speed Audits',
  },
];

export function WhatWeBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelines = useRef<gsap.core.Timeline[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const overrideUntilRef = useRef(0);

  useLayoutEffect(() => {
    const splits: SplitType[] = [];

    rowRefs.current.forEach((row) => {
      if (!row) return;
      const sans = row.querySelector<HTMLElement>('.wwb-title-sans');
      const serif = row.querySelector<HTMLElement>('.wwb-title-serif');
      if (!sans || !serif) return;

      const sSans = new SplitType(sans, { types: 'chars', tagName: 'span' });
      const sSerif = new SplitType(serif, { types: 'chars', tagName: 'span' });
      splits.push(sSans, sSerif);

      [sSans, sSerif].forEach((s) => {
        (s.chars || []).forEach((c) => {
          (c as HTMLElement).style.display = 'inline-block';
          (c as HTMLElement).style.willChange = 'transform, opacity';
        });
      });
      gsap.set(sSerif.chars, { yPercent: 100, opacity: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      tl.to(sSans.chars, {
        yPercent: -110,
        opacity: 0,
        duration: 0.35,
        stagger: 0.022,
      }, 0);
      tl.to(sSerif.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.022,
      }, 0.02);

      timelines.current.push(tl);
    });

    return () => {
      timelines.current.forEach((tl) => tl.kill());
      timelines.current = [];
      splits.forEach((s) => s.revert());
    };
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=250%',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.5,
      onUpdate: (self) => {
        if (Date.now() < overrideUntilRef.current) return;
        const idx = Math.min(
          buildItems.length - 1,
          Math.floor(self.progress * buildItems.length * 0.999),
        );
        setActiveIdx((prev) => (prev === idx ? prev : idx));
      },
    });

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { window.clearTimeout(t); st.kill(); };
  }, []);

  useEffect(() => {
    timelines.current.forEach((tl, i) => {
      if (i === activeIdx) tl.play();
      else tl.reverse();
    });
  }, [activeIdx]);

  const activate = (i: number) => {
    overrideUntilRef.current = Date.now() + 800;
    setActiveIdx(i);
  };

  return (
    <>
      <style>{`
        .wwb-row {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: clamp(20px, 2.4vw, 32px) clamp(12px, 2vw, 28px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          opacity: 0.3;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwb-row.is-active {
          opacity: 1;
        }
        .wwb-row .wwb-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(90deg,
            rgba(19,19,21,1) 0%,
            rgba(255,255,255,0.06) 30%,
            rgba(255,255,255,0.06) 70%,
            rgba(17,17,19,1) 100%);
          filter: blur(4px);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwb-row.is-active .wwb-gradient {
          opacity: 1;
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
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(28px, 4.5vw, 60px);
          font-weight: 500;
          line-height: 1;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }
        .wwb-title-sans {
          color: rgba(251,251,251,0.85);
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
        }

        .wwb-tags {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          white-space: nowrap;
          letter-spacing: 0.02em;
          overflow: hidden;
          max-width: 0;
          opacity: 0;
          transition: max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwb-row.is-active .wwb-tags {
          max-width: 600px;
          opacity: 1;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="build"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          background: '#08080a',
          color: '#fff',
          overflow: 'hidden',
          padding: 'clamp(48px, 6vw, 80px) clamp(24px, 4vw, 56px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <header style={{ flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12,
          }}>
            <span style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 400,
              fontSize: 11,
              letterSpacing: '0.2em',
              color: 'rgba(251,251,251,0.42)',
              textTransform: 'uppercase',
            }}>
              From idea to infrastructure
            </span>
            <GlyphH />
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(24px, 3.2vw, 42px)',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: 'rgba(251,251,251,1)',
            margin: '0 0 24px 0',
          }}>
            WHAT WE BUILD
          </h2>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        </header>

        {/* Rows */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div>
            {buildItems.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => (rowRefs.current[i] = el)}
                className={`wwb-row${i === activeIdx ? ' is-active' : ''}`}
                onMouseEnter={() => activate(i)}
                onClick={() => activate(i)}
              >
                <div className="wwb-gradient" />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'baseline' }}>
                  <span className="wwb-title-wrap">
                    <span className="wwb-title-sans">{item.title}</span>
                    <span className="wwb-title-serif" aria-hidden>{item.title}</span>
                  </span>
                </div>
                <span className="wwb-tags" style={{ position: 'relative', zIndex: 1 }}>{item.tags}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          marginTop: 16, flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 12,
          color: 'rgba(255,255,255,0.4)', fontSize: 11,
          fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.15em',
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
