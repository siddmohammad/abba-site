import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

export default function CountUp({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  separator = ',',
  prefix = '',
  suffix = '',
  className = '',
  onComplete,
}) {
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const count = useMotionValue(from);
  const rounded = useTransform(count, (val) => {
    const num = Math.round(val);
    const formatted = num.toLocaleString('en-US');
    return `${prefix}${separator ? formatted : num}${suffix}`;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const controls = animate(count, to, {
      duration,
      delay,
      ease: 'easeOut',
      onComplete,
    });
    return controls.stop;
  }, [hasStarted, count, to, duration, delay, onComplete]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}
