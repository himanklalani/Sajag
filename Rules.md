# Project: Sajag Infrastructure (sajag.)

## Project Overview
**What it is**: A premium, high-performance real estate advocacy business for property buyers.
**For Whom**: Individuals and families navigating the complex real estate markets of Mumbai and Thane.
**What it does**: Unlike typical real estate portals that focus on selling inventory, Sajag acts as a personal advocate for the buyer. It provides clinical property inspections, structural audits, legal agreement (AFS) reviews, and rigorous due diligence to ensure life's biggest investment is secure, transparent, and hassle-free.

---

# Architecture & Implementation Rules
This document explains the architecture of the scroll-based cinematic layout. All future modifications to the frontend should align with these logical flows.

## 1. Libraries and Technical Stack
- **Lenis Smooth Scroll (`lenis/react`)**: Provides inertia-based scroll physics overriding the native browser wheel for mathematical smoothness.
- **GSAP (`gsap`, `ScrollTrigger`)**: Used to sequence complex staggering text animations (particularly in paragraphs) natively attached to scroll progress boundaries.
- **Framer Motion (`motion/react`)**: Handles dynamic view-based scaling (`useScroll`, `useTransform`) for the parent cards, and simplistic intersection-observer text reveals.
- **Tailwind CSS (`clsx`, `tailwind-merge`)**: Utility styling, dynamic class merging (`cn`).
- **Icons (`lucide-react`)**: Lightweight SVG iconography.

## 2. File Organization
- `src/components/ui/hero-scroll-animation.tsx`: The primary orchestrator. Loops over card data, handles the layout structure, global font injection, sticky tracking, and Lenis/GSAP synchronization.
- `src/components/ui/sajag-hero.tsx`: The initial slide/card. Represents the unpinned full-bleed hero entry point.
- `src/components/ui/BlurText.tsx`: A Framer Motion text-reveal component triggered instantaneously when an element intersects the viewport (`IntersectionObserver`). Splits strings into individually animated words/letters.
- `src/components/ui/ScrollReveal.tsx`: A GSAP-based text-reveal component explicitly tied to `ScrollTrigger`. Ensures text triggers only as it passes the `top 90%` threshold on screen.
- `src/components/ui/ScrollReveal.css`: Utility CSS explicitly constructed to force hardware acceleration on animated font nodes to prevent frame lagging.

## 3. How the "Sticky Stack" Layout Functions
The overlapping card illusion operates on a carefully constructed hierarchy of heights and bounds, avoiding naive "whole-page" scroll calculation.

1. **The Physical Wrapper**: Each card lives inside `<div className="h-[120vh] sm:h-[150vh] w-full relative">`. By forcing the physical document height to be taller than the screen (`150vh`), it artificially stretches the scrollable length of the page.
2. **The Pinned State**: Inside that tall wrapper sits a `<div className="sticky top-0 h-screen">`. As the user scrolls, the parent wrapper naturally slides up. When the top of the parent hits the top of the browser, the sticky div *pins* to the screen. 
3. **The Paused Reading Window**: Because the parent is `150vh` but the sticky child is only `100vh`, the child remains pinned for `50vh` of downward scrolling. During this period, the card appears "paused" on screen. This guarantees the user has time to process and read the card's content before continuing.
4. **Mobile Overflow Protection**: Inside the pinned wrapper sits the actual card content `<motion.div className="overflow-y-auto">`. If the user is on a small phone and the text exceeds the physical screen geometry, they can simply drag their finger physically up and down inside the card. Native browser touch-chaining allows them to scroll to the bottom of the card content, at which point the inertia chains to the window, and the page proceeds downwards to the next card.
5. **The Overlap Illusion**: The card's shrinkage is calculated precisely using a localized Framer Motion hook (`const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start start', 'end start'] })`). This tracks exclusively when the `150vh` wrapper hits the top, and calculates a `0` to `1` value based entirely on when the wrapper exits. The scale smoothly slides from `1.0` down to `0.95`, happening at the exact mathematical rate that the *next* sibling wrapper slides up and natively overlaps it with a higher CSS `z-index`.

## 4. Animation Timing & Syncing
- **Engine Bridge**: Lenis operates functionally outside conventional scroll rendering events. `LenisGsapSync` calls `ScrollTrigger.update()` inside a Lenis tick hook so GSAP's scroll measurements match Lenis exactly. Without this, GSAP triggers would fire out of sync.
- **One-Shot Timelines**: Text animations inside `ScrollReveal` use `toggleActions: 'play none none none'` instead of `scrub: true`. Because the containers are heavily manipulated by `sticky` forces, tying animation timelines blindly to internal container scroll percentage leads to glitches. Instead, when the text physically breaches the viewport plane, a 0.6s staggering tween immediately fires linearly.

## 5. Performance Optimizations
To ensure 60fps across low-end mobile devices while rendering dozens of individual blurred word nodes:
- Hardware Promotion: `.word` elements are explicitly elevated to the GPU using `transform: translateZ(0)` and `backface-visibility: hidden` in `ScrollReveal.css` and `BlurText.tsx`.
- CSS Calculus Restrictions: `filter: blur()` computes heavily. Global intensities were reduced from `10px` down to `6px` for massive headers, and `3px` for multi-line paragraphs to prevent compositor crashes.
- Global Pre-allocations: `will-change: transform, opacity, filter` is supplied to ensure WebView engines prepare textures before the intersection hooks fire.

## 6. Global Brand Heuristics
Both `ScrollReveal` and `BlurText` iterator functions include logic catching: `(segment.toLowerCase() === 'sajag' || segment.toLowerCase() === 'infrastructure')`. This forces those individual text DOM elements to append `font-bold` and the primary brand hex (`#fbbf24`), completely agnostic of where they are typed in the JSON data arrays.
