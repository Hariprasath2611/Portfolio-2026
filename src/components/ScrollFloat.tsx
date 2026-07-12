import { useEffect, useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollFloatProps {
  children: string;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      console.warn('ScrollFloat: containerRef is null');
      return;
    }

    const charElements = el.querySelectorAll('.char');
    console.log(`ScrollFloat [${children}]: Mount. Found ${charElements.length} characters.`);

    if (charElements.length === 0) {
      console.warn(`ScrollFloat [${children}]: No elements with class .char found inside`, el);
      return;
    }

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // Use gsap.context to manage GSAP tweens cleanly in React
    const ctx = gsap.context(() => {
      // TEST: Immediate opacity animation to see if GSAP is running on the elements
      gsap.fromTo(
        charElements,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.05,
          delay: 0.5,
          ease: 'power2.out'
        }
      );
    }, el);

    return () => {
      console.log(`ScrollFloat [${children}]: Reverting GSAP context.`);
      ctx.revert();
    };
  }, [children, scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
}
