import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useSiteAnimations } from '@/hooks/useSiteAnimations';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/sections/Preloader';
import { Hero } from '@/components/sections/Hero';
import { DataImpact } from '@/components/sections/DataImpact';
import { StrategySystemsGrowth } from '@/components/sections/StrategySystemsGrowth';
import { WezonSystem } from '@/components/sections/WezonSystem';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { BuiltInZone } from '@/components/sections/BuiltInZone';
import { MetricsGrid } from '@/components/sections/MetricsGrid';
import { ClientSignals } from '@/components/sections/ClientSignals';
import { AboutStatement } from '@/components/sections/AboutStatement';

function App() {
  const [loading, setLoading] = useState(true);
  useSiteAnimations(!loading);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div
        className="w-full relative bg-black origin-top transition-transform duration-[0.9s] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: loading ? 'scale(0.95)' : 'scale(1)',
          pointerEvents: loading ? 'none' : 'auto',
          height: loading ? '100vh' : 'auto',
          overflow: loading ? 'hidden' : 'visible',
        }}
      >
        <main>
          <Hero />
          <DataImpact />
          <StrategySystemsGrowth />
          <WezonSystem />
          <WhatWeBuild />
          <BuiltInZone />
          <MetricsGrid />
          <ClientSignals />
          <AboutStatement />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
