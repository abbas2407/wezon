import React from 'react';
import { DropletOverlay } from './DropletOverlay';

/**
 * Hero background: HTML5 <video> playing the cinematic 3D liquid platinum clip.
 *
 * - `mix-blend-mode: screen` merges any dark background of the video into the
 *   solid black hero surface, so the platinum edges never show a hard box.
 * - `pointer-events: none` on both wrapper and video keeps clicks/hover flowing
 *   through to the hero UI (nav, links, badges) on top.
 * - Sized identically to the previous 3D canvas so the surrounding circle
 *   overlays and typography stay pixel-aligned.
 */
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
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(78vmin, 820px)',
          height: 'min(78vmin, 820px)',
          pointerEvents: 'none',
          mixBlendMode: 'lighten',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            // Crush near-black pixels to pure black so mix-blend-mode: lighten
            // eliminates the visible dark box around the platinum.
            filter: 'brightness(1.15) contrast(1.55)',
          }}
        >
          <source src="/liquid-platinum.webm" type="video/webm" />
        </video>
      </div>

      {/* Cursor-reactive droplets around the ring */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <DropletOverlay />
      </div>
    </div>
  );
};
