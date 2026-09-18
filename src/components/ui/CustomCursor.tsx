import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'image' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      let state: typeof cursorState = 'default';

      if (target.closest('[data-cursor="hover"]') || target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a') {
        state = 'hover';
      } else if (target.closest('[data-cursor="image"]')) {
        state = 'image';
      } else if (target.closest('[data-cursor="text"]') || target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea') {
        state = 'text';
      }

      setCursorState(state);
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile) return null;

  const variants = {
    default: { scale: 1, backgroundColor: 'rgba(255,255,255,0)' },
    hover: { scale: 52 / 36, backgroundColor: 'rgba(255,255,255,0.1)' },
    image: { scale: 80 / 36, backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,1)' },
    text: { scaleX: 3, scaleY: 0.1, backgroundColor: 'rgba(255,255,255,1)', borderRadius: '0px' },
  };

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-[36px] h-[36px] rounded-full pointer-events-none z-[9999] border-[1.5px] border-white mix-blend-difference flex items-center justify-center overflow-hidden"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        variants={variants}
        animate={cursorState}
        transition={{ duration: 0.2 }}
      >
        {cursorState === 'image' && (
          <span className="font-sora text-[8px] font-bold tracking-widest text-white mix-blend-normal absolute" style={{ transform: 'scale(0.45)' }}>VIEW</span>
        )}
      </motion.div>
    </>
  );
}
