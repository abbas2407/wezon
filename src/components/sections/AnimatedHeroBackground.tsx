import React from 'react';
import { Hero3DCanvas } from './Hero3DCanvas';

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
      {/* Centered canvas constrained vertically so the liquid platinum sits between
          the top logo row and the bottom "WE BUILD / THE ZONE / AROUND IT." row */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(66vmin, 680px)',
          height: 'min(66vmin, 680px)',
          pointerEvents: 'auto',
        }}
      >
        <Hero3DCanvas />
      </div>
    </div>
  );
};

