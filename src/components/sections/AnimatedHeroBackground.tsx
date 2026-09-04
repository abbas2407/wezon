import React from 'react';

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
          width: 'min(66vmin, 680px)',
          height: 'min(66vmin, 680px)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
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
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        >
          <source src="/liquid-platinum.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};
