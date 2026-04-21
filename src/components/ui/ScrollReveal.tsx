'use client';

import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      const lowerWord = word.toLowerCase();
      const isBrandWord = lowerWord === 'sajag' || lowerWord === 'infrastructure';
      return (
        <span 
          className={cn(
            "word",
            isBrandWord && "font-bold text-[#fbbf24] drop-shadow-md"
          )} 
          key={index}
        >
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use gsap.context for scoped, safe cleanup
    const ctx = gsap.context(() => {
      const wordElements = el.querySelectorAll<HTMLElement>('.word');
      if (!wordElements.length) return;

      // One-shot tween (not scrub) — fires when element enters view
      // Works reliably inside sticky cards because IntersectionObserver
      // handles the viewport entry, not scroll position.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        el,
        { rotate: baseRotation, transformOrigin: '0% 50%' },
        { rotate: 0, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
        },
        {
          opacity: 1,
          ...(enableBlur ? { filter: 'blur(0px)' } : {}),
          duration: 0.6,
          stagger: 0.04,
          ease: 'power2.out',
          clearProps: enableBlur ? 'filter' : ''
        },
        0 // start at same time as rotation
      );
    }, containerRef);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, blurStrength]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
