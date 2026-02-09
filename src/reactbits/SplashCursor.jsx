import { useEffect, useRef } from 'react';

export default function SplashCursor({
  color = '#39FF14',
  size = 12,
  trailLength = 20,
  fadeSpeed = 0.92,
}) {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      points.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: size * (0.5 + Math.random() * 0.5),
      });
      if (points.current.length > trailLength) {
        points.current.shift();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = points.current.length - 1; i >= 0; i--) {
        const p = points.current[i];
        p.life *= fadeSpeed;

        if (p.life < 0.01) {
          points.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.life * 0.6;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15 * p.life;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [color, size, trailLength, fadeSpeed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
