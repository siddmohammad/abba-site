import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export default function SplitText({
  text = '',
  className = '',
  delay = 0,
  duration = 0.05,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  staggerTime = 0.05,
  onComplete,
}) {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  const split = useCallback(() => {
    if (splitType === 'chars') {
      return text.split('').map((char, i) => (
        <span key={i} className="split-char" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char}
        </span>
      ));
    }
    return text.split(' ').map((word, i) => (
      <span key={i} className="split-word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
        {word}
      </span>
    ));
  }, [text, splitType]);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const elements = containerRef.current.querySelectorAll(
      splitType === 'chars' ? '.split-char' : '.split-word'
    );

    gsap.fromTo(elements, from, {
      ...to,
      duration,
      stagger: staggerTime,
      delay,
      ease,
      onComplete,
    });
  }, [text, delay, duration, ease, splitType, from, to, staggerTime, onComplete]);

  return (
    <span ref={containerRef} className={className}>
      {split()}
    </span>
  );
}
