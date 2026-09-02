import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useMagnetic(options: { disabled?: boolean; max?: number } = {}) {
  const ref = useRef<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (options.disabled || window.innerWidth < 768) return;

    const element = ref.current;
    if (!element) return;

    const max = options.max ?? 25;
    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: Event) => {
      const { clientX, clientY } = e as MouseEvent;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      const boundedX = Math.max(-max, Math.min(max, x * 0.45));
      const boundedY = Math.max(-max, Math.min(max, y * 0.45));

      xTo(boundedX);
      yTo(boundedY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [options.disabled, options.max]);

  return ref;
}
