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
      {/* Centered canvas constrained vertically so the chrome sits between
          the top logo row and the bottom "WE BUILD / THE ZONE / AROUND IT." row */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(62vmin, 640px)',
          height: 'min(62vmin, 640px)',
        }}
      >
        <LiquidChrome />
      </div>
    </div>
  );
};
