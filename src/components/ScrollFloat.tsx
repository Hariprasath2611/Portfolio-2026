import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollFloatProps {
  children: string;
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
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.out(1.5)',
  scrollStart = 'top 90%',
  scrollEnd = 'bottom 60%',
  stagger = 0.03
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');
    
    return words.map((word, wIdx) => {
      const chars = word.split('').map((char, cIdx) => (
        <span 
          className="char" 
          key={cIdx} 
          style={{ display: 'inline-block', willChange: 'opacity, transform' }}
        >
          {char}
        </span>
      ));
      
      return (
        <span 
          key={wIdx} 
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {chars}
          {wIdx < words.length - 1 && '\u00A0'}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll('.char');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          opacity: 0,
          yPercent: 120,
          scaleY: 2,
          scaleX: 0.8,
          transformOrigin: '50% 0%',
          willChange: 'opacity, transform'
        },
        {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          ease: ease,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            end: scrollEnd,
            scrub: 0.5
          }
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [children, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
}
