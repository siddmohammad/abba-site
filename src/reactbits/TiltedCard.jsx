import { useRef, useState } from 'react';
import './TiltedCard.css';

export default function TiltedCard({
  children,
  className = '',
  maxTilt = 15,
  scale = 1.03,
  perspective = 1000,
  glareOpacity = 0.15,
  glareColor = '#39FF14',
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({});

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`);
    setGlareStyle({
      background: `radial-gradient(circle at ${x}px ${y}px, ${glareColor}${Math.round(glareOpacity * 255).toString(16).padStart(2, '0')}, transparent 60%)`,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTransform('');
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`tilted-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      <div className="tilted-glare" style={glareStyle} />
      {children}
    </div>
  );
}
