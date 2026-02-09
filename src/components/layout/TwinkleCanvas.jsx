import { useRef, useEffect } from 'react';

export default function TwinkleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: true });

    let NEON = getComputedStyle(document.documentElement).getPropertyValue('--neon').trim() || '#39FF14';
    let stars = [];
    let DENSITY = window.matchMedia('(max-width: 480px)').matches ? 1.0 : 1.25;

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cvs.width = innerWidth * dpr;
      cvs.height = innerHeight * dpr;
      cvs.style.width = innerWidth + 'px';
      cvs.style.height = innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    }

    function init() {
      stars = [];
      const count = Math.min(800, Math.floor((innerWidth * innerHeight / 2200) * DENSITY));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          r: Math.random() < 0.85 ? 1 : 1.7,
          a: Math.random() * 0.8 + 0.2,
          da: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
          vx: Math.random() * 0.06 - 0.03,
          vy: Math.random() * 0.06 + 0.02,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.shadowColor = NEON;

      for (const s of stars) {
        s.a += s.da;
        if (s.a > 1 || s.a < 0.25) s.da *= -1;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -2) s.x = innerWidth + 2;
        if (s.x > innerWidth + 2) s.x = -2;
        if (s.y < -2) s.y = innerHeight + 2;
        if (s.y > innerHeight + 2) s.y = -2;

        ctx.globalAlpha = s.a;
        ctx.shadowBlur = 9;
        ctx.fillStyle = NEON;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (Math.random() < 0.02) {
          ctx.globalAlpha = 0.12;
          ctx.shadowBlur = 0;
          ctx.fillRect(s.x | 0, s.y | 0, 1, 1);
        }
      }
      animRef.current = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas className="sky" ref={canvasRef} />;
}
