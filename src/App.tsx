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
      document.body.style.overflow = '';
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default App;
