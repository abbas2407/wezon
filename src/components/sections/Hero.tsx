import React, { useRef } from 'react';
import { AnimatedHeroBackground } from './AnimatedHeroBackground';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '680px',
        background: '#000000',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <AnimatedHeroBackground />
      </div>
    </section>
  );
}
