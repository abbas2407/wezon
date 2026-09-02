import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export function useCounter(target: number, duration: number = 2.5) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const updateCounter = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / (duration * 1000);

      if (elapsed < 1) {
        setCount(Math.floor(target * easeOut(elapsed)));
        animationFrame = requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, isInView]);

  return { count, ref };
}
