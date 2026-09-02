import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/sections/Preloader';
import { Hero } from '@/components/sections/Hero';
import { StrategySystemsGrowth } from '@/components/sections/StrategySystemsGrowth';
import { WezonSystem } from '@/components/sections/WezonSystem';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { BuiltInZone } from '@/components/sections/BuiltInZone';

function App() {
  const [loading, setLoading] = useState(true);

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
      <CustomCursor />

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
          <StrategySystemsGrowth />
          <WezonSystem />
          <WhatWeBuild />
          <BuiltInZone />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
