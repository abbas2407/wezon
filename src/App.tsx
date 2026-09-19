import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from '@/components/sections/Preloader';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Portfolio } from '@/components/sections/Portfolio';
import { Footer } from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      ScrollTrigger.refresh();
    }
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div
        className="w-full relative bg-bg origin-top transition-transform duration-[0.9s] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: loading ? 'scale(0.98)' : 'scale(1)',
          pointerEvents: loading ? 'none' : 'auto',
          height: loading ? '100vh' : 'auto',
          overflow: loading ? 'hidden' : 'visible',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Process />
          <Portfolio />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
