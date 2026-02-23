import './Marquee.css';

export default function Marquee({ children, speed = 30, gap = '2rem', className = '' }) {
  return (
    <div className={`marquee-root ${className}`} style={{ '--marquee-speed': `${speed}s`, '--marquee-gap': gap }}>
      <div className="marquee-track">
        <div className="marquee-content">{children}</div>
        <div className="marquee-content" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
