import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Preloader } from '@/components/sections/Preloader';
import { Hero } from '@/components/sections/Hero';
import { DataImpact } from '@/components/sections/DataImpact';
import { WezonSystem } from '@/components/sections/WezonSystem';
import { useSiteAnimations } from '@/hooks/useSiteAnimations';

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
          <WezonSystem />
        </main>
      </div>
    </>
  );
}

export default App;
