import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let start = performance.now();
    const duration = 2200; // 2.2s

    const animateProgress = (time: number) => {
      const elapsed = time - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setIsLoaded(true);
        setTimeout(onComplete, 900); // Wait for split animation
      }
    };

    requestAnimationFrame(animateProgress);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100000] pointer-events-none flex flex-col">
      {/* Top Half */}
      <motion.div
        className="flex-1 bg-black w-full origin-top"
        initial={{ y: '0%' }}
        animate={{ y: isLoaded ? '-100%' : '0%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Bottom Half */}
      <motion.div
        className="flex-1 bg-black w-full origin-bottom"
        initial={{ y: '0%' }}
        animate={{ y: isLoaded ? '100%' : '0%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Center Content Overlay */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-sora font-extrabold text-[64px] text-white inline-block leading-none mb-8">
          <span className="logo-we">we</span>
          <span className="logo-sparkle">✦</span>
          <span className="logo-zon">zon</span>
        </span>
        
        <div className="w-[200px] h-[2px] bg-white/20 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
}
