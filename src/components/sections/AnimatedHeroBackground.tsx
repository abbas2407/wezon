import React from 'react';
import { LiquidChrome } from './LiquidChrome';

export const AnimatedHeroBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#000000',
      }}
    >
      {/* Centered liquid-chrome object roughly occupying middle of viewport */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(58vmin, 720px)',
          height: 'min(58vmin, 720px)',
        }}
      >
        <LiquidChrome />
      </div>
    </div>
  );
};
