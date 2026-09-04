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
  const sectionRef  = useRef<HTMLElement>(null);
  const stageRef    = useRef<HTMLDivElement>(null);   // scroll viewport
  const listRef     = useRef<HTMLDivElement>(null);   // translated list
  const rowRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const rowHeights  = useRef<number[]>([]);
  const stageHeight = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const overrideUntilRef = useRef(0);

  // ── Measure rows and stage height (recompute on resize / font load) ──
  const measure = () => {
    rowHeights.current = rowRefs.current.map((el) =>
      el ? el.getBoundingClientRect().height : 0
    );
    stageHeight.current = stageRef.current?.getBoundingClientRect().height || 0;
  };

  // ── Compute Y translation so the active row centres on the highlight ──
  const translateForIdx = (idx: number) => {
    const rowH = rowHeights.current[idx] || 100;
    // Sum heights of rows before the active one
    let offset = 0;
    for (let i = 0; i < idx; i++) offset += rowHeights.current[i] || 0;
    // Move so active row's centre lines up with stage centre
    const stageCentre = stageHeight.current / 2;
    return -(offset + rowH / 2 - stageCentre);
  };

  // ── Pin the section and drive active index by scroll progress ─────────
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    // Initial measurement after paint
    requestAnimationFrame(measure);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${(buildItems.length - 1) * 80 + 60}%`, // ≈ 300% for 4 rows
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.55,
      onUpdate: (self) => {
        if (Date.now() < overrideUntilRef.current) return;
        const idx = Math.min(
          buildItems.length - 1,
          Math.floor(self.progress * buildItems.length * 0.999)
        );
        setActiveIdx((prev) => (prev === idx ? prev : idx));
      },
    });

    const onResize = () => { measure(); ScrollTrigger.refresh(); };
    window.addEventListener('resize', onResize);
    const refreshT = window.setTimeout(() => { measure(); ScrollTrigger.refresh(); }, 250);

    return () => {
      window.removeEventListener('resize', onResize);
      window.clearTimeout(refreshT);
      st.kill();
    };
  }, []);

  // ── Animate rows when active index changes ────────────────────────────
  useEffect(() => {
    if (!listRef.current) return;

    gsap.to(listRef.current, {
      y: translateForIdx(activeIdx),
      duration: 0.85,
      ease: 'power3.out',
    });

    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = i === activeIdx;
      const title   = el.querySelector<HTMLElement>('[data-row-title]');
      const details = el.querySelector<HTMLElement>('[data-details]');
      const bar     = el.querySelector<HTMLElement>('[data-bar]');

      gsap.to(el, {
        opacity: isActive ? 1 : 0.3,
        duration: 0.55,
        ease: 'power2.out',
      });

      if (title) {
        gsap.to(title, {
          scaleX: isActive ? 1.15 : 1.0,
          color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
          fontWeight: isActive ? 900 : 500,
          letterSpacing: isActive ? '-0.03em' : '-0.01em',
          duration: 0.6,
          ease: 'power3.out',
          transformOrigin: 'left center',
        });
      }
      if (details) {
        gsap.to(details, {
          autoAlpha: isActive ? 1 : 0,
          x: isActive ? 0 : 24,
          duration: 0.55,
          ease: 'power2.out',
        });
      }
      if (bar) {
        gsap.to(bar, {
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
          duration: 0.6,
          ease: 'power2.out',
          transformOrigin: 'left center',
        });
      }
    });
  }, [activeIdx]);

  const activate = (i: number) => {
    overrideUntilRef.current = Date.now() + 800;
    setActiveIdx(i);
  };

  return (
    <>
      <style>{`
        .wwb-title {
          font-family: 'Syne', 'Space Grotesk', sans-serif;
          font-weight: 500;
          font-size: clamp(34px, 5.6vw, 84px);
          letter-spacing: -0.01em;
          line-height: 1;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          transform-origin: left center;
          white-space: nowrap;
          will-change: transform, color, font-weight;
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
          background: rgba(255,255,255,0.14);
          color: #fff;
        }
        .wwb-glow-bar {
          position: absolute;
          left: -6vw;
          right: -6vw;
          top: 0;
          bottom: 0;
          background:
            linear-gradient(90deg,
              rgba(120,130,200,0.10) 0%,
              rgba(40,40,60,0.30) 40%,
              rgba(20,20,30,0) 100%);
          pointer-events: none;
          transform: scaleX(0);
          opacity: 0;
        }
        .wwb-hilite {
          position: absolute;
          left: 0; right: 0;
          top: 50%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          pointer-events: none;
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
        {/* Sticky Header (stays visible during entire section pin) */}
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

        {/* Scrolling list stage */}
        <div
          ref={stageRef}
          style={{
            position: 'relative',
            flex: 1,
            overflow: 'hidden',
            marginTop: 8,
          }}
        >
          {/* Central highlight line marking the active zone */}
          <div className="wwb-hilite" />

          <div
            ref={listRef}
            style={{
              position: 'absolute',
              left: 0, right: 0, top: 0,
              willChange: 'transform',
            }}
          >
            {buildItems.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => (rowRefs.current[i] = el)}
                onMouseEnter={() => activate(i)}
                onClick={() => activate(i)}
                style={{
                  position: 'relative',
                  padding: 'clamp(22px, 2.6vw, 36px) clamp(8px, 2vw, 24px)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: 24,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  opacity: i === activeIdx ? 1 : 0.3,
                }}
              >
                <span data-bar className="wwb-glow-bar" />

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, position: 'relative' }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 12,
                    opacity: 0.55,
                  }}>{item.id}</span>
                  <span data-row-title className="wwb-title">{item.title}</span>
                </div>

                <div
                  data-details
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 12,
                    maxWidth: 460,
                    opacity: i === activeIdx ? 1 : 0,
                    visibility: i === activeIdx ? 'visible' : 'hidden',
                  }}
                >
                  <p style={{
                    margin: 0,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 14,
                    lineHeight: 1.55,
                    textAlign: 'right',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}>
                    {item.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
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
              transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }} />
          </div>
        </div>
      </section>
    </>
  );
}
