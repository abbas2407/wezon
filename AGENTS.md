# We.zon — Premium Digital Agency Website

## Stack (strict — never deviate)
- Framework: React 18 + TypeScript
- Build: Vite 5
- Styling: TailwindCSS v3 + globals.css
- 3D: Three.js + @react-three/fiber + @react-three/drei
- Scroll Animation: GSAP 3 + ScrollTrigger + SplitType
- UI Animation: Framer Motion
- Smooth Scroll: Lenis
- Carousel: Embla Carousel React
- Icons: Lucide React
- Utilities: clsx + tailwind-merge

## Architecture Rules
- Single Page App — NO routing, anchor-scroll only
- Lenis for all scroll — never native scroll
- GSAP animations via data-attributes only — NOT inline JSX
- All heavy GSAP hooks fire AFTER preloader completes
- Three.js via @react-three/fiber — declarative only
- Custom GLSL shaders — no off-the-shelf noise libraries

## Design System (never deviate)
- Background: #000000 only
- Text: #ffffff with opacity variants
- Accent: #7CFF9C (green — badges, hover only)
- Borders: rgba(255,255,255,0.08–0.15)
- Cards: #0b0b0b / #0c0c0c
- Fonts: Syne (body), Orbitron (hero/display), Space Grotesk (logo/badges), JetBrains Mono (watermark)
- Brand glyph: ✦ used consistently throughout
- Dark mode ONLY — no light mode

## Animation Rules
- data-letter-fade — character stagger fade-in
- data-line-reveal — mask wipe reveal
- data-hero-scroll — hero exit animation
- data-hover-stagger — dual-layer letter swap
- data-parallax — Y parallax on scroll
- data-fill-hover — underline fill left to right
- data-reveal — Y+60 to Y+0 fade-up
- data-hover-scale — GSAP scale 1.03

## Component Rules
- Hooks: useSiteAnimations, useCounter, useMagnetic, useScramble, useTilt
- NO new animation libraries — GSAP + Framer Motion only
- Unused components: About, FAQ, Services, SelectedWork, WhyUs, ProjectCTA — do NOT delete
- Path alias: @/ maps to src/

## Active Sections (App.tsx order)
1. Hero
2. StrategySystemsGrowth
3. WezonSystem
4. WhatWeBuild
5. BuiltInZone
6. MetricsGrid
7. ClientSignals
8. AboutStatement
9. Footer

## Code Review Checklist
1. No new scroll library — Lenis only
2. GSAP animations via data-attributes — not inline
3. Design tokens match exactly (#000, #7CFF9C, fonts)
4. No client-side routing added
5. Three.js inside @react-three/fiber only
6. No new animation libraries
7. GLSL shaders — custom only, no noise libraries
8. Preloader gate respected — animations after load
9. TypeScript strict — no any
10. Mobile: hamburger → Framer Motion drawer only

## Active Skills
- @engineering-frontend-developer — React + Vite + TypeScript
- @engineering-rapid-prototyper — new sections/components
- @engineering-software-architect — component structure
- @engineering-code-reviewer — quality, consistency
- @engineering-technical-writer — docs, comments
