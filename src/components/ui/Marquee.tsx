import React, { useRef } from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: string;
  direction?: 'left' | 'right';
  className?: string;
}

export function Marquee({ children, speed = '55s', direction = 'left', className = '' }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const style = {
    animationDuration: speed,
    animationDirection: direction === 'right' ? 'reverse' : 'normal',
  } as React.CSSProperties;

  return (
    <div className={`overflow-hidden flex flex-row w-full group ${className}`} ref={containerRef}>
      <div 
        className="flex shrink-0 whitespace-nowrap will-change-transform animate-[marquee_linear_infinite] group-hover:[animation-play-state:paused]"
        style={style}
      >
        {children}
      </div>
      <div 
        className="flex shrink-0 whitespace-nowrap will-change-transform animate-[marquee_linear_infinite] group-hover:[animation-play-state:paused]"
        style={style}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
