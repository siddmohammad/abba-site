import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const COUNT = 90;

const VortexCanvas = forwardRef(function VortexCanvas(_, ref) {
  const canvasRef = useRef(null);
  const speedRef  = useRef(1);

  useImperativeHandle(ref, () => ({
    setSpeed(s) { speedRef.current = s; },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let raf;

    const init = () => {
      const w = canvas.width;
      const h = canvas.height;
      const maxR = Math.min(w, h) * 0.42;
      particles = Array.from({ length: COUNT }, (_, i) => ({
        angle:    (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.8,
        radius:   50 + Math.random() * maxR,
        angSpeed: (0.005 + Math.random() * 0.005) * (i % 2 === 0 ? 1 : -1),
        rDrift:   (Math.random() - 0.5) * 0.22,
        size:     1 + Math.random() * 2,
        alpha:    0.25 + Math.random() * 0.45,
        maxR,
      }));
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const spd = speedRef.current;
      const cx  = canvas.width  / 2;
      const cy  = canvas.height / 2;
      const w   = canvas.width;
      const h   = canvas.height;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.angle  += p.angSpeed * spd;
        p.radius += p.rDrift   * spd;
        if (p.radius < 40 || p.radius > p.maxR) {
          p.rDrift  *= -1;
          p.radius   = Math.max(40, Math.min(p.radius, p.maxR));
        }

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.55;

        ctx.save();
        ctx.shadowBlur  = 5 + spd * 3;
        ctx.shadowColor = 'rgba(57,255,20,0.7)';
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57,255,20,${p.alpha})`;
        ctx.fill();
        ctx.restore();
      }

      // Connections (skip when speed is high — blur effect)
      if (spd < 4) {
        for (let i = 0; i < particles.length - 1; i++) {
          const a  = particles[i];
          const b  = particles[i + 1];
          const ax = cx + Math.cos(a.angle) * a.radius;
          const ay = cy + Math.sin(a.angle) * a.radius * 0.55;
          const bx = cx + Math.cos(b.angle) * b.radius;
          const by = cy + Math.sin(b.angle) * b.radius * 0.55;
          const d  = Math.hypot(ax - bx, ay - by);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(57,255,20,${(1 - d / 110) * 0.13 / spd})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
      }}
    />
  );
});

export default VortexCanvas;
