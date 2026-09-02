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
      {/* Full-bleed canvas; the shader fits the spiral inside its aspect */}
      <LiquidChrome />
    </div>
  );
};
