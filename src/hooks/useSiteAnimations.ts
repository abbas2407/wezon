import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

/**
 * Registers a set of scroll- and hover-triggered animations ported from
 * tanmaykashyap.com and adapted to wezon:
 *
 *  data-letter-fade   → char-stagger fade-in on scroll (headlines)
 *  data-line-reveal   → line-mask width→0% reveal on scrub (paragraphs)
 *  data-hero-scroll   → chars translate up on Hero exit (big hero rows)
 *  data-hover-stagger → letter swap on hover (links / CTAs)
 *  data-parallax      → yPercent translation on scroll (images)
 *  data-fill-hover    → left→right underline fill on hover (rows)
 *  .clock-ist         → live IST time in HH:MM
 */
export function useSiteAnimations(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Give the DOM a tick to settle (fonts, layout) — matches source site.
    const setupTimer = window.setTimeout(() => setup(), 200);

    const cleanups: Array<() => void> = [];

    function setup() {
      // ── 1. Letter fade-in on scroll ─────────────────────────────────
      const letterEls = document.querySelectorAll<HTMLElement>('[data-letter-fade]');
      const letterSplits: SplitType[] = [];
      letterEls.forEach((el) => {
        const split = new SplitType(el, { types: 'chars', tagName: 'span' });
        letterSplits.push(split);
        gsap.from(split.chars, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.out',
          stagger: { each: 0.05, from: 'start' },
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'top 80%',
            toggleActions: 'none play none reverse',
          },
        });
      });

      // ── 2. Line-mask reveal (scrub) ─────────────────────────────────
      const lineEls = document.querySelectorAll<HTMLElement>('[data-line-reveal]');
      const lineSplits: SplitType[] = [];
      lineEls.forEach((el) => {
        const split = new SplitType(el, { types: 'lines', tagName: 'span' });
        lineSplits.push(split);
        (split.lines || []).forEach((line) => {
          const mask = document.createElement('span');
          mask.className = 'line-mask';
          mask.style.cssText =
            'position:absolute;inset:0;background:currentColor;opacity:1;pointer-events:none;';
          line.style.position = 'relative';
          line.style.display = 'inline-block';
          line.appendChild(mask);
          gsap.to(mask, {
            width: '0%',
            duration: 1,
            scrollTrigger: {
              trigger: line,
              start: 'bottom 85%',
              end: 'bottom 45%',
              scrub: 1,
            },
          });
        });
      });

      // ── 3. Hero rows scroll-up ──────────────────────────────────────
      const heroScrollEls = document.querySelectorAll<HTMLElement>('[data-hero-scroll]');
      const heroTrigger = document.querySelector('[data-hero-trigger]') || document.body;
      const heroSplits: SplitType[] = [];
      heroScrollEls.forEach((el, i) => {
        const split = new SplitType(el, { types: 'chars', tagName: 'span' });
        heroSplits.push(split);
        gsap.to(split.chars, {
          y: '-120%',
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: heroTrigger as Element,
            start: `${3 + i * 3}% top`,
            end: `${18 + i * 3}% top`,
            scrub: 1.5,
          },
        });
      });

      // ── 4. Hover-stagger letter swap ────────────────────────────────
      const hoverEls = document.querySelectorAll<HTMLElement>('[data-hover-stagger]');
      const hoverSplits: SplitType[] = [];
      hoverEls.forEach((el) => {
        const orig = el.textContent || '';
        el.innerHTML = `
          <span class="hs-wrap" style="position:relative;display:inline-block;overflow:hidden;line-height:1.15;">
            <span class="hs-a" style="display:inline-block;">${orig}</span>
            <span class="hs-b" style="display:inline-block;position:absolute;left:0;top:0;">${orig}</span>
          </span>
        `;
        const a = el.querySelector('.hs-a') as HTMLElement;
        const b = el.querySelector('.hs-b') as HTMLElement;
        const sa = new SplitType(a, { types: 'chars', tagName: 'span' });
        const sb = new SplitType(b, { types: 'chars', tagName: 'span' });
        hoverSplits.push(sa, sb);
        gsap.set(sb.chars, { yPercent: 100 });

        const tl = gsap.timeline({ paused: true, defaults: { duration: 0.35, ease: 'power2.out' } });
        tl.to(sa.chars, { yPercent: -110, stagger: { amount: 0.2 } }, 0);
        tl.to(sb.chars, { yPercent: 0, stagger: { amount: 0.2 } }, 0);

        const enter = () => tl.play();
        const leave = () => tl.reverse();
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          el.removeEventListener('mouseenter', enter);
          el.removeEventListener('mouseleave', leave);
        });
      });

      // ── 5. Parallax on scroll ───────────────────────────────────────
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || '10');
        gsap.from(el, {
          yPercent: amt,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      });

      // ── 6. Row-fill hover (underline expand) ────────────────────────
      document.querySelectorAll<HTMLElement>('[data-fill-hover]').forEach((el) => {
        const fill = document.createElement('span');
        fill.style.cssText =
          'position:absolute;left:0;bottom:0;width:0%;height:1px;background:#fff;transition:width 0.5s cubic-bezier(0.76,0,0.24,1);pointer-events:none;';
        const cs = window.getComputedStyle(el);
        if (cs.position === 'static') el.style.position = 'relative';
        el.appendChild(fill);
        const enter = () => (fill.style.width = '100%');
        const leave = () => (fill.style.width = '0%');
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          el.removeEventListener('mouseenter', enter);
          el.removeEventListener('mouseleave', leave);
        });
      });

      // ── 7. Live IST clock (HH:MM) ───────────────────────────────────
      const clock = document.querySelector<HTMLElement>('.clock-ist');
      let clockInterval: number | undefined;
      if (clock) {
        const tick = () => {
          clock.textContent = new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          });
        };
        tick();
        clockInterval = window.setInterval(tick, 15000);
        cleanups.push(() => clockInterval && window.clearInterval(clockInterval));
      }

      // Return revert cleanups for splits
      cleanups.push(() => {
        letterSplits.forEach((s) => s.revert());
        lineSplits.forEach((s) => s.revert());
        heroSplits.forEach((s) => s.revert());
        hoverSplits.forEach((s) => s.revert());
        ScrollTrigger.getAll().forEach((st) => st.kill());
      });
    }

    return () => {
      window.clearTimeout(setupTimer);
      cleanups.forEach((fn) => fn());
    };
  }, [enabled]);
}
