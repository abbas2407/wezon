import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Strategy & Consulting',
    desc: 'Business objectives, market positioning, audience research and digital roadmap — a clear direction before a single pixel is placed.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 4v24M4 16h24" />
        <path d="M7 7l18 18M25 7L7 25" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'UX/UI Design',
    desc: 'Interfaces that feel right — grounded in product logic and technical constraints. User journeys, prototypes and visual systems.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8h24v18H4z" />
        <path d="M4 8l12 10L28 8" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Product Development',
    desc: 'Full-cycle web, mobile, and application builds — ready to ship, scale, and evolve. Modern architecture, clean code.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="26" height="20" rx="2" />
        <path d="M3 25h26" />
        <rect x="12" y="25" width="8" height="3" rx="1" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Integrations & Automation',
    desc: 'API systems, automation layers, workflow orchestration, data pipelines and intelligent integrations across your stack.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="10" height="10" rx="1" />
        <rect x="18" y="4" width="10" height="10" rx="1" />
        <rect x="4" y="18" width="10" height="10" rx="1" />
        <rect x="18" y="18" width="10" height="10" rx="1" />
        <path d="M14 9h4M9 14v4M23 14v4M14 23h4" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Growth & Performance',
    desc: 'Performance marketing, acquisition funnels, SEO infrastructure, CRO and analytics. Results that compound.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 10v6l4 4" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Custom Solutions',
    desc: 'ERP systems, CRM suites, internal tooling and bespoke platforms — engineered for your exact workflow.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4l-2 6H4l5 4-2 6 5-4 5 4-2-6 5-4h-6z" />
      </svg>
    ),
    accent: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Services() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => {
      if (document.body.scrollHeight > window.innerHeight * 1.5) {
        setReady(true);
      } else {
        setTimeout(check, 200);
      }
    };
    check();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const pinContainer = pinRef.current;
    if (!pinContainer) return;

    const cards = gsap.utils.toArray<HTMLElement>('.service-card', pinContainer);
    const n = cards.length;
    if (n === 0) return;

    const cardH = cards[0].offsetHeight;
    const gap = 12;
    const headerH = 52;
    const totalScrollDist = n * 380;

    const ctx = gsap.context(() => {
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          start: 'top top+=72',
          end: `+=${totalScrollDist}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i >= n - 1) return;

        const targetY = -(card.offsetTop - (i * headerH));

        masterTL.to(
          card,
          {
            y: targetY,
            scale: 1 - (n - 1 - i) * 0.02,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            duration: 1,
            ease: 'none',
          },
          i * 0.7
        );
      });

      const lastCard = cards[n - 1];
      const lastTargetY = -(lastCard.offsetTop - ((n - 1) * headerH));
      masterTL.to(
        lastCard,
        {
          y: lastTargetY,
          duration: 1,
          ease: 'none',
        },
        (n - 2) * 0.7
      );
    }, pinContainer);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="services" className="w-full bg-bg">
      <motion.div
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 lg:pt-40 pb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="flex items-center gap-3 mb-4" custom={0} variants={fadeUp}>
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-body text-[13px] text-text-secondary uppercase tracking-[0.15em]">
            What we do
          </span>
        </motion.div>
        <motion.h2
          className="font-display text-text max-w-[600px]"
          custom={1}
          variants={fadeUp}
        >
          End-to-end capabilities for digital{' '}
          <span className="font-serif italic">excellence</span>
        </motion.h2>
      </motion.div>

      <div ref={pinRef} className="bg-bg pb-16">
        <div className="max-w-[900px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col gap-3">
          {services.map((service) => (
            <div
              key={service.num}
              className={`service-card rounded-2xl border will-change-transform ${
                service.accent
                  ? 'bg-accent border-accent/40 shadow-[0_4px_24px_rgba(241,255,102,0.2)]'
                  : 'bg-card-bg border-text/[0.06] shadow-[0_1px_6px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div className="flex items-start gap-5 sm:gap-7 p-6 sm:p-8 lg:p-9">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    service.accent
                      ? 'bg-text/10 text-text'
                      : 'bg-text/[0.03] text-text/50'
                  }`}
                >
                  {service.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-[20px] sm:text-[24px] lg:text-[26px] leading-tight mb-2 text-text">
                    {service.title}
                  </h3>
                  <p
                    className={`font-body text-[13px] sm:text-[14px] leading-[1.7] max-w-[520px] ${
                      service.accent ? 'text-text/70' : 'text-text-secondary'
                    }`}
                  >
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
