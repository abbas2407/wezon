import { useEffect, useRef } from 'react';

export function useTilt(options = { disabled: false }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (options.disabled || window.innerWidth < 768) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      // Max ±8deg
      const tiltX = (y - 0.5) * -16; 
      const tiltY = (x - 0.5) * 16;

      element.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
      element.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    const handleMouseEnter = () => {
      element.style.transition = 'none';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [options.disabled]);

  return ref;
}
