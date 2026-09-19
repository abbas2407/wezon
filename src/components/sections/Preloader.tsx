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
    const duration = 2000;

    const animateProgress = (time: number) => {
      const elapsed = time - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setIsLoaded(true);
        setTimeout(onComplete, 800);
      }
    };

    requestAnimationFrame(animateProgress);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-[#f9f9f9] flex flex-col items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="font-display font-semibold text-[48px] sm:text-[64px] text-text inline-block leading-none mb-8">
        we<span className="text-accent-dark">.</span>zon
      </span>

      <div className="w-[160px] h-[2px] bg-text/10 relative overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-text rounded-full transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}
